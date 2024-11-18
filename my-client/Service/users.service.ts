

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
   apiProfile: string = 'http://localhost:3000/users';

  // private apiAddress = 'https://vn-public-apis.fpo.vn/wards/getAll?limit=-1';

  apiProvinces: string = 'https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1';
  apiDistricts: string = 'https://vn-public-apis.fpo.vn/districts/getAll?limit=-1';
  apiWards: string = 'https://vn-public-apis.fpo.vn/wards/getAll?limit=-1';


  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiProfile}`);
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.apiProfile}`, profileData);
  }

  getProvinces(): Observable<any> {
    return this.http.get<any>(`${this.apiProvinces}`);
  }

  getDistricts(provinceCode: string): Observable<any> {
    return this.http.get<any>(`${this.apiDistricts}?provinceCode=${provinceCode}&limit=-1`);
  }

  getWards(districtCode: string): Observable<any> {
    return this.http.get<any>(`${this.apiWards}?districtCode=${districtCode}&limit=-1`);
  }



 }



