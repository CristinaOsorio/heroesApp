import { Component, OnInit } from '@angular/core';
import { Heroes, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: [`
    img {
      max-height: 70vh;
    }
  `]
})
export class CreateComponent implements OnInit {
  title: string = '';
  heroID: string = '';
  hero: Heroes = {
    id: '',
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar, 
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap( ({ id }) => {
        this.heroID = id;
        this.title = id ? 'Editar' : 'Nuevo';
        return id ? this.heroesService.getHeroe(id) : of(null);
      }),
    ).subscribe((hero) => {
      if (hero) {
        this.hero = hero;
        return;
      }
        
    }, error => {
      if (error.status == 404) {
        return this.openSnackBar(`No existe el heroe con el ID ${this.heroID}`);
      } 

      error ? this.openSnackBar(`Ha sucedido un error con el servidor.`) : null;
    })
  }

  save() {
    if(this.hero.superhero.trim().length === 0) {
      this.openSnackBar('El campo super heroe es obligatorio.');
      return; 
    }
    (this.heroID) ? this.update() : this.create();
  }

  create() {
    this.heroesService.createHero(this.hero)
    .subscribe( 
      hero =>  {
        this.openSnackBar(`El héroe ${ hero.superhero } ha sido creado.`),
        this.router.navigate(['/heroes', 'edit', hero.id]);
      },
      error => this.openSnackBar('Ha ocurrido un error en el servidor al momento de crear al héroe.'))
  }

  update() {
    this.heroesService.updatedHero(this.hero)
    .subscribe(
      hero => this.openSnackBar(`El héroe ${ hero.superhero } ha sido actualizado.`),
      error =>  this.openSnackBar('Ha ocurrido un error en el servidor al momento de actualizar al héroe.')
    )

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
