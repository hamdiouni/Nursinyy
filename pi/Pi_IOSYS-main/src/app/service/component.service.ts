import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { composant } from '../composant';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {


  constructor(private http: HttpClient) { }

  getComponents(): Observable<any[]> {
    return this.http.get<composant[]>('http://localhost:3000/components/getcomponents');
  }

  getComponentById(name: string): Observable<any> {
    return this.http.get<composant>(`http://localhost:3000/components/getcomponents'/${name}`);
  }

  addComponent(component: composant): Observable<composant> {
    return this.http.post<composant>('http://localhost:3000/components/postcomponents', component);
  }

  updateComponent(component: composant): Observable<composant> {
    return this.http.put<composant>(`http://localhost:3000/components/updatecomponents/${component.name}`, component);
  }

  deleteComponent(name: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/components/deletecomp/${name}`);
  }
}
