import { Component, inject, OnInit } from '@angular/core';
import { SuscripcionesTableComponent } from "../../components/suscripciones-table.component/suscripciones-table.component";
import { SuscripcionesService } from '../../services/suscripciones.service';
import { SuscripcionesModalComponent } from '../../components/suscripciones-modal.component/suscripciones-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suscripciones-page',
  standalone:true,
  imports: [SuscripcionesTableComponent, SuscripcionesModalComponent, CommonModule],
  templateUrl: './suscripciones-page.html',
  styleUrl: './suscripciones-page.css',
})
export class SuscripcionesPage {
  readonly service = inject(SuscripcionesService); //aqui inyectamos el servicio de actividades
    showModal= false;
    selectedActivity: any=null;


    ngONInit(){
        this.service.loadAll(); //esto carga las acitividades al entrar a la pag
        setTimeout(() => {
    }, 1000);
    }

    openCreateModal() {
      this.selectedActivity=null;
      this.showModal=true;
    }

    openEditModal(actividad:any){
      this.selectedActivity = actividad;
      this.showModal = true;
    }

    onSave(data: any) {

    if(this.selectedActivity) {
        const id = this.selectedActivity.IdSuscripcion;

        if(!id) {
            return;
        }

        this.service.update(id, data);
    } else {
        this.service.create(data);
    }
    this.showModal = false;
}
}
