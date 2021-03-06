import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'perecivel'
})
export class PerecivelPipe implements PipeTransform {

  /**
   * @param value  A ser verificado para transformação
   * @returns String processada e transformada conforme value
   */
  transform(value: boolean): string {
    return !!value ? 'Sim' : 'Não';
  }

}
