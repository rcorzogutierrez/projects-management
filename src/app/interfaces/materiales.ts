import { FormControl, FormGroup } from "@angular/forms";

export interface Materiales {
    id: number;
  nombre: string;
  precio: number;
  quantity: number;
  formGroup: FormGroup<{ quantity: FormControl<number | null> }>;
  
}