import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActividadesService } from "../../services/actividades.service";
import { ActividadModalComponent } from "../../components/actividad-modal/actividad-modal.component";
import { ActividadesTableComponent } from "../../components/actividades-table/actividades-table.component";
@Component ({
    selector: 'app-actividades-list-page',
    standalone: true,
    imports: [ ActividadesTableComponent, ActividadModalComponent, CommonModule], //aqui estamos trayendo la tabla que creamos en la seccion de componentes, esto es reutilizable
     templateUrl: './actividades-list-page.component.html',
    styleUrls: ['./actividades-list-page.component.css']
})
export class ActividadesListPageComponent implements OnInit{
    readonly service = inject(ActividadesService); //aqui inyectamos el servicio de actividades
    showModal= false;
    selectedActivity: any=null;


    ngOnInit(){
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
        const id = this.selectedActivity.IdEvento;
        
        if(!id) {
            return;
        }
        
        this.service.update(id, data);
    } else {
        this.service.create(data);
    }
setTimeout(() => {
        this.showModal = false;
        this.selectedActivity = null;
    }, 500);
}
}