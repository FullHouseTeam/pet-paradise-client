import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Customer } from '../../models/customer.model';
import { CustomerDTO } from '../../modelsDTO/customerDTO.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  api_url: string = environment.rest_api_url + '/api/customer';
  
  constructor(private http: HttpClient) {}

  getList():Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.api_url}`);
  }

  getById(idCustomer: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.api_url}/${idCustomer}`);
  }

  add(model: CustomerDTO):Observable<CustomerDTO> {
    return this.http.post<CustomerDTO>(`${this.api_url}`, model);
  }

  update(idCustomer:number, model:CustomerDTO):Observable<CustomerDTO> {
    return this.http.put<CustomerDTO>(`${this.api_url}/${idCustomer}`, model);
  }
}
