import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Heroes, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

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
    private heroesService: HeroesService,
    public dialog: MatDialog
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
        this.redirectTo();
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

  delete() {

    const hero = {...this.hero };

    const dialog = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: hero
    });

    dialog.afterClosed()
    .pipe(
      switchMap(result => (result) ? this.heroesService.deleteHero(this.hero) : of(null))
    )
      .subscribe( result => {
        if(result ) {
          this.openSnackBar(`El héroe ${ hero.superhero } ha sido eliminado.`);
          this.redirectTo();
        }
      },
      error =>  
        this.openSnackBar('Ha ocurrido un error en el servidor al momento de eliminar al héroe.')
    );  
  }

  private redirectTo() {
    this.router.navigate(['/heroes', 'list']);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
