import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  sendUserReview(rating: string, productName: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/components/user-reviews', { rating, productName });
  }
  // Récupère tous les avis des utilisateurs depuis le serveur Node.js
  getUserReviews(): Observable<any> {
    return this.http.get('http://localhost:3000/components/getreviews');
  }

  // Récupère un avis utilisateur par son ID depuis le serveur Node.js
  getUserReviewById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/components/getreviews/${id}`);
  }

  // Met à jour un avis utilisateur par son ID sur le serveur Node.js
  updateUserReview(id: string, rating: string): Observable<any> {
    return this.http.patch(`http://localhost:3000/components/user-reviews/${id}`, { rating });
  }

  // Supprime un avis utilisateur par son ID depuis le serveur Node.js
  deleteUserReview(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/components/user-reviews/${id}`);
  }

  // Envoie l'avis de l'utilisateur pour un produit spécifique
  addUserReview(componentId: string, rating: string) {
    return this.http.post(`http://localhost:3000/components/${componentId}/user-reviews`, { rating });
  }
  // Service Angular
  getUserReviewsForComponent(componentName: string) {
    return this.http.get(`http://localhost:3000/components/${componentName}/user-reviews`);
  }

}
