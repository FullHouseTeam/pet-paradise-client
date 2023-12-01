import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Review } from '../../models/review.model';
import { ReviewDTO } from '../../modelsDTO/reviewDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  api_url: string = environment.rest_api_url + '/api/review';
  
  constructor(private http: HttpClient) {}

  getList():Observable<Review[]> {
    return this.http.get<Review[]>(`${this.api_url}`);
  }

  getById(idReview: number): Observable<Review> {
    return this.http.get<Review>(`${this.api_url}/${idReview}`);
  }

  add(model: ReviewDTO):Observable<ReviewDTO> {
    return this.http.post<ReviewDTO>(`${this.api_url}`, model);
  }

  update(idReview:number, model:ReviewDTO):Observable<ReviewDTO> {
    return this.http.put<ReviewDTO>(`${this.api_url}/${idReview}`, model);
  }
}
