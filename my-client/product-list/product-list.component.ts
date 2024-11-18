// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-product-list',
//   standalone: true,
//   imports: [],
//   templateUrl: './product-list.component.html',
//   styleUrl: './product-list.component.css'
// })
// export class ProductListComponent {

// }
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Service/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedProductType: string | null = null;
  selectedPriceRange: string | null = null;
  isFilterActive = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = this.getFilteredProducts();
    });
  }

  viewProductDetails(productId: string) {
    this.router.navigate(['/products', productId]);
  }

  clearFilters() {
    this.selectedProductType = null;
    this.selectedPriceRange = null;
    this.filteredProducts = this.getFilteredProducts();
  }

  onFilterChange() {
    this.filteredProducts = this.getFilteredProducts();
  }

  getFilteredProducts(): any[] {
    if (!this.selectedPriceRange && !this.selectedProductType) {
      return this.products;
    }

    return this.products.filter((product) => {
      const matchesType = this.selectedProductType
        ? product.category1 === this.selectedProductType
        : true;
      const matchesPrice = this.selectedPriceRange
        ? this.priceMatch(product.price)
        : true;
      return matchesType && matchesPrice;
    });
  }

  priceMatch(price: number): boolean {
    switch (this.selectedPriceRange) {
      case '100to300':
        return price >= 100 && price <= 300;
      case '300to500':
        return price >= 300 && price <= 500;
      case 'above500':
        return price > 500;
      default:
        return true;
    }
  }

  navigateToCustomProducts(): void {
    this.router.navigate(['/custom']).then(() => {
      window.scrollTo(0, 0); // Cuộn lên đầu trang
    });
  }
}
