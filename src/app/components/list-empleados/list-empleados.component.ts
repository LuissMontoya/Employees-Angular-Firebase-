import { EmpleadoService } from './../../services/empleado.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css'],
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];

  constructor(
    private _empleadosService: EmpleadoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this._empleadosService.getEmpleados().subscribe((data) => {
      this.empleados = [];
      data.forEach((element: any) => {
        //console.log(element.payload.doc.id);
        //console.log(element.payload.doc.data());
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.empleados);
    });
  }

  eliminarEmpleado(id: string) {
    this._empleadosService
      .eliminarEmpleado(id)
      .then(() => {
        this.toastr.error(
          'Empleado Eliminado con Éxito!',
          'Registro Eliminado!',
          { positionClass: 'toast-bottom-right' }
        );
        //console.log('Empleado eliminado con Éxito!');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
