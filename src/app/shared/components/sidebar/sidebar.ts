// src/app/shared/components/sidebar/sidebar.ts

import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  // Input: recibe si está expandido desde el padre
  isExpanded = input<boolean>(false);

  // Output: emite cuando se hace clic en un item
  itemClicked = output<void>();

  // Output: emite cuando se hace clic en el sidebar (solo desktop)
  sidebarClicked = output<void>();

  // Cuando se hace clic en un item
  onItemClick(): void {
    this.itemClicked.emit();
  }

  // Cuando se hace clic en cualquier parte del sidebar (solo desktop)
  onSidebarClick(event: MouseEvent): void {
    // Solo en desktop
    if (window.innerWidth >= 1024) {
      this.sidebarClicked.emit();
    }
  }
}
