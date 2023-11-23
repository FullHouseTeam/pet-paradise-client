import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api_url: string = environment.rest_api_url + '/api/Products/';

  constructor(private http: HttpClient) {}

  getList():Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api_url}list`);
  }

  getById(idProduct: number): Observable<Product> {
    return this.http.get<Product>(`${this.api_url}get/${idProduct}`);
  }

  add(model: Product):Observable<Product> {
    return this.http.post<Product>(`${this.api_url}save`, model);
  }

  update(idProduct:number, model:Product):Observable<Product> {
    return this.http.put<Product>(`${this.api_url}edit/${idProduct}`, model);
  }
}
