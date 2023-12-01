import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Sale } from '../../models/sale.model';
import { SaleDTO } from '../../modelsDTO/saleDTO.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  api_url: string = environment.rest_api_url + '/api/sales';
  
  constructor(private http: HttpClient) {}

  getList():Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.api_url}`);
  }

  getById(idSale: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.api_url}/${idSale}`);
  }

  add(model: SaleDTO):Observable<SaleDTO> {
    return this.http.post<SaleDTO>(`${this.api_url}`, model);
  }

  update(idSale:number, model:SaleDTO):Observable<SaleDTO> {
    return this.http.put<SaleDTO>(`${this.api_url}/${idSale}`, model);
  }
}
