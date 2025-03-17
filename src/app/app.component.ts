import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  standalone: false ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'testPrimeNgAndThalid';
  value: string = '';

  handleClick() {
    console.log('Value:', this.value);
    alert(`Submitted value: ${this.value}`);
  }
}
