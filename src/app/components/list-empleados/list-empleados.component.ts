import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados:any[] = [];
  id?:string;
  x=1

  constructor(private empleadoServ: EmpleadosService,
              private router:Router,
              private toastr: ToastrService) {}


  ngOnInit(): void {
    this.empleadoServ.getClientes().subscribe((empleado) => {
      this.x++
      if (this.x <= 2) {
        this.empleados = [];
        empleado.forEach((data:any) => {
          this.empleados.push({
            ...data.payload.doc.data(),
            id: data.payload.doc.id
          })
        })
        console.log(`this.empleados`, this.empleados);
      }
    })
  }

  getId(id:string){
    this.id = id;
    this.x = 1
    let x = this.x
    console.log(`id`, this.id);
    this.empleadoServ.getEmpleado(this.id).subscribe((empleado) => {
      x ++;
      if (x === 2) {
        this.empleadoServ.empleado = empleado.payload.data();
        this.empleadoServ.empleadoId = this.id
        this.router.navigate(['/edit-empleados'])
      }
    })
  }

  getIdDelete(id:string, nomb:string){
  this.x = 1
    let ok = confirm('Desea eliminar a: '+ nomb)
    if (ok) {
      this.empleadoServ.deleteEmpleado(id).then(() => {
        this.toastr.info('Empleado eliminado con éxito!', 'REGISTRO BORRADO',{
          timeOut:4000
        })
      })
    }
  }
}
