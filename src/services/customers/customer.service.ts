import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Customer } from '../../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  api_url: string = environment.rest_api_url + '/api/Customer/';

  constructor(private http: HttpClient) {}

  getList():Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.api_url}list`);
  }

  getById(idCustomer: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.api_url}get/${idCustomer}`);
  }

  add(model: Customer):Observable<Customer> {
    return this.http.post<Customer>(`${this.api_url}save`, model);
  }

  update(idCustomer:number, model:Customer):Observable<Customer> {
    return this.http.put<Customer>(`${this.api_url}edit/${idCustomer}`, model);
  }
}
