import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_CONFIG } from "../../../core/config/api.config";
import { ApiResponse } from '../../../core/interfaces/api-response.interface';
import { Cargo } from "../../../core/interfaces/cargo.interface";
import { Suscripcion } from "../../../core/interfaces/suscripcion.interface";
import { CreateSuscripcionDto } from "../types/create-suscripcion.dto";

@Injectable({
  providedIn: 'root'
})
export class SuscripcionesApi{
  private readonly http = inject(HttpClient);
  private readonly base = API_CONFIG.BASE_URL;

  getAll(){
    this.http.get<ApiResponse<Suscripcion>>(this.base + API_CONFIG.SUSCRICPIONES.GET_ALL);
  }

  getById(id: number){
    this.http.get<ApiResponse<Suscripcion>>(this.base + API_CONFIG.SUSCRICPIONES.GET_BY_ID(id));
  }

  create(data: CreateSuscripcionDto){
    this.http.post<ApiResponse<Suscripcion>>(this.base + API_CONFIG.SUSCRICPIONES.CREATE, data);
  }

  update(id: number, data: Partial<CreateSuscripcionDto>){
    this.http.patch<ApiResponse<Suscripcion>>(this.base + API_CONFIG.SUSCRICPIONES.UPDATE(id), data);
  }

  delete(id: number){
    this.http.delete<ApiResponse<Suscripcion>>(this.base + API_CONFIG.SUSCRICPIONES.DELETE(id));
  }

  marcarPago(id: number){
    this.http.post<ApiResponse<Suscripcion>>(this.base + API_CONFIG.SUSCRICPIONES.MARCAR_PAGO, id);
  }

  renovarSuscripcion(id: number, newEndDate: Date){
    this.http.post<ApiResponse<Suscripcion>>(this.base + API_CONFIG.SUSCRICPIONES.RENOVAR_SUSCRIPCION(id), newEndDate)
  }

  filterByEstadoPago(estado: string){
    this.http.get<ApiResponse<Suscripcion>>(this.base + API_CONFIG.SUSCRICPIONES.FILTER_BY_ESTADO_PAGO(estado))
  }
}
