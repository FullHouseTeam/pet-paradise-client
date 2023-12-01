import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Product } from '../../models/product.model';
import { ProductDTO } from '../../modelsDTO/productDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api_url: string = environment.rest_api_url + '/api/products';
  
  constructor(private http: HttpClient) {}

  getList():Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api_url}`);
  }

  getById(idProduct: number): Observable<Product> {
    return this.http.get<Product>(`${this.api_url}/${idProduct}`);
  }

  add(model: ProductDTO):Observable<ProductDTO> {
    return this.http.post<ProductDTO>(`${this.api_url}`, model);
  }

  update(idProduct:number, model:ProductDTO):Observable<ProductDTO> {
    return this.http.put<ProductDTO>(`${this.api_url}/${idProduct}`, model);
  }
}
