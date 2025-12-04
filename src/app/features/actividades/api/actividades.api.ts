import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'; //esto es para hacer las peticiones http
import { API_CONFIG } from '../../../core/config/api.config'; //urls del backend ya tu sabe ya
import { ApiResponse } from '../../../core/interfaces/api-response.interface'; //esto es para los formatos de respuesta del backend
import { Actividades } from '../../../core/interfaces/actividades.interface';
import { CreateActividadDto } from '../types/create-actividad.dto';
//el injectable es para que este disponible en toda la app
@Injectable({
    providedIn: 'root'
})
export class ActividadesApi{
    private readonly http= inject(HttpClient); //aqui inyectamos el htpp client
    private readonly base= API_CONFIG.BASE_URL; //esta es la url base del backend


    //como su nombre lo indica esto es para traer/obtener a todas las actividades
    getAll(){
        return this.http.get<ApiResponse<Actividades[]>>(this.base + API_CONFIG.ACTIVIDADES.GET_ALL);
    }

    //obtener actividades por su id
    getById(id: number){
        return this.http.get<ApiResponse<Actividades>>(this.base + API_CONFIG.ACTIVIDADES.GET_BY_ID(id));
    }

    //crear una nueva actividad
    create(data: CreateActividadDto){
        return this.http.post<ApiResponse<Actividades>>(this.base + API_CONFIG.ACTIVIDADES.CREATE, data);
    }

    //actualizar una actividad existente
    update(id:number, data: Partial<CreateActividadDto>){
        return this.http.put<ApiResponse<Actividades>>(this.base + API_CONFIG.ACTIVIDADES.UPDATE(id), data)
    }

    //eliminar una actividad
    delete(id:number){
        return this.http.delete<ApiResponse<null>>(this.base + API_CONFIG.ACTIVIDADES.DELETE(id));
    }
}
