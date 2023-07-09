import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { User } from 'src/users/users.model';
import {UsersService} from "../users/users.service";

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role) private roleRepository: typeof Role,
        @Inject(forwardRef(() => UsersService)) private userService: UsersService
    ) {}

    async createRole(dto: CreateRoleDto) {
        const candidate = await this.roleRepository.findOne({where:{value: dto.value}});
        if(candidate) throw new HttpException('Роль с таким значением уже существует! Ошибка при создании роли.', HttpStatus.BAD_REQUEST);
        
        try {
            const {users, ...body} = dto;

            const role = await this.roleRepository.create(body);

            if(users) {
                await role.$set('users', []);
                const usersParsed: string[] = JSON.parse(users);
                usersParsed.forEach(async (item) => {
                    const user = await this.userService.getUserByName(item);
                    await role.$add('users', user);
                })
            }

            return role;
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при создании роли.`, HttpStatus.INTERNAL_SERVER_ERROR);
        }        
    }

    async updateRole(id: number, dto: UpdateRoleDto) {
        const role = await this.roleRepository.findByPk(id);
        if(!role) throw new HttpException('Роль не найдена! Ошибка при обновлении роли.', HttpStatus.NOT_FOUND);

        if(dto.value) {
            const candidate = await this.roleRepository.findOne({where:{value: dto.value}});
            if(candidate && candidate.value !== dto.value) throw new HttpException('Роль с таким значением уже существует! Ошибка при обновлении роли.', HttpStatus.BAD_REQUEST);
        }
        try {
            const {users, ...body} = dto;
            await this.roleRepository.update(body, {where: {id}});

            if(users) {
                await role.$set('users', []);
                const usersParsed: string[] = JSON.parse(users);
                usersParsed.forEach(async (item) => {
                    const user = await this.userService.getUserByName(item);
                    await role.$add('users', user);
                })
            }

            return role;
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при обновлении роли.`, HttpStatus.INTERNAL_SERVER_ERROR);
        }        
    }

    async removeRole(id: number) {
        let candidate = await this.roleRepository.findByPk(id);
        if(!candidate) throw new HttpException('Роль не найдена! Ошибка при удалении роли.', HttpStatus.NOT_FOUND);

        try {
            return await this.roleRepository.destroy({where: {id}});
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при удалении роли.`, HttpStatus.INTERNAL_SERVER_ERROR);
        }        
    }

    async getRoleByValue(value: string) {
        let candidate = await this.roleRepository.findOne({where:{value}});
        if(!candidate) throw new HttpException('Роль не найдена! Ошибка при получении роли.', HttpStatus.NOT_FOUND);

        try {
            return await this.roleRepository.findOne({where: {value}});
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при получении роли.`, HttpStatus.INTERNAL_SERVER_ERROR);
        }        
    }

    async getOne(id: number) {
        let role = await this.roleRepository.findByPk(id, {
            attributes: ['id', 'value', 'description'],
            include: [
                {model: User, as: 'users', attributes: ['id', 'name'], through: {attributes: []}},
            ],
        });
        if(!role) throw new HttpException('Роль не найдена! Ошибка при получении роли.', HttpStatus.NOT_FOUND);

        try {
            return role;
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при получении роли.`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAll() {
        try {
            return await this.roleRepository.findAll({
                attributes: ['id', 'value', 'description'],
            });
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при получении всех ролей.`, HttpStatus.INTERNAL_SERVER_ERROR);
        }        
    }
}
