// src/app/features/home/home.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ========================================
  // TEST 1: CREACIÓN Y RENDERIZADO DE COMPONENTES
  // ========================================
  it('should create and render all child components', () => {
    expect(component).toBeTruthy();

    const compiled = fixture.nativeElement as HTMLElement;

    // Verificar que se renderizan todos los componentes hijos
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('app-sidebar')).toBeTruthy();
    expect(compiled.querySelector('.main-content')).toBeTruthy();
    expect(compiled.querySelector('app-hero-banner')).toBeTruthy();
    expect(compiled.querySelector('app-goal-card')).toBeTruthy();
    expect(compiled.querySelector('app-products-slider')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  // ========================================
  // TEST 2: TOGGLE DEL SIDEBAR
  // ========================================
  it('should toggle sidebar state', () => {
    // Estado inicial: sidebar colapsado
    expect(component.sidebarExpanded()).toBe(false);

    // Toggle: abrir
    component.onMenuToggle();
    expect(component.sidebarExpanded()).toBe(true);

    // Toggle: cerrar
    component.onMenuToggle();
    expect(component.sidebarExpanded()).toBe(false);

    // Toggle múltiple
    component.onMenuToggle();
    component.onMenuToggle();
    component.onMenuToggle();
    expect(component.sidebarExpanded()).toBe(true);
  });

  // ========================================
  // TEST 3: ESTADO DEL SIDEBAR
  // ========================================
  it('should manage sidebar expanded state with signals', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Verificar que es un signal
    expect(typeof component.sidebarExpanded).toBe('function');
    expect(typeof component.sidebarExpanded()).toBe('boolean');

    // Cambiar estado manualmente
    component.sidebarExpanded.set(true);
    expect(component.sidebarExpanded()).toBe(true);
    fixture.detectChanges();

    component.sidebarExpanded.set(false);
    expect(component.sidebarExpanded()).toBe(false);
    fixture.detectChanges();

    // Verificar que sidebar existe
    const sidebar = compiled.querySelector('app-sidebar');
    expect(sidebar).toBeTruthy();
  });
});
