import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Purchase } from '../../models/purchase.model';
import { PurchaseDTO } from '../../modelsDTO/purchaseDTO.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  api_url: string = environment.rest_api_url + '/api/purchase';
  
  constructor(private http: HttpClient) {}

  getList():Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.api_url}`);
  }

  getById(idPurchase: number): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.api_url}/${idPurchase}`);
  }

  add(model: PurchaseDTO):Observable<PurchaseDTO> {
    return this.http.post<PurchaseDTO>(`${this.api_url}`, model);
  }

  update(idPurchase:number, model:PurchaseDTO):Observable<PurchaseDTO> {
    return this.http.put<PurchaseDTO>(`${this.api_url}/${idPurchase}`, model);
  }
}
