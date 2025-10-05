// src/app/app.component.ts

import { Component } from '@angular/core';
import { HomeComponent } from './features/home/home';

@Component({
  selector: 'app-root',
  imports: [HomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  title = 'skandia-app';
}
