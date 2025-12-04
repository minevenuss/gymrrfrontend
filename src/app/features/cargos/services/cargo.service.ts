import { computed, inject, Injectable, signal } from '@angular/core';
import { CargosApi } from '../api/cargos.api';
import { Cargos } from '../../../core/interfaces/cargo.interface';
import { CreateCargoDto } from '../types/create-cargo.dto';

@Injectable({
    providedIn: 'root'
})
export class CargoService{
    private readonly api = inject(CargosApi); //aqui se inyecta la api


    private cargos = signal<Cargos[]>([]);
    private loading = signal(false);

    readonly cargos$ = computed(() => this.cargos());
    readonly loading$ = this.loading.asReadonly();

    //carga todas las actividades
    loadAll() {
    this.loading.set(true);
    this.api.getAll().subscribe({
        next: (res) => {
            const data = (res as any).data ?? res;
            this.cargos.set(data);
            this.loading.set(false);
        },
        error: (err) => {
            this.loading.set(false);

        }
    });
}

    //crea actividades
    create(cargo: CreateCargoDto) {
        this.api.create(cargo).subscribe({
            next: (res) => res.success && this.loadAll()
        });
    }

    //actualiza usuario
    update(id: number, data: Partial<CreateCargoDto>){
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
