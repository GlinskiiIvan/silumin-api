import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {};

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const reqiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            if(!reqiredRoles) return true;

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;

            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if(bearer !== 'Bearer' || !token) throw new UnauthorizedException({message: 'Пользователь не авторизован!'});

            const user = this.jwtService.verify(token);
            req.user = user;
            return user.roles.some(role => reqiredRoles.includes(role.value));
        } catch (error) {
            throw new HttpException('Нет доступа!', HttpStatus.FORBIDDEN);
        }
    }
}