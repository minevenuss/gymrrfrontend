import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { inject } from "@angular/core";


@Component ({
    selector: 'app-user-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.css']
})

export class UserModalComponent {
    @Input() user:any =null;
    @Input() isEdit=true;
    @Output() save = new EventEmitter<any>();
    @Output() close = new EventEmitter<void>();

    private fb = inject(FormBuilder);

    form = this.fb.group({
        primerNombre: ['', Validators.required],
        primerApellido:['', Validators.required],
        UserName: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        Rol: ['Cliente', Validators.required]
    });

    ngOnChanges() {
    if (this.user && this.isEdit) {
      this.form.patchValue({
        primerNombre: this.user.primerNombre || '',
        primerApellido: this.user.primerApellido || '',
        UserName: this.user.UserName || this.user.userName || '',
        Email: this.user.Email || this.user.email || '',
        Rol: this.user.Rol || this.user.rol || 'Cliente'
      });
    }
  }

    onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dataToSend = {
      primerNombre: this.form.value.primerNombre,
      primerApellido: this.form.value.primerApellido,
      UserName: this.form.value.UserName,
      Email: this.form.value.Email,
      Rol: this.form.value.Rol
    };

    this.save.emit(dataToSend);
  }
  hasError(field: string, error: string = 'required') {
    const control = this.form.get(field);
    return control && control.touched && control.hasError(error);
  }
}