import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(hero: Heroes): string {

    if(!hero.id || (hero.hasOwnProperty('alt_img') && !hero.alt_img)) {
      return `assets/no-image.png`;
    }

    return hero.alt_img ? hero.alt_img : `assets/heroes/${hero.id}.jpg`;

  }

}
