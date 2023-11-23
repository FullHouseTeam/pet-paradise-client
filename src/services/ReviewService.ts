import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Review } from "../models/Review";

@Injectable ({
    providedIn: 'root'
})
export class ReviewService {
    
    private apiUrl: string = "http://localhost:5155/api/Brand/";

    constructor(private http: HttpClient) {}

    getList():Observable<Review[]> {
        return this.http.get<Review[]>(`${this.apiUrl}list`);
    }

    getById(idReview: number): Observable<Review> {
        return this.http.get<Review>(`${this.apiUrl}get/${idReview}`);
    }

    add(model: Review):Observable<Review> {
        return this.http.post<Review>(`${this.apiUrl}save`, model);
    }

    update(idReview:number, model:Review):Observable<Review> {
        return this.http.put<Review>(`${this.apiUrl}edit/${idReview}`, model);
    }

    delete(idReview:number):Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}delete/${idReview}`);
    }
}

