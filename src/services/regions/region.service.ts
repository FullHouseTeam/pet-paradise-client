import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Region } from '../../models/region.model';
import { RegionDTO } from '../../modelsDTO/regionDTO.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  api_url: string = environment.rest_api_url + '/api/region';
  
  constructor(private http: HttpClient) {}

  getList():Observable<Region[]> {
    return this.http.get<Region[]>(`${this.api_url}`);
  }

  getById(idRegion: number): Observable<Region> {
    return this.http.get<Region>(`${this.api_url}/${idRegion}`);
  }

  add(model: RegionDTO):Observable<RegionDTO> {
    return this.http.post<RegionDTO>(`${this.api_url}`, model);
  }

  update(idRegion:number, model:RegionDTO):Observable<RegionDTO> {
    return this.http.put<RegionDTO>(`${this.api_url}/${idRegion}`, model);
  }
}
