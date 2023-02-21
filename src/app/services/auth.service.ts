import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


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
    return this.afAuth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  isAuthenticated(): boolean {
    return !!this.afAuth.currentUser;
  }
}
