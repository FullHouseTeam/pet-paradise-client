import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Purchase } from '../../models/Purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  api_url: string = environment.rest_api_url + '/api/Purchase/';
  
  constructor(private http: HttpClient) {}

  getList():Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.api_url}list`);
  }

  getById(idPurchase: number): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.api_url}get/${idPurchase}`);
  }

  add(model: Purchase):Observable<Purchase> {
    return this.http.post<Purchase>(`${this.api_url}save`, model);
  }

  update(idPurchase:number, model:Purchase):Observable<Purchase> {
    return this.http.put<Purchase>(`${this.api_url}edit/${idPurchase}`, model);
  }
}
