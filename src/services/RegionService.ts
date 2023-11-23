import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Region } from "../models/Region";

@Injectable ({
    providedIn: 'root'
})
export class RegionService {
    
    private apiUrl: string = "http://localhost:5155/api/Brand/";

    constructor(private http: HttpClient) {}

    getList():Observable<Region[]> {
        return this.http.get<Region[]>(`${this.apiUrl}list`);
    }

    getById(idRegion: number): Observable<Region> {
        return this.http.get<Region>(`${this.apiUrl}get/${idRegion}`);
    }

    add(model: Region):Observable<Region> {
        return this.http.post<Region>(`${this.apiUrl}save`, model);
    }

    update(idRegion:number, model:Region):Observable<Region> {
        return this.http.put<Region>(`${this.apiUrl}edit/${idRegion}`, model);
    }

    delete(idRegion:number):Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}delete/${idRegion}`);
    }
}

