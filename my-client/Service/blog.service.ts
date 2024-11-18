// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class BlogService {
//   getBlogById(blogId: number): any {
//     throw new Error('Method not implemented.');
//   }

//   constructor() { }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private dataUrl = 'assets/Data/blog.json';
  constructor(private http:HttpClient) {}

  getBlog(): Observable<any[]>{
    return this.http.get<any[]>(this.dataUrl)
  }
}


