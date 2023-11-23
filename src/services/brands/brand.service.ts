import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Brand } from '../../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  api_url: string = environment.rest_api_url + '/api/Brand/';

  constructor(private http: HttpClient) { }

  getList():Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.api_url}list`);
  }

  getById(idBrand: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.api_url}list/id?id=${idBrand}`);
  }

  add(model: Brand):Observable<Brand> {
    return this.http.post<Brand>(`${this.api_url}save`, model);
  }

  update(idBrand:number, model:Brand):Observable<Brand> {
    return this.http.put<Brand>(`${this.api_url}edit/${idBrand}`, model);
  }
}
