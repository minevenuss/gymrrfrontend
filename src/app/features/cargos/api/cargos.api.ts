import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_CONFIG } from '../../../core/config/api.config';
import { ApiResponse } from "../../../core/interfaces/api-response.interface";
import { Cargos } from '../../../core/interfaces/cargo.interface';
import { CreateCargoDto } from "../types/create-cargo.dto";


@Injectable({
  providedIn: 'root'
})
export class CargosApi{
  private readonly http= inject(HttpClient);
  private readonly base= API_CONFIG.BASE_URL;

  getAll(){
    return this.http.get<ApiResponse<Cargos[]>>(this.base + API_CONFIG.CARGOS.GET_ALL);
  }

  getById(id: number){
    return this.http.get<ApiResponse<Cargos>>(this.base + API_CONFIG.CARGOS.GET_BY_ID(id));
  }

  create(data: CreateCargoDto){
    return this.http.post<ApiResponse<Cargos>>(this.base + API_CONFIG.CARGOS.CREATE, data);
  }

  update(id: number, data: Partial<CreateCargoDto>){
    return this.http.put<ApiResponse<Cargos>>(this.base + API_CONFIG.CARGOS.UPDATE(id), data);
  }

  delete(id: number){
    return this.http.delete<ApiResponse<Cargos>>(this.base + API_CONFIG.CARGOS.DELETE(id));
  }
}
