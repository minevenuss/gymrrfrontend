import {inject, Injectable, signal, computed} from '@angular/core';
import { UsersApi } from '../api/users.api';
import { User } from '../../../core/interfaces/user.interface';
import { CreateUserDto } from '../types/create-user.dto';
@Injectable({
    providedIn: 'root'
})
export class UsersService{
    private readonly api = inject(UsersApi); //aqui se inyecta la api

    
    private users = signal<User[]>([]);
    private loading = signal(false);

    readonly users$ = this.users.asReadonly();
    readonly loading$ = this.loading.asReadonly();

    //carga todos los usuarios
    loadAll() {
        this.loading.set(true);
        this.api.getAll().subscribe({
            next: (res) => {
                if (res.success) this.users.set(res.data ?? []);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
    
    //crea usuarios
    create(user: CreateUserDto) {
        this.api.create(user).subscribe({
            next: (res) => res.success && this.loadAll()
        });
    }
    
    //actualiza usuario
    update(id: number, data: Partial<CreateUserDto>){
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