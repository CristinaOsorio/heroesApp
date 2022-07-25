import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Heroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  heroId!: string;
  hero!: Heroes;

  constructor(private activatedRoute: ActivatedRoute, private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.getHeroe(id))
  }

  getHeroe(id: string): void {
    this.heroesService.getHeroe(id).subscribe(hero => (this.hero = hero))
  }

}
