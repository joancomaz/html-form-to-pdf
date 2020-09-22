import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  forma: FormGroup;
  equipos: any[] = [
    {id: 1, nombre: 'Masculí'},
    {id: 2, nombre: 'Femení'},
    {id: 3, nombre: 'kkkkk'},
  ];

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
  }

  guardar(): boolean {
    console.log(this.forma);

    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach(control => {
          console.log(control);

          if (control instanceof FormGroup) {
            Object.values(control.controls).forEach(control => control.markAsTouched());
          } else {
            control.markAsTouched();
          }
        }
      );
      return;
    }
  }

  get nombreNoValido(): boolean {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get equipoNoValido(): boolean {
    return this.forma.get('equipo').invalid && this.forma.get('equipo').touched;
  }

  crearFormulario(): void {
    this.forma = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('[a-zA-Z ]*')
        ]
      ],
      equipo: [
        '',
        [
          Validators.required
        ]
      ],
    });
  }
}
