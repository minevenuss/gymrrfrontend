import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'; //esto es para hacer las peticiones http
import { API_CONFIG } from '../../../core/config/api.config'; //urls del backend ya tu sabe ya
import { ApiResponse } from '../../../core/interfaces/api-response.interface'; //esto es para los formatos de respuesta del backend
import {CreateInventarioDto} from '../types/create-inventario.dto';
import { Inventario} from '../../../core/interfaces/inventario.interface';

//el injectable es para que este disponible en toda la app
@Injectable({
    providedIn: 'root'
})
export class InventarioApi{
    private readonly http= inject(HttpClient); //aqui inyectamos el htpp client
    private readonly base= API_CONFIG.BASE_URL; //esta es la url base del backend


    getAll(){
        return this.http.get<ApiResponse<Inventario[]>>(this.base + API_CONFIG.INVENTARIO.GET_ALL);
    }

    getById(id: number){
        return this.http.get<ApiResponse<Inventario>>(this.base + API_CONFIG.INVENTARIO.GET_BY_ID);
    }

    create(data: CreateInventarioDto){
        return this.http.post<ApiResponse<Inventario>>(this.base + API_CONFIG.INVENTARIO.CREATE, data);
    }

    update(id:number, data: Partial<CreateInventarioDto>){
        return this.http.put<ApiResponse<Inventario>>(this.base + API_CONFIG.INVENTARIO.UPDATE(id), data)
    }

    delete(id:number){
        return this.http.delete<ApiResponse<null>>(this.base + API_CONFIG.INVENTARIO.DELETE(id));
    }
}