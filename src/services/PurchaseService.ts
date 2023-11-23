import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Purchase } from "../models/Purchase";

@Injectable ({
    providedIn: 'root'
})
export class PurchaseService {
    
    private apiUrl: string = "http://localhost:5155/api/Brand/";

    constructor(private http: HttpClient) {}

    getList():Observable<Purchase[]> {
        return this.http.get<Purchase[]>(`${this.apiUrl}list`);
    }

    add(model: Purchase):Observable<Purchase> {
        return this.http.post<Purchase>(`${this.apiUrl}save`, model);
    }

    update(idPurchase:number, model:Purchase):Observable<Purchase> {
        return this.http.put<Purchase>(`${this.apiUrl}edit/${idPurchase}`, model);
    }

    delete(idPurchase:number):Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}delete/${idPurchase}`);
    }
}

