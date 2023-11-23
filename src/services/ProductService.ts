import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/Product";

@Injectable ({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl: string = "http://localhost:5155/api/Products/";

    constructor(private http: HttpClient) {}

    getList():Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}list`);
    }

    add(model: Product):Observable<Product> {
        return this.http.post<Product>(`${this.apiUrl}save`, model);
    }

    update(idProduct:number, model:Product):Observable<Product> {
        return this.http.put<Product>(`${this.apiUrl}edit/${idProduct}`, model);
    }

    delete(idProduct:number):Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}delete/${idProduct}`);
    }
}

