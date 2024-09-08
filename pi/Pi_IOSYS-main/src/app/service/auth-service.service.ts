import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, interval, startWith, switchMap, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http: HttpClient) { }
  isLoggedIn(): boolean {
    // Vérifiez si le token est présent dans le localStorage
    return !!localStorage.getItem('token');
  }
  signUp(username: string, password: string, email: string) {
    return this.http.post("http://127.0.0.1:3000/users/signup", { username, password, email });
  }
  login(username: string, password: string) {
    return this.http.post<any>('http://127.0.0.1:3000/users/login', { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token); // Stocker le token dans le localStorage
        })
      );
  }

  logout() {
    localStorage.removeItem('token'); // Supprimer le token du localStorage lors de la déconnexion
  }
  forgotPassword(email: string) {
    return this.http.post('http://localhost:3000/users/forgot-password', { email });
  }
  resetPassword(email: string, password: string) {
    return this.http.post('http://localhost:3000/users/reset-password', { email, password });
  }
  addProduct(data: any) {
    return this.http.post("http://127.0.0.1:3000/product/add", data)
  }

  getProfile(): Observable<any> {
    // Récupérer le token du localStorage
    const token = localStorage.getItem('token');
    // Créer les en-têtes avec le token d'authentification
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Options pour la requête, y compris withCredentials
    const options = { headers, withCredentials: true };

    return this.http.get<any>('http://127.0.0.1:3000/users/profile', options);
  }
  /*logout(): Observable<any> {
    return this.http.post("http://127.0.0.1:3000/users/logout", {});
  }*/

  showAllUsers(): Observable<any> {
    return this.http.get("http://127.0.0.1:3000/users/showallusers");
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`http://127.0.0.1:3000/users/deleteuser/${userId}`);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`http://127.0.0.1:3000/users/updateuser/${userId}`, userData);
  }

  sendData(ad8232: number, accelX: number, accelY: number, accelZ: number): Observable<any> {
    const data = {
      ad8232: ad8232,
      accelX: accelX,
      accelY: accelY,
      accelZ: accelZ
    };

    return this.http.post('http://localhost:3001/sendData', data);
  }

  refreshData(intervalMs: number): Observable<any> {
    return interval(intervalMs).pipe(
      startWith(0),
      switchMap(() => this.getAllData())
    );
  }
  getAllData(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/getdata/getAllData');
  }
  getUser(userId: string): Observable<any> {
    return this.http.get(`http://127.0.0.1:3000/users/showallusers/${userId}`);
  }

}

