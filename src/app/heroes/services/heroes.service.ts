import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Heroes } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private api = environment.api;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroes[]> {
    return this.http.get<Heroes[]>(`${this.api}/heroes`)
  }

  getHeroe(id: string): Observable<Heroes> {
    return this.http.get<Heroes>(`${this.api}/heroes/${id}`)
  }

  filterHeroes(data: string): Observable<Heroes[]> {
    const params = new HttpParams().set('q', data).set('limit', 6)
    return this.http.get<Heroes[]>(`${this.api}/heroes`, { params });
  }

  createHero(hero: Heroes): Observable<Heroes> {
    return this.http.post<Heroes>(`${this.api}/heroes`, hero);
  }

  updatedHero(hero: Heroes): Observable<Heroes> {
    return this.http.put<Heroes>(`${this.api}/heroes/${hero.id}`, hero);
  }

  deleteHero(hero: Heroes): Observable<Heroes> {
    return this.http.delete<Heroes>(`${this.api}/heroes/${hero.id}`);
  }

}
