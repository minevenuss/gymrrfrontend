import { Component, inject, OnInit } from '@angular/core';
import { CargoService } from '../../services/cargo.service';
import { CargoTableComponent } from "../../components/cargo-table.component/cargo-table.component";
import { CargoModalComponent } from '../../components/cargo-modal.component/cargo-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cargo-page',
  standalone:true,
  imports: [CargoTableComponent, CargoModalComponent, CommonModule],
  templateUrl: './cargo-page.html',
  styleUrl: './cargo-page.css',
})
export class CargoPage implements OnInit{
    readonly service = inject(CargoService); //aqui inyectamos el servicio de actividades
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

    openEditModal(cargo:any){
      this.selectedActivity = cargo;
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
