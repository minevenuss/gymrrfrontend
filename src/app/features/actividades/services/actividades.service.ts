import {inject, Injectable, signal, computed} from '@angular/core';
import { ActividadesApi } from '../api/actividades.api';
import { CreateActividadDto } from '../types/create-actividad.dto';
import { Actividades } from '../../../core/interfaces/actividades.interface';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class ActividadesService{
    private readonly api = inject(ActividadesApi); //aqui se inyecta la api

    
    private actividades = signal<Actividades[]>([]);
    private loading = signal(false);

    readonly actividades$ = computed(() => this.actividades());
    readonly loading$ = this.loading.asReadonly();

    //carga todas las actividades
    loadAll() {
    this.loading.set(true);
    this.api.getAll().subscribe({
        next: (res) => {
            const data = (res as any).data ?? res;
            if (!Array.isArray(data)) {
                    this.loading.set(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en formato de datos',
                        text: 'La respuesta del servidor no tiene el formato esperado',
                        confirmButtonColor: '#DB2B39'
                    });
                    return;
                }
            
            if (data.length === 0) {
                    console.warn('No se encontraron actividades');
                }
                
                this.actividades.set(data);
                this.loading.set(false);
        },
        error: (err) => {
            this.loading.set(false);
                
                let mensajeError = 'Error al cargar las actividades';
                
                if (err.status === 404) {
                    mensajeError = 'No se encontró el endpoint de actividades';
                } else if (err.status === 500) {
                    mensajeError = 'Error interno del servidor al obtener actividades';
                } else if (err.status === 0) {
                    mensajeError = 'No se pudo conectar con el servidor';
                } else if (err.error?.message) {
                    mensajeError = err.error.message;
                }
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: mensajeError,
                    confirmButtonColor: '#DB2B39'
                });
            
        }
    });
}
    
    //crea actividades
    create(actividad: CreateActividadDto) {
         if (!actividad || Object.keys(actividad).length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Datos incompletos',
                text: 'No se puede crear una actividad sin datos',
                confirmButtonColor: '#DB2B39'
            });
            return;
        }
        if (!actividad.Nombre || actividad.Nombre.trim() === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Campo requerido',
                text: 'El nombre de la actividad es obligatorio',
                confirmButtonColor: '#DB2B39'
            });
            return;
        }
        
        this.api.create(actividad).subscribe({
            next: (res: any) => {
                if (res?.success !== false) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Actividad creada!',
                        text: 'La actividad se creó correctamente',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    this.loadAll();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al crear',
                        text: res.message || 'No se pudo crear la actividad',
                        confirmButtonColor: '#DB2B39'
                    });
                }
            },
            error: (err) => {
                let mensajeError = 'Error al crear la actividad';
                
                if (err.status === 400) {
                    mensajeError = err.error?.errores?.join(', ') || 'Datos inválidos';
                } else if (err.status === 409) {
                    mensajeError = 'Ya existe una actividad con ese nombre';
                }
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: mensajeError,
                    confirmButtonColor: '#DB2B39'
                });
            }
        });
    }
    
    //actualiza usuario
    update(id: number, data: Partial<CreateActividadDto>){
        if (!id || id <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'ID inválido',
                text: 'El ID de la actividad es inválido',
                confirmButtonColor: '#DB2B39'
            });
            return;
        }
        if (!data || Object.keys(data).length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Sin cambios',
                text: 'No hay datos para actualizar',
                confirmButtonColor: '#DB2B39'
            });
            return;
        }
        if (data.Nombre !== undefined && data.Nombre.trim() === '') {
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
                        title: '¡Actividad actualizada!',
                        text: 'La actividad se actualizó correctamente',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    this.loadAll();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar',
                        text: res.message || 'No se pudo actualizar la actividad',
                        confirmButtonColor: '#DB2B39'
                    });
                }
            },
            error: (err) => {
                let mensajeError = 'Error al actualizar la actividad';
                
                if (err.status === 404) {
                    mensajeError = 'No se encontró la actividad a actualizar';
                } else if (err.status === 400) {
                    mensajeError = err.error?.errores?.join(', ') || 'Datos inválidos';
                }
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: mensajeError,
                    confirmButtonColor: '#DB2B39'
                });
            }
        });
    }

    //elimina usuario
    delete(id: number){
       if (!id || id <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'ID inválido',
                text: 'El ID de la actividad es inválido',
                confirmButtonColor: '#DB2B39'
            });
            return;
        }

         Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro?',
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
                                text: 'La actividad se eliminó correctamente',
                                timer: 1500,
                                showConfirmButton: false
                            });
                            this.loadAll();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error al eliminar',
                                text: res.message || 'No se pudo eliminar la actividad',
                                confirmButtonColor: '#DB2B39'
                            });
                        }
                    },
                    error: (err) => {
                        let mensajeError = 'Error al eliminar la actividad';
                        
                        if (err.status === 404) {
                            mensajeError = 'No se encontró la actividad a eliminar';
                        } else if (err.status === 409) {
                            mensajeError = 'No se puede eliminar porque tiene registros asociados';
                        }
                        
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: mensajeError,
                            confirmButtonColor: '#DB2B39'
                        });
                    }
                });
            }
        });
    }
}
