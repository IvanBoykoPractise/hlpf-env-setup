import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(values: any, metadata: ArgumentMetadata) {
    // Якщо дані не є об'єктом, нічого не робимо
    if (typeof values !== 'object' || !values) {
      return values;
    }

    // Проходимо по всіх полях і обрізаємо пробіли, якщо це текст
    Object.keys(values).forEach((key) => {
      if (typeof values[key] === 'string') {
        values[key] = values[key].trim();
      }
    });

    return values;
  }
}