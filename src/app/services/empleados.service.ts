import { Injectable } from '@angular/core';
import { EmpleadoModel } from '../models/empleados.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  empleado:any;
  empleadoId:any;

  constructor(private firestore:AngularFirestore,private router:Router) { }

  clearEmpleado(){
    this.empleado = null
    this.empleadoId = null
    this.router.navigate(['/empleados'])
    console.log('limpiando...');
  }

  getEmpleado(id:string): Observable<any> {
    return this.firestore.collection('empleado').doc(id).snapshotChanges()
  }

  getClientes(): Observable<any> {
    return this.firestore.collection('empleado').snapshotChanges();
  }

  postEmpleado(data:EmpleadoModel): Promise<any> {
    return this.firestore.collection('empleado').add(data)
  }

  putEmpleado(id:string, data:EmpleadoModel) : Promise<any> {
    return this.firestore.collection('empleado').doc(id).update(data)
  }

  deleteEmpleado(id:string){
    return this.firestore.collection('empleado').doc(id).delete()
  }

}
