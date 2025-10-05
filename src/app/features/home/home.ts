// src/app/features/home/home.component.ts

import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/components/header/header';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { HeroBanner } from '../components/hero-banner/hero-banner';
import { GoalCard } from '../components/goal-card/goal-card';
import { ProductsSlider } from '../components/products-slider/products-slider';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Header, Sidebar, HeroBanner, GoalCard, ProductsSlider, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  // Estado reactivo
  sidebarExpanded = signal(false);

  // Alternar sidebar
  onMenuToggle(): void {
    this.sidebarExpanded.update((value) => !value);
  }

  // Cerrar al hacer clic en items
  onSidebarItemClick(): void {
    if (window.innerWidth < 768) {
      this.sidebarExpanded.set(false);
    }
  }

  onSidebarClick(): void {
    if (window.innerWidth >= 1024) {
      this.sidebarExpanded.update((value) => !value);
    }
  }

  // Cerrar al hacer clic fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (window.innerWidth < 768) {
      const target = event.target as HTMLElement;
      const clickedInsideSidebar = target.closest('.sidebar');
      const clickedMenuButton = target.closest('.header-nav__menu-btn');

      if (!clickedInsideSidebar && !clickedMenuButton && this.sidebarExpanded()) {
        this.sidebarExpanded.set(false);
      }
    }
  }
}
