// src/app/features/home/components/products-slider/products-slider.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsSlider } from './products-slider';
import { ProductsApiService } from '../../../core/services/cards-api.service';
import { of } from 'rxjs';
import { Product } from '../../../core/models/card.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductsSlider', () => {
  let component: ProductsSlider;
  let fixture: ComponentFixture<ProductsSlider>;
  let mockProductsService: jasmine.SpyObj<ProductsApiService>;

  const mockProducts: Product[] = [
    {
      nameProduct: 'MFUND',
      numberProduct: '789654123',
      balanceProduct: '4000000',
      detaildProduct: 'Ya tienes un 15% de tu objetivo',
    },
    {
      nameProduct: 'FIC Efectivo',
      numberProduct: '600000986159',
      balanceProduct: '2120000',
      detaildProduct: 'Producto de ahorro',
    },
  ];

  beforeEach(async () => {
    mockProductsService = jasmine.createSpyObj('ProductsApiService', ['getProducts']);
    mockProductsService.getProducts.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      imports: [ProductsSlider, HttpClientTestingModule],
      providers: [{ provide: ProductsApiService, useValue: mockProductsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TEST 1: CREACIÓN Y CARGA DE PRODUCTOS
  it('should create and load products from API', () => {
    expect(component).toBeTruthy();
    expect(mockProductsService.getProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(2);
    expect(component.products[0].nameProduct).toBe('MFUND');
  });

  // TEST 2: RENDERIZADO DE HEADER, SLIDER Y FOOTER
  it('should render header with title, slider with products and footer with button', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Verificar header
    const header = compiled.querySelector('.products-section__header');
    expect(header).toBeTruthy();

    const title = compiled.querySelector('.products-section__title');
    expect(title?.textContent).toContain('¡Vamos por esos');
    expect(title?.textContent).toContain('$ 6.000.000');
    expect(title?.textContent).toContain('Conocer mi sobrino');

    // Verificar descripción con icono de ayuda
    const helpIcon = compiled.querySelector('.products-section__help-icon');
    expect(helpIcon).toBeTruthy();
    expect(helpIcon?.getAttribute('src')).toBe('assets/main/QuestionGreen.svg');

    // Verificar slider
    const slider = compiled.querySelector('.slider');
    expect(slider).toBeTruthy();

    // Verificar botones prev/next
    const prevBtn = compiled.querySelector('.slider__btn--prev');
    const nextBtn = compiled.querySelector('.slider__btn--next');
    expect(prevBtn).toBeTruthy();
    expect(nextBtn).toBeTruthy();

    // Verificar que se renderizan las product cards
    const productCards = compiled.querySelectorAll('.product-card:not(.product-card--recommended)');
    expect(productCards.length).toBe(2);

    // Verificar recommended card
    const recommendedCard = compiled.querySelector('.product-card--recommended');
    expect(recommendedCard).toBeTruthy();

    const ctaBtn = compiled.querySelector('.product-card__cta-btn');
    expect(ctaBtn?.textContent).toBe('EXPLORA AHORA');

    // Verificar footer con botón
    const footer = compiled.querySelector('.products-section__footer');
    expect(footer).toBeTruthy();

    const associateBtn = compiled.querySelector('.btn-primary');
    expect(associateBtn?.textContent).toBe('ASOCIAR A OBJETIVO');
  });

  // TEST 3: FUNCIONALIDAD - NAVEGACIÓN Y SELECCIÓN
  it('should navigate slider, select products and show recommended section', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // TEST: Navegación - botón prev deshabilitado al inicio
    const prevBtn = compiled.querySelector('.slider__btn--prev') as HTMLButtonElement;
    expect(prevBtn.disabled).toBe(true);

    // TEST: Navegación - next funciona
    expect(component.currentIndex).toBe(0);
    component.next();
    expect(component.currentIndex).toBe(1);

    // TEST: Selección de productos
    expect(component.selectedProducts.length).toBe(0);

    const product = mockProducts[0];
    const event = { target: { checked: true } } as any;
    component.onCheckboxChange(product, event);

    expect(component.selectedProducts.length).toBe(1);
    expect(component.selectedProducts[0].nameProduct).toBe('MFUND');

    // TEST: Botón de asociar se habilita
    fixture.detectChanges();
    const associateBtn = compiled.querySelector('.btn-primary') as HTMLButtonElement;
    expect(associateBtn.disabled).toBe(false);

    // TEST: Mostrar sección recomendados
    expect(component.showRecommendedSection).toBe(false);
    component.onExploreClick();
    expect(component.showRecommendedSection).toBe(true);

    // TEST: Formateo de balance
    const formatted = component.formatBalance('4000000');
    expect(formatted).toBe('4.000.000');
  });
});
