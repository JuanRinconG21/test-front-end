// src/app/shared/components/footer/footer.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TEST 1: CREACIÓN DEL COMPONENTE
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 2: RENDERIZADO DE INFORMACIÓN DE CONTACTO
  it('should render logo, copyright and contact information', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Verificar logo
    const logo = compiled.querySelector('.footer__logo');
    expect(logo).toBeTruthy();
    expect(logo?.getAttribute('alt')).toBe('Logo Skandia');

    // Verificar copyright
    const copyright = compiled.querySelector('.footer__copyright');
    expect(copyright?.textContent).toBe('© 2019 Skandia');

    // Verificar información de contacto
    const contacts = compiled.querySelectorAll('.footer__contact');
    expect(contacts.length).toBeGreaterThan(0);

    // Verificar números telefónicos destacados
    const highlights = compiled.querySelectorAll('.footer__contact-highlight');
    expect(highlights.length).toBe(3); // 658 4000, 484 1300, 01 8000 517 526

    const highlightTexts = Array.from(highlights).map((h) => h.textContent?.trim());
    expect(highlightTexts).toContain('658 4000');
    expect(highlightTexts).toContain('484 1300');
    expect(highlightTexts).toContain('01 8000 517 526');

    // Verificar dirección
    const allContactTexts = Array.from(contacts).map((c) => c.textContent);
    const hasAddress = allContactTexts.some((text) => text?.includes('Av. 19 # 109A - 30'));
    const hasCity = allContactTexts.some((text) => text?.includes('Bogotá D.C., Colombia'));

    expect(hasAddress).toBe(true);
    expect(hasCity).toBe(true);
  });

  // TEST 3: RENDERIZADO DE LINKS Y REDES SOCIALES
  it('should render 9 footer links and 3 social media icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Verificar links del footer
    const links = compiled.querySelectorAll('.footer__link');
    expect(links.length).toBe(9);

    // Verificar textos de los links
    const linkTexts = Array.from(links).map((link) => link.textContent?.trim());
    expect(linkTexts).toContain('Términos y Condiciones');
    expect(linkTexts).toContain('Canales de Servicio');
    expect(linkTexts).toContain('Defensoría del Consumidor Financiero');
    expect(linkTexts).toContain('Protección de Datos');
    expect(linkTexts).toContain('Definiciones Generales');
    expect(linkTexts).toContain('Auto declaración FATCA y CRS');
    expect(linkTexts).toContain('Recomendaciones de Seguridad');
    expect(linkTexts).toContain('Ley de Transparencia');
    expect(linkTexts).toContain('Mapa del sitio');

    // Verificar redes sociales
    const socialLinks = compiled.querySelectorAll('.footer__social-link');
    expect(socialLinks.length).toBe(3);

    const socialIcons = compiled.querySelectorAll('.footer__social-icon');
    expect(socialIcons.length).toBe(3);

    // Verificar alt text de redes sociales
    const socialAlts = Array.from(socialIcons).map((icon) => icon.getAttribute('alt'));
    expect(socialAlts).toContain('Facebook');
    expect(socialAlts).toContain('Youtube');
    expect(socialAlts).toContain('Twitter');
  });
});
