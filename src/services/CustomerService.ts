import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer } from "../models/Customer";

@Injectable ({
    providedIn: 'root'
})
export class CustomerService {
    private apiUrl: string = "http://localhost:5155/api/Customer/";

    constructor(private http: HttpClient) {}

    getList():Observable<Customer[]> {
        return this.http.get<Customer[]>(`${this.apiUrl}list`);
    }

    getById(idCustomer: number): Observable<Customer> {
        return this.http.get<Customer>(`${this.apiUrl}get/${idCustomer}`);
    }

    add(model: Customer):Observable<Customer> {
        return this.http.post<Customer>(`${this.apiUrl}save`, model);
    }

    update(idCustomer:number, model:Customer):Observable<Customer> {
        return this.http.put<Customer>(`${this.apiUrl}edit/${idCustomer}`, model);
    }

    delete(idCustomer:number):Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}delete/${idCustomer}`);
    }
}

