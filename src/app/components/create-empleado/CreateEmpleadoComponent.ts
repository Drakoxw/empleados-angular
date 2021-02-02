import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoModel } from 'src/app/models/empleados.model';
import { EmpleadosService } from 'src/app/services/empleados.service';


@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  titulo:string = 'Crear Empleado';
  botonText:string = 'Agregar'
  createEmpleado:FormGroup;
  sumitted:boolean = false;
  loading:boolean = false;
  empleado:EmpleadoModel ;
  modoEditar:boolean = false;


  constructor(private empleadoServ:EmpleadosService,
              private router:Router,
              private fb:FormBuilder,
              private toastr: ToastrService){

    this.empleado = empleadoServ.empleado;
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.empleado = this.empleadoServ.empleado
    if (this.empleado) {
      this.modoEditar = true;
      this.botonText = 'Enviar'
      this.titulo = 'Editar Empleado';
      this.createEmpleado.patchValue({
        nombre: this.empleado.nombre,
        apellido: this.empleado.apellido,
        salario: this.empleado.salario,
        documento: this.empleado.documento,
      })
    }

  }

  resetValores(){
    this.empleadoServ.clearEmpleado()
  }

  addEmpleado(){
    this.sumitted = true
    this.loading = true

    if (this.createEmpleado.invalid) {
      return
    }

    if (this.modoEditar) {
      const { nombre, salario, apellido, documento} = this.createEmpleado.value
      const empleado:EmpleadoModel = {
        nombre,
        apellido,
        documento,
        salario: Number(salario),
        creacion: this.empleado.creacion,
        fechaMod: new Date
      }
      this.empleadoServ.putEmpleado(this.empleadoServ.empleadoId, empleado)
      .then(() => {
        this.resetValores()
        this.toastr.success('Empleado actualizado con éxito!', 'REGISTRO COMPLETO',{
          timeOut:4000
        })
      })
      .catch((err) => this.toastr.error(err,'ERROR DB!!!',{
        timeOut:7000
      }))

    } else {
      const { nombre, salario, apellido, documento} = this.createEmpleado.value
      const empleado:EmpleadoModel = {
        nombre,
        apellido,
        documento,
        salario: Number(salario),
        creacion: new Date,
        fechaMod: new Date
      }

      this.empleadoServ.postEmpleado(empleado)
      .then(() => {
        this.toastr.success('Empleado añadido con éxito!', 'REGISTRO COMPLETO',{
          timeOut:4000
        });
        this.loading = true
        this.router.navigate(['/empleados'])
      })
      .catch((err) => this.toastr.error(err,'ERROR DB!!!',{
        timeOut:7000
      }))
    }
  }
}
