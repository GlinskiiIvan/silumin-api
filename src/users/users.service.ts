import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { SetRolesUser } from './dto/set-roles-user.dto';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService
    ) {};

    async createUser(dto: CreateUserDto) {
        const candidate = await this.userRepository.findOne({where:{name: dto.name}});
        if(candidate) throw new HttpException('Пользователь с таким именем уже существует!', HttpStatus.BAD_REQUEST);
        
        try {
            const {name, password, roles} = dto;
            const user = await this.userRepository.create({name, password});
            // const role = await this.roleService.getRoleByValue('Super');
            // await user.$set('roles', [role.id]);
            // user.roles = [role];
            if(roles) {
                await user.$set('roles', []);
                const rolesParsed: string[] = JSON.parse(roles);
                rolesParsed.forEach(async (item) => {
                    const role = await this.roleService.getRoleByValue(item);
                    await user.$add('roles', role);
                })
            }
            return user;            
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при создании пользователя. ${error.message}`, error.status);
        }
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        const user = await this.userRepository.findByPk(id);
        if(!user) throw new HttpException('Пользователь не найден! Ошибка при обновлении пользователя.', HttpStatus.NOT_FOUND);

        if(dto.name) {
            const candidate = await this.userRepository.findOne({where:{name:dto.name}})
            if(candidate && candidate.name !== dto.name) throw new HttpException('Пользователь с таким именем уже существует! Ошибка при обновлении пользователя.', HttpStatus.BAD_REQUEST);
            await this.userRepository.update({name: dto.name}, {where: {id}});
        }

        try {
            const {password, roles} = dto;
    
            if(password) {
                const passwordHash = await bcrypt.hash(password, 7);
                await this.userRepository.update({password: passwordHash}, {where: {id}});
            }

            if(roles) {
                await user.$set('roles', []);
                const rolesParsed: string[] = JSON.parse(roles);
                rolesParsed.forEach(async (item) => {
                    const role = await this.roleService.getRoleByValue(item);
                    await user.$add('roles', role);
                })
            }

            return user;           
        } catch (error) {
            console.log(error);
            throw new HttpException(`Ошибка при обновлении пользователя. ${error.message}`, error.status);
        }                
    }

    async removeUser(id: number) {
        const candidate = await this.userRepository.findByPk(id);
        if(!candidate) throw new HttpException('Пользователь не найден! Ошибка при удалении пользователя.', HttpStatus.NOT_FOUND);

        try {
            return await this.userRepository.destroy({where: {id}});           
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при удалении пользователя.', HttpStatus.BAD_REQUEST);
        }        
    }
    
    async getUser(id: number) {
        try {
            return await this.userRepository.findByPk(id, {
                attributes: ['id', 'name'],
                include: [
                    {model: Role, as: 'roles', attributes: ['id', 'value'], through: {attributes: []}},
                ],
            });
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при получении пользователя.', HttpStatus.BAD_REQUEST);
        }        
    }

    async getAllUser() {
        try {
            return await this.userRepository.findAll({
                attributes: ['id', 'name']
            });
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при получении всех пользователей.', HttpStatus.BAD_REQUEST);
        }
    }

    async getUserByName(name: string) {
        const candidate = await this.userRepository.findOne({where:{name}});
        if(!candidate) throw new HttpException('Пользователь не найден! Ошибка при получении пользователя.', HttpStatus.NOT_FOUND);

        try {
            return await this.userRepository.findOne({where: {name}, include: [
                    {model: Role, as: 'roles', attributes: ['id', 'value'], through: {attributes: []}},
                ]});
        } catch (error) {
            console.log(error);
            throw new HttpException('Ошибка при получении пользователя.', HttpStatus.BAD_REQUEST);
        }        
    }
}
