import { EmpleadoService } from './../../services/empleado.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css'],
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  loading = false;


  constructor(
    private fb: FormBuilder,
    private _EmpleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  agregarEmpleado() {
    this.submitted = true;
    if (this.createEmpleado.invalid) {
      return;
    }
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };

    this.loading = true;

    this._EmpleadoService
      .agregarEmpleado(empleado)
      .then(() => {
        this.router.navigate(['/list-empleados']);
        this.toastr.success(
          'Empleado registrado con Éxito!',
          'Empleado Registrado!',
          { positionClass: 'toast-bottom-right' }
        );
      })
      .catch((error) => {
        this.loading = false;
        console.log('Error: ', error);
      });
  }
}
