// src/app/shared/components/sidebar/sidebar.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // TEST 1: CREACIÓN DEL COMPONENTE
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 2: RENDERIZADO DE ELEMENTOS CLAVE
  it('should render all 9 menu items (6 main + 3 mobile)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const menuItems = compiled.querySelectorAll('.sidebar__item');

    expect(menuItems.length).toBe(9);

    // Verificar textos de items principales
    const texts = Array.from(menuItems).map((item) =>
      item.querySelector('.sidebar__text')?.textContent?.trim()
    );

    expect(texts).toContain('Inicio');
    expect(texts).toContain('Contratos');
    expect(texts).toContain('Acciones');
    expect(texts).toContain('Objetivos');
    expect(texts).toContain('Herramientas');
    expect(texts).toContain('Servicio al cliente');
    expect(texts).toContain('Tu Financial Planner');
    expect(texts).toContain('Aportes');
    expect(texts).toContain('Preguntas Frecuentes');
  });

  // TEST 3: FUNCIONALIDAD - TOGGLE EXPANDED
  it('should toggle expanded state and emit itemClicked event', (done) => {
    let itemClickedEmitted = false;

    // Suscribirse al evento itemClicked
    component.itemClicked.subscribe(() => {
      itemClickedEmitted = true;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const sidebar = compiled.querySelector('.sidebar') as HTMLElement;

    // TEST: Estado inicial (collapsed)
    fixture.componentRef.setInput('isExpanded', false);
    fixture.detectChanges();
    expect(sidebar.classList.contains('sidebar--expanded')).toBe(false);

    // TEST: Cambiar a expandido
    fixture.componentRef.setInput('isExpanded', true);
    fixture.detectChanges();
    expect(sidebar.classList.contains('sidebar--expanded')).toBe(true);

    // TEST: Volver a collapsed
    fixture.componentRef.setInput('isExpanded', false);
    fixture.detectChanges();
    expect(sidebar.classList.contains('sidebar--expanded')).toBe(false);

    // TEST: Click en item del sidebar
    const firstItem = compiled.querySelector('.sidebar__item') as HTMLElement;
    firstItem.click();
    fixture.detectChanges();

    expect(itemClickedEmitted).toBe(true);

    done();
  });
});
