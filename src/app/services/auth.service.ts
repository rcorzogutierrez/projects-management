import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.loggedIn.next(true);
      } else {
        this.loggedIn.next(false);
      }
    });
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.loggedIn.next(true); // actualiza el valor de loggedIn
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      this.loggedIn.next(false); // actualiza el valor de loggedIn
      this.router.navigate(['/login']);
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user) // convierte user en un booleano que indica si el usuario está autenticado
    );
  }
}
