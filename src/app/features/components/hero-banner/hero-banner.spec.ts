// src/app/features/home/components/hero-banner/hero-banner.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroBanner } from './hero-banner';

describe('HeroBanner', () => {
  let component: HeroBanner;
  let fixture: ComponentFixture<HeroBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TEST 1: CREACIÓN DEL COMPONENTE
  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
  // TEST 2: RENDERIZADO DEL BREADCRUMB
  it('should render breadcrumb with home icon and text', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Verificar header del breadcrumb
    const header = compiled.querySelector('.hero-banner__header');
    expect(header).toBeTruthy();

    // Verificar icono de home
    const homeIcon = compiled.querySelector('.hero-banner__icon');
    expect(homeIcon).toBeTruthy();
    expect(homeIcon?.getAttribute('src')).toBe('assets/main/Home.svg');
    expect(homeIcon?.getAttribute('alt')).toBe('Home');

    // Verificar texto del breadcrumb
    const breadcrumb = compiled.querySelector('.hero-banner__breadcrumb');
    expect(breadcrumb?.textContent).toBe('Ir al inicio');
  });


  // TEST 3: RENDERIZADO DEL MENSAJE PRINCIPAL
  it('should render success message with title and subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Verificar body del banner
    const body = compiled.querySelector('.hero-banner__body');
    expect(body).toBeTruthy();

    // Verificar título principal
    const title = compiled.querySelector('.hero-banner__title');
    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toBe('¡Tu objetivo ha sido agregado exitosamente!');

    // Verificar subtítulo
    const subtitle = compiled.querySelector('.hero-banner__subtitle');
    expect(subtitle).toBeTruthy();
    expect(subtitle?.textContent?.trim()).toBe('¡Te hemos enviado un correo con la notificación!');
  });
});
