// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   getProducts() {
//     throw new Error('Method not implemented.');
//   }

//   constructor() { }
// }

// export class ProductService {
//   getProducts() {
//     throw new Error('Method not implemented.');
//   ???



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private dataUrl = 'assets/Data/product.json';
  private dataUrl = 'http://localhost:3000';
  constructor(private http:HttpClient) {}

  getProducts(): Observable<any[]>{
    return this.http.get<any[]>(this.dataUrl +'/product')
  }
  getProductDetail(productId: string): Observable<any[]>{
    return this.http.get<any[]>(this.dataUrl +'/product', {params: {productId}})
  }

  // getProductById(id: string): Observable<any> {
  //   return this.http.get<any>(`${this.dataUrl}/${id}`);
  // }
  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.dataUrl}/${productId}`);
  }

}







