import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'; //esto es para hacer las peticiones http
import { API_CONFIG } from '../../../core/config/api.config'; //urls del backend ya tu sabe ya
import { ApiResponse } from '../../../core/interfaces/api-response.interface'; //esto es para los formatos de respuesta del backend
import {CreateUserDto} from '../types/create-user.dto';
import { User } from '../../../core/interfaces/user.interface';

//el injectable es para que este disponible en toda la app
@Injectable({
    providedIn: 'root'
})
export class UsersApi{
    private readonly http= inject(HttpClient); //aqui inyectamos el htpp client
    private readonly base= API_CONFIG.BASE_URL; //esta es la url base del backend


    //como su nombre lo indica esto es para traer/obtener a todos los usuarios
    getAll(){
        return this.http.get<ApiResponse<User[]>>(this.base + API_CONFIG.USERS.GET_ALL);
    }

    //obtener usuarios por su id
    getById(id: string){
        return this.http.get<ApiResponse<User>>(`${this.base}${API_CONFIG.USERS.GET_BY_ID(id)}`);
    }

    // //crear un nuevo usuario
    // create(data: CreateUserDto){
    //     return this.http.post<ApiResponse<User>>(this.base + API_CONFIG.USERS.CREATE, data);
    // }

    //actualizar un usuario existente
    update(id:string, data: Partial<CreateUserDto>){
        return this.http.put<ApiResponse<User>>(this.base + API_CONFIG.USERS.UPDATE(id), data)
    }

    //eliminar un usuario
    delete(id:string){
        return this.http.delete<ApiResponse<null>>(this.base + API_CONFIG.USERS.DELETE(id));
    }
}