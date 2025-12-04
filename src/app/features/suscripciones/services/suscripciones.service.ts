import { inject, Injectable, signal, computed } from '@angular/core';
import { SuscripcionesApi } from "../api/suscripciones.api";
import { Suscripcion } from "../../../core/interfaces/suscripcion.interface";
import { CreateSuscripcionDto } from "../types/create-suscripcion.dto";

@Injectable({
    providedIn: 'root'
})
export class SuscripcionesService{
    private readonly api = inject(SuscripcionesApi); //aqui se inyecta la api


    private suscripciones = signal<Suscripcion[]>([]);
    private loading = signal(false);

    readonly suscripciones$ = computed(() => this.suscripciones());
    readonly loading$ = this.loading.asReadonly();

    //carga todas las actividades
    loadAll() {
    this.loading.set(true);
    this.api.getAll().subscribe({
        next: (res) => {
            const data = (res as any).data ?? res;
            this.suscripciones.set(data);
            this.loading.set(false);
        },
        error: (err) => {
            this.loading.set(false);

        }
    });
}

    //crea actividades
    create(actividad: CreateSuscripcionDto) {
        this.api.create(actividad).subscribe({
            next: (res) => res.success && this.loadAll()
        });
    }

    //actualiza usuario
    update(id: number, data: Partial<CreateSuscripcionDto>){
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
