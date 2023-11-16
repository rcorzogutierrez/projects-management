import { Material } from "./materiales";

export interface Project {
  id:string;
  clientSelect: string;
  categoria: string;
  fechaInicio: Date;
  fechaFin: Date;
  subTotalMat: number;
  subtotalTrabajadores: number;
  projecType: string;
  totalProyecto: number;
  materials: any[];
  trabajadores: any[];
}

export interface FilaTabla {
  
  cliente: string;
  mostrarDetalles: boolean;
  proyectos: {
    id:string;
    clientSelect: string;
    categoria: string;
    fechaInicio: Date;
    fechaFin: Date;
    subTotalMat: number;
    subtotalTrabajadores: number;
    projecType: string;
    totalProyecto: number;
    materials: Material[]; // Ahora incluye la lista de materiales completos
    trabajadores: any[];
  };
}

