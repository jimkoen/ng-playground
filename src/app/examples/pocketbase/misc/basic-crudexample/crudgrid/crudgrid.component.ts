import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crudgrid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      crudgrid works!
    </p>
  `,
  styles: [
  ]
})


export class CRUDGridComponent {
  //@Input() public columnDefs : ColumnDefinition = []
  @Input() public rawData : any[] = []


}
