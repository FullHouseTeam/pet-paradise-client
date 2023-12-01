import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Brand } from '../../models/brand.model';
import { BrandDTO } from '../../modelsDTO/brandDTO.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  api_url: string = environment.rest_api_url + '/api/brand';
  
  constructor(private http: HttpClient) {}

  getList():Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.api_url}`);
  }

  getById(idBrand: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.api_url}/${idBrand}`);
  }

  add(model: BrandDTO):Observable<BrandDTO> {
    return this.http.post<BrandDTO>(`${this.api_url}`, model);
  }

  update(idBrand:number, model:BrandDTO):Observable<BrandDTO> {
    return this.http.put<BrandDTO>(`${this.api_url}/${idBrand}`, model);
  }
}
