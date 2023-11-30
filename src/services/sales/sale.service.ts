import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../../models/sales.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  api_url: string = environment.rest_api_url + '/api/Sale/';

  constructor(private http: HttpClient) {}

  getList():Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.api_url}list`);
  }

  getById(idSale: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.api_url}get/${idSale}`);
  }

  add(model: Sale):Observable<Sale> {
    return this.http.post<Sale>(`${this.api_url}save`, model);
  }

  update(idSale:number, model:Sale):Observable<Sale> {
    return this.http.put<Sale>(`${this.api_url}edit/${idSale}`, model);
  }
}
