import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../../core/config/api.config';
import { ApiResponse } from '../../../core/interfaces/api-response.interface';
import { TipoSuscripcion } from '../../../core/interfaces/tipo-suscripcion.interface';
import { CrearTipoSuscripcionDto } from '../types/create-tipo-suscripcion.dto';

@Injectable({
    providedIn: 'root'
})
export class TipoSuscripcionApi {

    private readonly http = inject(HttpClient);
    private readonly base = API_CONFIG.BASE_URL;

    // Obtener todos los tipos de suscripción
    getAll() {
        return this.http.get<ApiResponse<TipoSuscripcion[]>>(
            this.base + API_CONFIG.TIPOS_SUSCRICIPION.GET_ALL
        );
    }

    // Obtener un tipo de suscripción por ID
    getById(id: number) {
        return this.http.get<ApiResponse<TipoSuscripcion>>(
            this.base + API_CONFIG.TIPOS_SUSCRICIPION.GET_BY_ID(id)
        );
    }

    // Crear un tipo de suscripción
    create(data: CrearTipoSuscripcionDto) {
        return this.http.post<ApiResponse<TipoSuscripcion>>(
            this.base + API_CONFIG.TIPOS_SUSCRICIPION.CREATE,
            data
        );
    }

    // Actualizar un tipo de suscripción
    update(id: number, data: Partial<CrearTipoSuscripcionDto>) {
        return this.http.put<ApiResponse<TipoSuscripcion>>(
            this.base + API_CONFIG.TIPOS_SUSCRICIPION.UPDATE(id),
            data
        );
    }

    // Eliminar un tipo de suscripción
    delete(id: number) {
        return this.http.delete<ApiResponse<null>>(
            this.base + API_CONFIG.TIPOS_SUSCRICIPION.DELETE(id)
        );
    }
}
