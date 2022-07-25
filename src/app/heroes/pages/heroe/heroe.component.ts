import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';
import { Heroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width : 100%;
      border-radius: 5px
    }
  `]
})
export class HeroeComponent implements OnInit {
  loading: boolean = true;
  heroId!: string;
  hero!: Heroes;

  constructor(private activatedRoute: ActivatedRoute, private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap( ({id}) => {
        return this.heroesService.getHeroe(id)
      }),
      tap(hero => console.log(hero))
    ).subscribe((hero) => (this.hero = hero))
  }

  getHeroe(id: string): void {
    this.heroesService.getHeroe(id).subscribe(hero => {
      this.hero = hero;
      this.loading = false;
    })
  }

}
