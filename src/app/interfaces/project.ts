import { Material } from "./materiales";

export interface Project {
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
  proyectos: {
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

