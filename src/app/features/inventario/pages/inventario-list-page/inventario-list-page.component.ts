import { Component, inject, OnInit } from "@angular/core";
import { InventarioService } from "../../services/inventario.service";
import { CommonModule } from "@angular/common";
import { InventarioTableComponent } from "../../components/inventario-table/inventario-table.component";
import { InventarioModalComponent } from "../../components/inventario-modal/inventario-modal.component";
import { Footer } from "../../../../shared/components/footer/footer";
@Component ({
    selector: 'app-inventario-list-page',
    standalone: true,
    imports: [InventarioTableComponent, InventarioModalComponent, CommonModule], //aqui estamos trayendo la tabla que creamos en la seccion de componentes, esto es reutilizable
     templateUrl: './inventario-list-page.component.html',
    styleUrls: ['./inventario-list-page.component.css']
})
export class InventarioListPageComponent implements OnInit{
    readonly service = inject(InventarioService); //aqui inyectamos el servicio de inventario
    showModal= false;
    selectedInventario: any=null;


    ngOnInit(){
        this.service.loadAll();
    }

    openCreateModal() {
      this.selectedInventario=null;
      this.showModal=true;
    }

    openEditModal(inventario:any){
      this.selectedInventario = inventario;
      this.showModal = true;
    }

    onSave(data:any){
      if(this.selectedInventario){
        this.service.update(this.selectedInventario.id, data)
      }else{
        this.service.create(data);
      }

      this.showModal = false;
    }
}
