import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: Heroes): string {
    if(value!.alt_img) {
      return `assets/heroes/${ value.id }.jpg`;
    }
    return `assets/no-image.png`;

  }

}
