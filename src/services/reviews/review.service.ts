import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../../models/review.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  api_url: string = environment.rest_api_url + '/api/Review/';

  constructor(private http: HttpClient) {}

  getList():Observable<Review[]> {
    return this.http.get<Review[]>(`${this.api_url}list`);
  }

  getById(idReview: number): Observable<Review> {
    return this.http.get<Review>(`${this.api_url}get/${idReview}`);
  }

  add(model: Review):Observable<Review> {
    return this.http.post<Review>(`${this.api_url}save`, model);
  }

  update(idReview:number, model:Review):Observable<Review> {
    return this.http.put<Review>(`${this.api_url}edit/${idReview}`, model);
  }
}
