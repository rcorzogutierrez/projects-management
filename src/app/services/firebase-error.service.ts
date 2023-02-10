import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }

  codeError(code:string){
    switch(code){
      case 'auth/email-already-in-use':
      return 'El usuario ya existe';
      case 'auth/weak-password':
      return 'La contraseña es muy debil';
      case 'auth/invalid-email':
      return 'Correo invalido';
      case 'auth/wrong-password':
        return 'Contraseña Incorrecta';
        case 'auth/user-not-found':
          return 'Usuario no encontrado';
      default:
        return 'Error desconocido'
    }
  }
}
