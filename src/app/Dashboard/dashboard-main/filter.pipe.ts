import { Pipe, type PipeTransform } from "@angular/core"

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filterValue: string, filterProperty: string): any[] {
    if (!items || !filterValue) {
      return items
    }

    return items.filter((item) => item[filterProperty].toLowerCase() === filterValue.toLowerCase())
  }
}

