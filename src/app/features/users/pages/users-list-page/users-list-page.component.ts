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
        setTimeout(() => {
    }, 1000);
    }

    openEditModal(user:any){
      this.selectedUser = user;
      this.showModal = true;

      console.log('Usuario seleccionado para editar:', user);
  console.log('ID del usuario:', user.Id, user.id, user.idUsuario);
    }

    onSave(data:any){
      if(this.selectedUser){
         console.log('Usuario completo:', this.selectedUser);
        console.log('UserId:', this.selectedUser.UserId);     
        this.service.update(this.selectedUser.UserId, data);

      }
      setTimeout(() => {
        this.showModal = false;
        this.selectedUser = null;
    }, 500);
    }
}