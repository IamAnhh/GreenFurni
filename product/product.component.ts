import { Component, NgModule, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [CommonModule, RouterModule]
})

export class ProductComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ;
  }

  // products: any[] = [];  // Mảng chứa dữ liệu sản phẩm

  // constructor(private productService: ProductService) { }

  // ngOnInit(): void {
  //   this.loadProducts();  // Tải danh sách sản phẩm khi component khởi tạo
  // }

  // loadProducts(): void {
  //   this.productService.getProducts().subscribe(
  //     (data) => {
  //       this.products = data;  // Lưu dữ liệu sản phẩm vào mảng
  //     },
  //     (error) => {
  //       console.error('Có lỗi khi tải sản phẩm!', error);
  //     }
    
  //   );
    
  // }

