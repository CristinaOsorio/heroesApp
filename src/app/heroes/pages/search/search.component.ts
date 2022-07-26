import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Heroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {
  word:string = '';
  heroesOptions!: Heroes[];
  heroSelected!: Heroes;
  

  constructor(
    private heroesService: HeroesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  search() {
    return this.heroesService.filterHeroes(this.word.trim())
      .subscribe(heroes => {
        if (heroes.length == 0) {
          this.openSnackBar();
          this.heroesOptions = [];
          return;
        } 
        this.heroesOptions = heroes;        
      })
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    const hero: Heroes = event.option.value;
    this.word = hero.superhero;
    this.search()  
  }

  openSnackBar() {
    this._snackBar.open(`No se encontro resultados con el término ${this.word}.`, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
