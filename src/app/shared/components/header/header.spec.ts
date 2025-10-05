// src/app/shared/components/header/header.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TEST 1: CREACIÓN DEL COMPONENTE
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // TEST 2: RENDERIZADO DE ELEMENTOS CLAVE
  it('should render logo, title and 3 action items', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Verificar logo
    const logo = compiled.querySelector('.header-nav__logo');
    expect(logo).toBeTruthy();
    expect(logo?.getAttribute('src')).toBe('assets/nav/Logo.svg');
    expect(logo?.getAttribute('alt')).toBe('Logo Skandia');

    // Verificar título
    const title = compiled.querySelector('.header-nav__title');
    expect(title?.textContent).toBe('Plan Financiero Digital - FPX');

    // Verificar divider
    const divider = compiled.querySelector('.header-nav__divider');
    expect(divider?.textContent).toBe('|');

    // Verificar 3 acciones
    const actions = compiled.querySelectorAll('.header-nav__action');
    expect(actions.length).toBe(3);

    // Verificar textos de las acciones
    const actionTexts = Array.from(actions).map((action) =>
      action.querySelector('.header-nav__text')?.textContent?.trim()
    );

    expect(actionTexts[0]).toBe('Tu Financial Planner');
    expect(actionTexts[1]).toBe('Aportes');
    expect(actionTexts[2]).toContain('Preguntas');
    expect(actionTexts[2]).toContain('Frecuentes');
  });

  // TEST 3: FUNCIONALIDAD - TOGGLE MENU
  it('should emit menuToggle event when menu button is clicked', (done) => {
    let menuToggleEmitted = false;

    // Suscribirse al evento menuToggle
    component.menuToggle.subscribe(() => {
      menuToggleEmitted = true;
    });

    const compiled = fixture.nativeElement as HTMLElement;

    // Obtener el botón del menú
    const menuButton = compiled.querySelector('.header-nav__menu-btn') as HTMLButtonElement;
    expect(menuButton).toBeTruthy();
    expect(menuButton.getAttribute('aria-label')).toBe('Toggle menu');

    // Simular click en el botón
    menuButton.click();
    fixture.detectChanges();

    // Verificar que se emitió el evento
    expect(menuToggleEmitted).toBe(true);

    // Verificar que el botón tiene el SVG
    const svg = menuButton.querySelector('svg');
    expect(svg).toBeTruthy();

    done();
  });
});
