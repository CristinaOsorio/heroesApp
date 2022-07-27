import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string = environment.api;
  private _auth: User | undefined;

  get auth() {
    return { ...this._auth };
  }

  constructor(private http: HttpClient) { }

  verifiedAuthentication(): Observable<boolean> {
    const token = localStorage.getItem('token');    

    if (!token) return of(false);

    return this.http.get<User>(`${this.api}/usuarios/${token}`)
      .pipe(
        map(auth => {
          this._auth = auth ? auth : undefined;
           return auth ? true : false
          }),
        catchError(error => of(false))
      );
  }


  login(): Observable<User> {
    return this.http.get<User>(`${this.api}/usuarios/1`).pipe(
      tap(auth => (this._auth = auth)),
      tap(auth => (localStorage.setItem('token', auth.id))),
    );
  }

  logout() {
    this._auth = undefined;
    localStorage.removeItem('token');
  }
}
