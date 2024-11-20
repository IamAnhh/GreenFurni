import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomproductService {

  private apiUrl = 'http://localhost:3000/customProducts'; // URL của server

  constructor(private http: HttpClient) { }

  // Thực hiện gửi dữ liệu mà không cần file
  submitForm(formData: any): Observable<any> {
    // Chỉ gửi formData dưới dạng JSON
    return this.http.post<any>(this.apiUrl, formData);
  }
}
