import { FormControl, FormGroup } from "@angular/forms";

export interface Material {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;  
}

export interface Materiales {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;  
  quantity: number;
  formGroup: FormGroup<{ quantity: FormControl<number | null> }>;
}