// src/app/features/home/components/recommended-products/recommended-products.ts

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recommended-products',
  imports: [CommonModule],
  templateUrl: './recommended-products.html',
  styleUrl: './recommended-products.css',
})
export class RecommendedProducts {
  // Input para controlar la visibilidad desde el padre
  isVisible = input<boolean>(false);

  // Estado para favorito
  isFavorite = false;

  // Estado para los dots (simulación de slider de recomendaciones)
  currentDot = 0;


  // Siguiente recomendación
  nextRecommendation(): void {
    this.currentDot = (this.currentDot + 1) % 3;
    console.log('➡️ Siguiente recomendación:', this.currentDot);
  }

  // Ir a un dot específico
  goToDot(index: number): void {
    this.currentDot = index;
  }
}
