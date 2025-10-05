// src/app/features/home/components/hero-banner/hero-banner.ts

import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero-banner',
  imports: [],
  templateUrl: './hero-banner.html',
  styleUrl: './hero-banner.css',
})
export class HeroBanner {
  // Inputs opcionales para personalizar el banner
  title = input<string>('¡Tu objetivo ha sido agregado exitosamente!');
  subtitle = input<string>('¡Te hemos enviado un correo con la notificación!');
  breadcrumbText = input<string>('Ir al inicio');
}
