import { inject, Injectable, signal, computed } from '@angular/core';
import { TipoSuscripcionApi } from '../api/tipo-suscripciones.api';
import { TipoSuscripcion } from '../../../core/interfaces/tipo-suscripcion.interface';
import { CrearTipoSuscripcionDto } from '../types/create-tipo-suscripcion.dto';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class TipoSuscripcionService {

    private readonly api = inject(TipoSuscripcionApi);

    private tipos = signal<TipoSuscripcion[]>([]);
    private loading = signal(false);

    readonly tipos$ = computed(() => this.tipos());
    readonly loading$ = this.loading.asReadonly();


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
                    console.warn('No se encontraron tipos de suscripción');
                }

                this.tipos.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                this.loading.set(false);
                let mensajeError = 'Error al cargar los tipos de suscripción';

                if (err.status === 404) {
                    mensajeError = 'No se encontró el endpoint de tipos de suscripción';
                } else if (err.status === 500) {
                    mensajeError = 'Error interno del servidor';
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

   
    create(dto: CrearTipoSuscripcionDto) {

        if (!dto || Object.keys(dto).length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Datos incompletos',
                text: 'No se puede crear un tipo de suscripción sin datos',
                confirmButtonColor: '#DB2B39'
            });
            return;
        }

        if (!dto.Nombre || dto.Nombre.trim() === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Campo requerido',
                text: 'El nombre del tipo de suscripción es obligatorio',
                confirmButtonColor: '#DB2B39'
            });
            return;
        }

        this.api.create(dto).subscribe({
            next: (res: any) => {
                if (res?.success !== false) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Creado!',
                        text: 'El tipo de suscripción fue registrado correctamente',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    this.loadAll();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al crear',
                        text: res.message || 'No se pudo crear el tipo de suscripción',
                        confirmButtonColor: '#DB2B39'
                    });
                }
            },
            error: (err) => {
                let mensajeError = 'Error al crear el tipo de suscripción';

                if (err.status === 400) {
                    mensajeError = err.error?.errores?.join(', ') || 'Datos inválidos';
                } else if (err.status === 409) {
                    mensajeError = 'Ya existe un tipo de suscripción con ese nombre';
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

    
    update(id: number, dto: Partial<CrearTipoSuscripcionDto>) {

        if (!id || id <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'ID inválido',
                text: 'El ID del tipo de suscripción es inválido',
                confirmButtonColor: '#DB2B39'
            });
            return;
        }

        if (!dto || Object.keys(dto).length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Sin cambios',
                text: 'No hay datos para actualizar',
                confirmButtonColor: '#DB2B39'
            });
            return;
        }

        if (dto.Nombre !== undefined && dto.Nombre.trim() === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Nombre inválido',
                text: 'El nombre no puede estar vacío',
                confirmButtonColor: '#DB2B39'
            });
            return;
        }

        this.api.update(id, dto).subscribe({
            next: (res: any) => {
                if (res?.success !== false) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Actualizado!',
                        text: 'El tipo de suscripción se actualizó correctamente',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    this.loadAll();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar',
                        text: res.message || 'No se pudo actualizar',
                        confirmButtonColor: '#DB2B39'
                    });
                }
            },
            error: (err) => {
                let mensajeError = 'Error al actualizar el tipo de suscripción';

                if (err.status === 404) {
                    mensajeError = 'No se encontró el tipo de suscripción';
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

    
    delete(id: number) {

        if (!id || id <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'ID inválido',
                text: 'El ID del tipo de suscripción es inválido',
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
                                text: 'El tipo de suscripción fue eliminado',
                                timer: 1500,
                                showConfirmButton: false
                            });
                            this.loadAll();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error al eliminar',
                                text: res.message || 'No se pudo eliminar',
                                confirmButtonColor: '#DB2B39'
                            });
                        }
                    },
                    error: (err) => {
                        let mensajeError = 'Error al eliminar el tipo de suscripción';

                        if (err.status === 404) {
                            mensajeError = 'El tipo de suscripción no existe';
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
