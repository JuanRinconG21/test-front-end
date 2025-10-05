// src/app/core/services/products-api.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsApiService } from './cards-api.service';
import { Product, ProductsResponse } from '../models/card.interface';

describe('ProductsApiService', () => {
  let service: ProductsApiService;
  let httpMock: HttpTestingController;

  const apiUrl = 'https://62e152f8fa99731d75d44571.mockapi.io/api/v1/test-front-end-skandia/cards';

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

  const mockApiResponse: ProductsResponse = {
    listCard: mockProducts,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsApiService],
    });

    service = TestBed.inject(ProductsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // TEST 1: CREACIÓN DEL SERVICIO
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TEST 2: LLAMADA HTTP GET CORRECTA
  it('should make GET request to correct API URL', () => {
    service.getProducts().subscribe();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockApiResponse);
  });

  // TEST 3: MAPEO DE DATOS CORRECTO
  it('should return products array from API response', (done) => {
    service.getProducts().subscribe({
      next: (products) => {
        expect(products).toEqual(mockProducts);
        expect(products.length).toBe(2);
        expect(products[0].nameProduct).toBe('MFUND');
        expect(products[1].nameProduct).toBe('FIC Efectivo');
        done();
      },
      error: done.fail,
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush(mockApiResponse);
  });

  // TEST 4: MANEJO DE ERRORES HTTP
  it('should handle HTTP error gracefully', (done) => {
    const errorMessage = 'Network error';

    service.getProducts().subscribe({
      next: () => done.fail('Should have failed with 500 error'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
        done();
      },
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
