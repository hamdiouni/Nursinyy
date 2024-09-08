import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  fetchProducts() {
    return this.http.get("http://127.0.0.1:3000/product/")
  }
  addProduct(data: any) {
    return this.http.post("http://127.0.0.1:3000/product/add", data)
  }
}
