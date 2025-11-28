import {inject, Injectable, signal, computed} from '@angular/core';
import { ActividadesApi } from '../api/actividades.api';
import { CreateActividadDto } from '../types/create-actividad.dto';
import { Actividades } from '../../../core/interfaces/actividades.interface';
@Injectable({
    providedIn: 'root'
})
export class ActividadesService{
    private readonly api = inject(ActividadesApi); //aqui se inyecta la api

    
    private actividades = signal<Actividades[]>([]);
    private loading = signal(false);

    readonly actividades$ = this.actividades.asReadonly();
    readonly loading$ = this.loading.asReadonly();

    //carga todas las actividades
    loadAll() {
        this.loading.set(true);
        this.api.getAll().subscribe({
            next: (res) => {
                if (res.success) this.actividades.set(res.data ?? []);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
    
    //crea actividades
    create(actividad: CreateActividadDto) {
        this.api.create(actividad).subscribe({
            next: (res) => res.success && this.loadAll()
        });
    }
    
    //actualiza usuario
    update(id: number, data: Partial<CreateActividadDto>){
        this.api.update(id, data).subscribe({
            next: (res) => res.success && this.loadAll()
        });
    }

    //elimina usuario
    delete(id: number){
        this.api.delete(id).subscribe({
            next: (res) => res.success && this.loadAll()
        })
    }
}