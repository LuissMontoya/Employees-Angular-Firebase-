import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private firestore: AngularFirestore) {}

  agregarEmpleado(empleado: any): Promise<any> {
    return this.firestore.collection('Empleados').add(empleado);
  }

  getEmpleados(): Observable<any> {
    return this.firestore
      .collection('Empleados', (ref) => ref.orderBy('fechaCreacion', 'asc'))
      .snapshotChanges();
  }

  eliminarEmpleado(id: string): Promise<any>{
    return this.firestore.collection('Empleados').doc(id).delete();
  }

  getEmpleado(id: string): Observable<any>{
    return this.firestore.collection('Empleados').doc(id).snapshotChanges();
  }

  actualizarEmpleado(id: string, data: any):Promise<any>{
    return this.firestore.collection('Empleados').doc(id).update(data);
  }
}
