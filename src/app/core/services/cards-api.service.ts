// src/app/core/services/products-api.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product, ProductsResponse } from '../models/card.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private http = inject(HttpClient);
  private apiUrl =
    'https://62e152f8fa99731d75d44571.mockapi.io/api/v1/test-front-end-skandia/cards';

  // Obtener la lista de productos desde la API
  getProducts(): Observable<Product[]> {
    return this.http.get<ProductsResponse>(this.apiUrl).pipe(map((response) => response.listCard));
  }
}
