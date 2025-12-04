import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TipoSuscripcionModalComponent } from "../../components/tipo-suscripcion-modal/tipo-suscripcion-modal.component";
import { TipoSuscripcionTableComponent } from "../../components/tipo-suscripcion-table/tipo-suscripcion-table.component";
import { TipoSuscripcionService } from "../../services/tipo-suscripciones.service";
@Component({
  selector: "app-tipo-suscripcion-list-page",
  standalone: true,
  imports: [
    TipoSuscripcionTableComponent,
    TipoSuscripcionModalComponent,
    CommonModule
  ],
  templateUrl: "./tipo-suscripcion-list-page.component.html",
  styleUrls: ["./tipo-suscripcion-list-page.component.css"],
})
export class TipoSuscripcionListPageComponent implements OnInit {
  readonly service = inject(TipoSuscripcionService);

  showModal = false;
  selected: any = null;

  ngOnInit() {
    this.service.loadAll();
    setTimeout(() => {}, 1000);
  }

  openCreateModal() {
    this.selected = null;
    this.showModal = true;
  }

  openEditModal(item: any) {
    this.selected = item;
    this.showModal = true;
  }

  onSave(data: any) {
    if (this.selected) {
      this.service.update(this.selected.IdTipoSuscripcion, data);
    } else {
      this.service.create(data);
    }

    this.showModal = false;
  }
}
