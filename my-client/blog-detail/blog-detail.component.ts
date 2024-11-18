// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-blog-detail',
//   standalone: true,
//   imports: [],
//   templateUrl: './blog-detail.component.html',
//   styleUrl: './blog-detail.component.css'
// })
// export class BlogDetailComponent {

// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../Service/blog.service';
// import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {
  blog: any;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    // // Lấy id từ URL
    // const blogId = Number(this.route.snapshot.paramMap.get('id'));
    // // Lấy chi tiết bài blog từ service dựa trên id
    // this.blog = this.blogService.getBlogById(blogId);
  }
}
