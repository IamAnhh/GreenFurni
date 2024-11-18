// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home-page',
//   standalone: true,
//   imports: [],
//   templateUrl: './home-page.component.html',
//   styleUrl: './home-page.component.css'
// })
// export class HomePageComponent {

// }



import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Service/product.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent  implements OnInit  {
  products: any[] = [];
  faqQuestions = [
    { question: 'Làm thế nào để gửi sản phẩm cần bảo hành cho GreenFurni?', answer: 'Liên hệ với bộ phận hỗ trợ để được hướng dẫn chi tiết.' },
    { question: 'Sản phẩm sau mua có được đổi trả không?', answer: 'Sản phẩm có thể đổi trả trong vòng 7 ngày.'},
    { question: 'Sản phẩm được bảo hành như thế nào?', answer: 'Chúng tôi cung cấp bảo hành 12 tháng cho tất cả sản phẩm.' }
  ];

  // Lưu chỉ số của câu hỏi đang được chọn
  selectedQuestion: number | null = null;

  // Hàm toggle để hiển thị hoặc ẩn câu trả lời
  toggleAnswer(index: number): void {
    this.selectedQuestion = this.selectedQuestion === index ? null : index;
  }

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

}
