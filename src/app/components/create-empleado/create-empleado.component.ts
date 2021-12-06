import { EmpleadoService } from './../../services/empleado.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  id: string | null;
  titulo = 'Agregar Empleado';
  txtBoton = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private _EmpleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarEmpleado() {
    this.submitted = true;
    if (this.createEmpleado.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarEmpleado();
    } else {
      this.editarEmpleado(this.id);
    }
  }

  agregarEmpleado() {
    this.titulo = 'Agregar Empleado';
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

  editarEmpleado(id: string) {
    this.loading = true;

    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaActualizacion: new Date(),
    };

    this._EmpleadoService.actualizarEmpleado(id, empleado).then(() => {
      this.loading = false;
      this.toastr.info(
        'Empleado modificado con Éxito!',
        'Empleado Actualizado!',
        { positionClass: 'toast-bottom-right' }
      );
      this.router.navigate(['/list-empleados']);
    });
  }

  esEditar() {
    this.titulo = 'Agregar Empleado';
    if (this.id !== null) {
      this.titulo = 'Editar Empleado';
      this.txtBoton = 'Actualizar';
      this.loading = true;
      this._EmpleadoService.getEmpleado(this.id).subscribe((data) => {
        this.loading = false;
        console.log(data.payload.data()['nombre']);
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
        });
      });
    }
  }
}
