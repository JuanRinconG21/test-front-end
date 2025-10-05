// src/app/features/home/components/goal-card/goal-card.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoalCard } from './goal-card';

describe('GoalCard', () => {
  let component: GoalCard;
  let fixture: ComponentFixture<GoalCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalCard],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // TEST 1: CREACIÓN DEL COMPONENTE
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 2: RENDERIZADO DEL HEADER Y BODY
  it('should render goal title, category and all financial details', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Verificar título del objetivo
    const title = compiled.querySelector('.goal-card__title');
    expect(title).toBeTruthy();
    expect(title?.textContent).toBe('Conocer a mi sobrino');

    // Verificar categoría
    const category = compiled.querySelector('.goal-card__category');
    expect(category?.textContent).toBe('Categoría: Bienestar');

    // Verificar link de revisar objetivo
    const link = compiled.querySelector('.goal-card__link');
    expect(link?.textContent).toBe('Revisar objetivo');

    // Verificar detalles financieros (3 secciones)
    const details = compiled.querySelectorAll('.goal-card__detail');
    expect(details.length).toBe(3);

    // Verificar etiquetas
    const labels = compiled.querySelectorAll('.goal-card__label');
    const labelTexts = Array.from(labels).map((l) => l.textContent?.trim());
    expect(labelTexts[0]).toBe('En esta fecha:');
    expect(labelTexts[1]).toBe('Lograras:');
    expect(labelTexts[2]).toContain('Ya cuentas con:');

    // Verificar valores
    const dateValue = compiled.querySelector('.goal-card__value--date');
    expect(dateValue?.textContent).toBe('Diciembre/2022');

    const amountValue = compiled.querySelector('.goal-card__value--amount');
    expect(amountValue?.textContent).toBe('$ 6.000.000');

    const currentValue = compiled.querySelector('.goal-card__value--current');
    expect(currentValue?.textContent).toBe('$ 0');
  });

  // TEST 3: RENDERIZADO DEL FOOTER 
  it('should render footer with CTA link and mountain illustration', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Verificar footer
    const footer = compiled.querySelector('.goal-card__footer');
    expect(footer).toBeTruthy();

    // Verificar icono de check
    const checkIcon = compiled.querySelector('.goal-card__check-icon');
    expect(checkIcon).toBeTruthy();
    expect(checkIcon?.getAttribute('src')).toBe('assets/main/Check.svg');
    expect(checkIcon?.getAttribute('alt')).toBe('Check');

    // Verificar CTA link
    const ctaLink = compiled.querySelector('.goal-card__cta-link');
    expect(ctaLink).toBeTruthy();
    expect(ctaLink?.textContent).toBe('¡Asocia productos para monitorear su progreso!');

    // Verificar ilustración de la montaña
    const mountainImg = compiled.querySelector('.goal-card__mountain');
    expect(mountainImg).toBeTruthy();
    expect(mountainImg?.getAttribute('src')).toBe('assets/main/Mountain.png');
    expect(mountainImg?.getAttribute('alt')).toBe('Montaña');

    // Verificar icono de estrella en el body
    const starIcon = compiled.querySelector('.goal-card__icon');
    expect(starIcon).toBeTruthy();
    expect(starIcon?.getAttribute('src')).toBe('assets/main/Star.svg');
    expect(starIcon?.getAttribute('alt')).toBe('Estrella');
  });
});
