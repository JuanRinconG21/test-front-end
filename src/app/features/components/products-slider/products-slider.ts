// src/app/features/home/components/products-slider/products-slider.ts

import { Component, OnInit, ViewChild, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsApiService } from '../../../core/services/cards-api.service';
import { Product } from '../../../core/models/card.interface';
import { RecommendedProducts } from '../recommended-products/recommended-products'; // 🆕

@Component({
  selector: 'app-products-slider',
  imports: [CommonModule, RecommendedProducts], // 🆕 Agregado RecommendedProducts
  templateUrl: './products-slider.html',
  styleUrl: './products-slider.css',
})
export class ProductsSlider implements OnInit {
  @ViewChild('sliderWrapper') sliderWrapper!: ElementRef;

  private productsService = inject(ProductsApiService);

  products: Product[] = [];
  selectedProducts: Product[] = [];
  loading = false;
  error: string | null = null;

  currentIndex = 0;
  translateX = 0;
  cardWidth = 0;
  gap = 0;
  cardsPerView = 1;

  showRecommendedSection = false; // 🆕 Estado para mostrar/ocultar recommended

  ngOnInit(): void {
    this.loadProducts();
    this.cardsPerView = this.getCardsPerView();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateSliderDimensions();
    }, 100);
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;

    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
        console.log('✅ Productos cargados desde el servicio:', products);
        setTimeout(() => this.updateSliderDimensions(), 200);
      },
      error: (err) => {
        this.error = 'Error al cargar productos';
        this.loading = false;
        console.error('❌ Error al cargar productos:', err);
      },
    });
  }

  getCardsPerView(): number {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  }

  updateSliderDimensions(): void {
    if (!this.sliderWrapper) return;

    const wrapper = this.sliderWrapper.nativeElement;
    const cards = wrapper.querySelectorAll('.product-card');

    if (cards.length > 0) {
      const firstCard = cards[0] as HTMLElement;
      this.cardWidth = firstCard.offsetWidth;
      const computedStyle = getComputedStyle(wrapper);
      this.gap = parseInt(computedStyle.gap) || 32;
      this.updateSliderPosition();
    }
  }

  updateSliderPosition(): void {
    this.translateX = -(this.currentIndex * (this.cardWidth + this.gap));
  }

  isLastSlide(): boolean {
    const totalItems = this.products.length + 1;
    return this.currentIndex >= totalItems - this.cardsPerView;
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSliderPosition();
    }
  }

  next(): void {
    if (!this.isLastSlide()) {
      this.currentIndex++;
      this.updateSliderPosition();
    }
  }

  formatBalance(balance: string): string {
    const num = parseInt(balance, 10);
    return num.toLocaleString('es-CO');
  }

  onCheckboxChange(product: Product, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedProducts.push(product);
    } else {
      this.selectedProducts = this.selectedProducts.filter(
        (p) => p.numberProduct !== product.numberProduct
      );
    }
    console.log('✅ Productos seleccionados:', this.selectedProducts);
  }

  associateProducts(): void {
    if (this.selectedProducts.length === 0) return;

    console.log('🎯 Asociando productos:', this.selectedProducts);

    const productNames = this.selectedProducts.map((p) => p.nameProduct).join(', ');

    alert(`✅ Se asociarán ${this.selectedProducts.length} producto(s):\n\n${productNames}`);
  }

  // 🆕 MÉTODO ACTUALIZADO - Mostrar sección recomendados
  onExploreClick(): void {
    console.log('🔍 Mostrando productos recomendados');
    this.showRecommendedSection = true;

    // Scroll suave hacia la sección después de que se muestre
    setTimeout(() => {
      const section = document.getElementById('recommendedProducts');
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.cardsPerView = this.getCardsPerView();
    this.updateSliderDimensions();
  }
}
