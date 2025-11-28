import { Component, inject, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { UsersTableComponent } from "../../components/users-table/users-table.component";
import { UserModalComponent } from "../../components/user-modal/user-modal.component";
import { CommonModule } from "@angular/common";
@Component ({
    selector: 'app-users-list-page',
    standalone: true,
    imports: [UsersTableComponent, UserModalComponent, CommonModule], //aqui estamos trayendo la tabla que creamos en la seccion de componentes, esto es reutilizable
     templateUrl: './users-list-page.component.html',
    styleUrls: ['./users-list-page.component.css']
})
export class UsersListPageComponent implements OnInit{
    readonly service = inject(UsersService); //aqui inyectamos el servicio de users
    showModal= false;
    selectedUser: any=null;


    ngOnInit(){
        this.service.loadAll(); //esto carga los usuarios al entrar a la pag
    }

    openCreateModal() {
      this.selectedUser=null;
      this.showModal=true;
    }

    openEditModal(user:any){
      this.selectedUser = user;
      this.showModal = true;
    }

    onSave(data:any){
      if(this.selectedUser){
        this.service.update(this.selectedUser.id, data)
      }else{
        this.service.create(data);
      }

      this.showModal = false;
    }
}