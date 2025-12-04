import {inject, Injectable, signal, computed} from '@angular/core';
import { UsersApi } from '../api/users.api';
import { User } from '../../../core/interfaces/user.interface';
import { CreateUserDto } from '../types/create-user.dto';
import Swal from 'sweetalert2';
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
      next: (res: any) => {
        const data = res.data ?? res;
        if (!Array.isArray(data)) {
          this.loading.set(false);
          Swal.fire({
            icon: 'error',
            title: 'Error de formato',
            text: 'La respuesta del servidor no es válida',
            confirmButtonColor: '#DB2B39'
          });
          return;
        }

        this.users.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        let mensaje = 'Error al cargar usuarios';

        if (err.status === 404) mensaje = 'No se encontró el endpoint de usuarios';
        if (err.status === 500) mensaje = 'Error interno del servidor';
        if (err.status === 0) mensaje = 'No hay conexión con el servidor';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: mensaje,
          confirmButtonColor: '#DB2B39'
        });
      }
    });
  }
    
    // //crea usuarios
    // create(user: CreateUserDto) {
    //     this.api.create(user).subscribe({
    //         next: (res) => res.success && this.loadAll()
    //     });
    // }
    
    //actualiza usuario
    update(id: string, data: Partial<CreateUserDto>) {
   if (!id || id === 'undefined' || id === 'null'){
      Swal.fire({
        icon: 'warning',
        title: 'ID inválido',
        text: 'No se puede actualizar sin un ID válido',
        confirmButtonColor: '#DB2B39'
      });
      return;
    }

    if (!data || Object.keys(data).length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No hay datos para actualizar',
        confirmButtonColor: '#29335C'
      });
      return;
    }

    // Validación básica del email si se está modificando
    if (data.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.Email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Email inválido',
        text: 'Por favor ingresa un correo electrónico válido',
        confirmButtonColor: '#DB2B39'
      });
      return;
    }

    this.api.update(id, data).subscribe({
      next: (res: any) => {
        if (res?.success !== false) {
          Swal.fire({
            icon: 'success',
            title: '¡Usuario actualizado!',
            timer: 1500,
            showConfirmButton: false
          });
          this.loadAll(); // actualización instantánea
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: res.message || 'No se pudo actualizar el usuario',
            confirmButtonColor: '#DB2B39'
          });
        }
      },
      error: (err) => {
        let mensaje = 'Error al actualizar el usuario';
        if (err.status === 404) mensaje = 'Usuario no encontrado';
        if (err.status === 400) {
          mensaje = err.error?.errores?.join('<br>') || 'Datos inválidos';
        }
        if (err.status === 409) mensaje = 'El email ya está en uso';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: mensaje,
          confirmButtonColor: '#DB2B39'
        });
      }
    });
  }

    //elimina usuario
   delete(id: string) {
    if (!id) {
      Swal.fire({
        icon: 'warning',
        title: 'ID inválido',
        text: 'No se puede eliminar sin un ID válido',
        confirmButtonColor: '#DB2B39'
      });
      return;
    }

    Swal.fire({
      icon: 'warning',
      title: '¿Eliminar usuario?',
      text: 'Esta acción no se puede deshacer',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#DB2B39',
      cancelButtonColor: '#29335C'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete(id).subscribe({
          next: (res: any) => {
            if (res?.success !== false) {
              Swal.fire({
                icon: 'success',
                title: '¡Usuario eliminado!',
                timer: 1500,
                showConfirmButton: false
              });
              this.loadAll();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'No se pudo eliminar',
                text: res.message || 'Error desconocido',
                confirmButtonColor: '#DB2B39'
              });
            }
          },
          error: (err) => {
            let mensaje = 'Error al eliminar el usuario';
            if (err.status === 404) mensaje = 'Usuario no encontrado';
            if (err.status === 409) mensaje = 'No se puede eliminar: tiene datos asociados';

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: mensaje,
              confirmButtonColor: '#DB2B39'
            });
          }
        });
      }
    });
  }
}