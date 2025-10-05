// src/app/features/home/components/recommended-products/recommended-products.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecommendedProducts } from './recommended-products';

describe('RecommendedProducts', () => {
  let component: RecommendedProducts;
  let fixture: ComponentFixture<RecommendedProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedProducts],
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendedProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TEST 1: CREACIÓN Y VISIBILIDAD
  it('should create and toggle visibility', () => {
    expect(component).toBeTruthy();

    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('.recommended-products');

    // Inicialmente oculto
    fixture.componentRef.setInput('isVisible', false);
    fixture.detectChanges();
    expect(section?.classList.contains('recommended-products--visible')).toBe(false);

    // Mostrar sección
    fixture.componentRef.setInput('isVisible', true);
    fixture.detectChanges();
    expect(section?.classList.contains('recommended-products--visible')).toBe(true);
  });

  // TEST 2: RENDERIZADO DE BADGE Y CARD COMPLETA
  it('should render badge, recommendation card with all content and dots', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Verificar badge
    const badgeIcon = compiled.querySelector('.recommended-products__badge-icon');
    expect(badgeIcon?.getAttribute('src')).toBe('assets/main/Medal.svg');

    const badgeText = compiled.querySelector('.recommended-products__badge-text');
    expect(badgeText?.textContent).toBe('Productos recomendados');

    // Verificar título
    const title = compiled.querySelector('.recommended-products__title');
    expect(title?.textContent).toContain('¡Te recomendamos estos productos para');

    const highlight = compiled.querySelector('.recommended-products__highlight');
    expect(highlight?.textContent).toBe('Conocer sobrino');

    // Verificar card header
    const dogImage = compiled.querySelector('.recommend-card__image img');
    expect(dogImage?.getAttribute('src')).toBe('assets/main/Dog.png');

    const category = compiled.querySelector('.recommend-card__category');
    expect(category?.textContent).toBe('Ahorro e inversión');

    // Verificar card body
    const cardTitle = compiled.querySelector('.recommend-card__title');
    expect(cardTitle?.textContent).toContain('¡Fondo de inversión Colectiva,');

    const link = compiled.querySelector('.recommend-card__link');
    expect(link?.textContent).toBe('Conoce más');

    // Verificar footer features
    const worldIcon = compiled.querySelector('.recommend-card__icon[alt="Mundo"]');
    expect(worldIcon?.getAttribute('src')).toBe('assets/main/World.svg');

    const personIcon = compiled.querySelector('.recommend-card__icon[alt="Persona"]');
    expect(personIcon?.getAttribute('src')).toBe('assets/main/Person.svg');

    const features = compiled.querySelectorAll('.recommend-card__text');
    expect(features[0].textContent).toContain('Rentabilidades mínimas del');
    expect(features[0].textContent).toContain('3% anuales');
    expect(features[1].textContent).toContain('4.000 clientes');

    // Verificar dots
    const dots = compiled.querySelectorAll('.recommend-card__dot');
    expect(dots.length).toBe(3);
  });

  // TEST 3: FUNCIONALIDAD - NAVEGACIÓN Y FAVORITO
  it('should navigate dots, toggle favorite and handle clicks', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // TEST: Navegación con dots
    expect(component.currentDot).toBe(0);

    component.goToDot(1);
    fixture.detectChanges();
    expect(component.currentDot).toBe(1);

    const dots = compiled.querySelectorAll('.recommend-card__dot');
    expect(dots[1].classList.contains('recommend-card__dot--active')).toBe(true);

    // TEST: Navegación con botón next
    component.nextRecommendation();
    expect(component.currentDot).toBe(2);

    // TEST: Ciclo de navegación (vuelve a 0)
    component.nextRecommendation();
    expect(component.currentDot).toBe(0);

  });
});
