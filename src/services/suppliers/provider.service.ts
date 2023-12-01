import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Provider } from '../../models/provider.model';
import { ProviderDTO } from '../../modelsDTO/providerDTO.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  api_url: string = environment.rest_api_url + '/api/provider';
  
  constructor(private http: HttpClient) {}

  getList():Observable<Provider[]> {
    return this.http.get<Provider[]>(`${this.api_url}`);
  }

  getById(idProvider: number): Observable<Provider> {
    return this.http.get<Provider>(`${this.api_url}/${idProvider}`);
  }

  add(model: ProviderDTO):Observable<ProviderDTO> {
    return this.http.post<ProviderDTO>(`${this.api_url}`, model);
  }

  update(idProvider:number, model:ProviderDTO):Observable<ProviderDTO> {
    return this.http.put<ProviderDTO>(`${this.api_url}/${idProvider}`, model);
  }
}
