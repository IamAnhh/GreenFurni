// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-blog',
//   standalone: true,
//   imports: [],
//   templateUrl: './blog.component.html',
//   styleUrl: './blog.component.css'
// })
// export class BlogComponent {

// }



// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-blog',
//   standalone: true,
//   templateUrl: './blog.component.html',
//   styleUrls: ['./blog.component.css'],
// })
// export class BlogComponent implements OnInit {
//   currentDate: string = '';


//   hienThiNgay(): void {
//     const today = new Date();
//     const day = String(today.getDate()).padStart(2, '0');
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const year = today.getFullYear();

//     this.currentDate = `${day}/${month}/${year}`;
//   }

//   ngOnInit(): void {
//     this.hienThiNgay();
//   }
// }






import { Component, OnInit } from '@angular/core';
import { BlogService } from '../Service/blog.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
    currentDate: string = '';
    blogs: any[] = [];

  hienThiNgay(): void {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    this.currentDate = `${day}/${month}/${year}`;
  }

  blogData: any = {}; // Biến lưu trữ dữ liệu JSON

  constructor(private blogService: BlogService) {}

  // Lifecycle hook gọi khi component được khởi tạo
  ngOnInit(): void {
    this.loadBlogData(); // Tải dữ liệu khi component load
    this.hienThiNgay();
    // Gọi service để lấy dữ liệu từ file JSON
    this.blogService.getBlog().subscribe((data: any[]) => {
      this.blogs = data; // Gán dữ liệu lấy được cho biến blogs
    });
  }


  // Hàm tải dữ liệu từ service
  loadBlogData(): void {
    // Giả sử blogId là 1, có thể thay đổi theo logic của bạn
    const blogId = 1;
    this.blogData = this.blogService.getBlog(); // Lấy dữ liệu từ service
  }
}

