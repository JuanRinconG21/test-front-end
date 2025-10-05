import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goal-card',
  imports: [CommonModule],
  templateUrl: './goal-card.html',
  styleUrl: './goal-card.css',
})
export class GoalCard {
  // Inputs para personalizar la tarjeta (opcional)
  title = input<string>('Conocer a mi sobrino');
  category = input<string>('Bienestar');
  date = input<string>('Diciembre/2022');
  targetAmount = input<string>('$ 6.000.000');
  currentAmount = input<string>('$ 0');
}
