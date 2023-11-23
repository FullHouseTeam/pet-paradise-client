import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provider } from '../../models/Provider';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  api_url: string = environment.rest_api_url + '/api/Provider/';

  constructor(private http: HttpClient) {}

  getList():Observable<Provider[]> {
    return this.http.get<Provider[]>(`${this.api_url}list`);
  }

  getById(idProvider: number): Observable<Provider> {
    return this.http.get<Provider>(`${this.api_url}get/${idProvider}`);
  }

  add(model: Provider):Observable<Provider> {
    return this.http.post<Provider>(`${this.api_url}save`, model);
  }

  update(idProvider:number, model:Provider):Observable<Provider> {
    return this.http.put<Provider>(`${this.api_url}edit/${idProvider}`, model);
  }
}
