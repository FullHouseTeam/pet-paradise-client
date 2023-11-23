import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Brand } from "../models/Brand";

@Injectable ({
    providedIn: 'root'
})
export class BrandService {
    
    private apiUrl: string = "http://localhost:5155/api/Brand/";

    constructor(private http: HttpClient) {}

    getList():Observable<Brand[]> {
        return this.http.get<Brand[]>(`${this.apiUrl}list`);
    }

    add(model: Brand):Observable<Brand> {
        return this.http.post<Brand>(`${this.apiUrl}save`, model);
    }

    update(idBrand:number, model:Brand):Observable<Brand> {
        return this.http.put<Brand>(`${this.apiUrl}edit/${idBrand}`, model);
    }

    delete(idBrand:number):Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}delete/${idBrand}`);
    }
}

