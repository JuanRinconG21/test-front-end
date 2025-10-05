import { Component, output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Event emitter para comunicar con el componente padre
  menuToggle = output<void>();

  toggleMenu(): void {
    this.menuToggle.emit();
  }
}
