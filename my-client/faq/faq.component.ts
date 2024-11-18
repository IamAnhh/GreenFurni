// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-faq',
//   standalone: true,
//   imports: [],
//   templateUrl: './faq.component.html',
//   styleUrl: './faq.component.css'
// })
// export class FaqComponent {

// }



// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';

// interface FaqItem {
//   question: string;
//   answer: string;
//   details: string[];
//   active: boolean;
// }

// @Component({
//   selector: 'app-faq',
//   standalone: true,
//   imports: [CommonModule], // Thêm CommonModule ở đây
//   templateUrl: './faq.component.html',
//   styleUrl: './faq.component.css'
// })
// export class FaqComponent implements OnInit {
//   // Biến để lưu trữ mục đang được chọn
//   selectedCategory: string = 'baoHanh';

//   // Biến chứa dữ liệu FAQ được tải từ file JSON
//   faqItems: { [key: string]: FaqItem[] } = {};

//   constructor(private http: HttpClient) {}

//   // Hàm gọi khi component được khởi tạo để tải dữ liệu từ file JSON
//   ngOnInit(): void {
//     this.loadFaqData();
//   }

//   // Tải dữ liệu FAQ từ file JSON
//   loadFaqData() {
//     this.http
//       .get<{ [key: string]: FaqItem[] }>('assets/faq.json')
//       .subscribe((data) => {
//         this.faqItems = data;
//       });
//   }
//   // Hàm để chuyển đổi danh mục khi người dùng nhấp vào
//   setCategory(category: string) {
//     this.selectedCategory = category;
//   }

//   // Hàm để chuyển đổi trạng thái hiển thị của câu hỏi
//   toggleContent(item: any) {
//     item.active = !item.active; // Chuyển đổi trạng thái hiển thị
//   }
// }


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
  details: string[];
  active: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'] // Đã sửa lại 'styleUrls' để đúng cú pháp
})
export class FaqComponent implements OnInit {
  // Biến để lưu trữ mục đang được chọn
  selectedCategory: string = 'baoHanh';


  // Biến chứa dữ liệu FAQ được tải từ file JSON
  faqItems: { [key: string]: FaqItem[] } = {};

  constructor(private http: HttpClient) {}

  // Hàm gọi khi component được khởi tạo để tải dữ liệu từ file JSON
  ngOnInit(): void {
    this.loadFaqData();
  }

  // Tải dữ liệu FAQ từ file JSON
  loadFaqData() {
    this.http
      .get<{ [key: string]: FaqItem[] }>('assets/Data/faq.json') // Đảm bảo đường dẫn JSON đúng
      .subscribe((data) => {
        this.faqItems = data;
      });
  }

  // Hàm để chuyển đổi danh mục khi người dùng nhấp vào
  setCategory(category: string) {
    this.selectedCategory = category;
  }

  // Hàm để chuyển đổi trạng thái hiển thị của câu hỏi
  toggleContent(item: FaqItem) {
    item.active = !item.active; // Chuyển đổi trạng thái hiển thị
  }

}
