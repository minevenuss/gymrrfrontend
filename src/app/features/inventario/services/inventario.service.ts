import {inject, Injectable, signal, computed} from '@angular/core';
import { InventarioApi } from '../api/inventario.api';
import { Inventario } from '../../../core/interfaces/inventario.interface';
import { CreateInventarioDto } from '../types/create-inventario.dto';
import Swal from 'sweetalert2';
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
      next: (res: any) => {
        const data = res.data ?? res;
        if (!Array.isArray(data)) {
          Swal.fire({
            icon: 'error',
            title: 'Error de datos',
            text: 'La respuesta del servidor no tiene el formato esperado',
            confirmButtonColor: '#DB2B39'
          });
          this.loading.set(false);
          return;
        }

        this.inventario.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        let mensaje = 'Error al cargar el inventario';

        if (err.status === 404) mensaje = 'Endpoint no encontrado';
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
    
   create(item: CreateInventarioDto) {
    if (!item.Nombre?.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta el nombre',
        text: 'El nombre del artículo es obligatorio',
        confirmButtonColor: '#DB2B39'
      });
      return;
    }

    this.api.create(item).subscribe({
      next: (res: any) => {
        if (res?.success !== false) {
          Swal.fire({
            icon: 'success',
            title: '¡Artículo agregado!',
            text: `${item.Nombre} se creó correctamente`,
            timer: 1500,
            showConfirmButton: false
          });
          this.loadAll();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo crear',
            text: res.message || 'Error desconocido',
            confirmButtonColor: '#DB2B39'
          });
        }
      },
      error: (err) => {
        let mensaje = 'Error al crear el artículo';
        if (err.status === 400) mensaje = err.error?.message || 'Datos inválidos';
        if (err.status === 409) mensaje = 'Ya existe un artículo con ese nombre';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: mensaje,
          confirmButtonColor: '#DB2B39'
        });
      }
    });
  }
    update(id: number, data: Partial<CreateInventarioDto>) {
    if (!id || id <= 0) {
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

    if (data.Nombre && !data.Nombre.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Nombre inválido',
        text: 'El nombre no puede estar vacío',
        confirmButtonColor: '#DB2B39'
      });
      return;
    }

    this.api.update(id, data).subscribe({
      next: (res: any) => {
        if (res?.success !== false) {
          Swal.fire({
            icon: 'success',
            title: '¡Artículo actualizado!',
            timer: 1500,
            showConfirmButton: false
          });
          this.loadAll();
        }
      },
      error: (err) => {
        let mensaje = 'Error al actualizar';
        if (err.status === 404) mensaje = 'Artículo no encontrado';
        if (err.status === 400) mensaje = err.error?.message || 'Datos inválidos';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: mensaje,
          confirmButtonColor: '#DB2B39'
        });
      }
    });
  }

    delete(id: number) {
    if (!id || id <= 0) {
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
      title: '¿Eliminar artículo?',
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
                title: '¡Eliminado!',
                text: 'El artículo se eliminó correctamente',
                timer: 1500,
                showConfirmButton: false
              });
              this.loadAll();
            }
          },
          error: (err) => {
            let mensaje = 'Error al eliminar';
            if (err.status === 404) mensaje = 'Artículo no encontrado';
            if (err.status === 409) mensaje = 'No se puede eliminar: tiene registros asociados';

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