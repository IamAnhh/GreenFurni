import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomproductService {
  private apiUrl = 'http://localhost:3000/custom-product';

  constructor(private http: HttpClient) {}

  submitForm(formData: any, file?: File): Observable<any> {
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('productName', formData.productName);
    form.append('description', formData.description);
    if (file) {
      form.append('file', file, file.name);
    }

    return this.http.post(this.apiUrl, form);
  }
}
