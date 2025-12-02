import {inject, Injectable, signal, computed} from '@angular/core';
import { InventarioApi } from '../api/inventario.api';
import { Inventario } from '../../../core/interfaces/inventario.interface';
import { CreateInventarioDto } from '../types/create-inventario.dto';
@Injectable({
    providedIn: 'root'
})
export class InventarioService{
    private readonly api = inject(InventarioApi); //aqui se inyecta la api

    
    private inventario = signal<Inventario[]>([]);
    private loading = signal(false);

    readonly inventario$ = this.inventario.asReadonly();
    readonly loading$ = this.loading.asReadonly();

    loadAll() {
        this.loading.set(true);
        this.api.getAll().subscribe({
            next: (res) => {
                if (res.success) this.inventario.set(res.data ?? []);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
    
    create(inventario: CreateInventarioDto) {
        this.api.create(inventario).subscribe({
            next: (res) => res.success && this.loadAll()
        });
    }
    
    update(id: number, data: Partial<CreateInventarioDto>){
        this.api.update(id, data).subscribe({
            next: (res) => res.success && this.loadAll()
        });
    }

    delete(id: number){
        this.api.delete(id).subscribe({
            next: (res) => res.success && this.loadAll()
        })
    }
}