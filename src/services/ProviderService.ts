import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Provider } from "../models/Provider";

@Injectable ({
    providedIn: 'root'
})
export class ProviderService {
    
    private apiUrl: string = "http://localhost:5155/api/Brand/";

    constructor(private http: HttpClient) {}

    getList():Observable<Provider[]> {
        return this.http.get<Provider[]>(`${this.apiUrl}list`);
    }

    getById(idProvider: number): Observable<Provider> {
        return this.http.get<Provider>(`${this.apiUrl}get/${idProvider}`);
    }

    add(model: Provider):Observable<Provider> {
        return this.http.post<Provider>(`${this.apiUrl}save`, model);
    }

    update(idProvider:number, model:Provider):Observable<Provider> {
        return this.http.put<Provider>(`${this.apiUrl}edit/${idProvider}`, model);
    }

    delete(idProvider:number):Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}delete/${idProvider}`);
    }
}

