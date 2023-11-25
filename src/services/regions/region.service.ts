import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Region } from '../../models/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  api_url: string = environment.rest_api_url + '/api/Region/';

  constructor(private http: HttpClient) {}

  getList():Observable<Region[]> { 
    return this.http.get<Region[]>(`${this.api_url}list`);
  }

  getById(idRegion: number): Observable<Region> {
    return this.http.get<Region>(`${this.api_url}get/${idRegion}`);
  }

  add(model: Region):Observable<Region> {
    return this.http.post<Region>(`${this.api_url}save`, model);
  }

  update(idRegion:number, model:Region):Observable<Region> {
    return this.http.put<Region>(`${this.api_url}edit/${idRegion}`, model);
  }
}
