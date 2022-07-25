import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CreateComponent } from './pages/create/create.component';
import { SearchComponent } from './pages/search/search.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { HeroesRoutingModule } from './heroes-routing.module';

import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeroCardComponent } from './components/hero-card/hero-card.component';

@NgModule({
  declarations: [
    CreateComponent,
    SearchComponent,
    HeroeComponent,
    HomeComponent,
    ListComponent,
    HeroCardComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    HeroesRoutingModule,
    MaterialModule
  ]
})
export class HeroesModule { }
