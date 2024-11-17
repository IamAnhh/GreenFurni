import { Component, OnInit, inject } from '@angular/core';
import { product } from '../Interface/product';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subject, catchError, map, of, switchMap, take, takeUntil } from 'rxjs';
import { CartService } from '../Service/cart.service';
import { OrderService } from '../Service/order.service';
import { Cart, CartItem } from '../Interface/cart';
import { ProductService } from '../Service/product.service';
import { Order } from '../Interface/Order';
import { AuthService } from '../Service/auth.service';
import { DiscountService } from '../Service/discount.service';
import { Discount } from '../Interface/Discount';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent{
//   userId = Number(inject(AuthService).getUserId());
//   cartItems: CartItem[] = [];
//   cartLength: number | null = null;
//   products: product[] = [];
//   voucherCode = '';
//   discountInfo: Discount | null = null;

//   constructor(
//     private cartService: CartService,
//     private productService: ProductService,
//     private orderService: OrderService,
//     private discountService: DiscountService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     if (this.userId) {
//       this.loadCartItems();
//       this.loadProducts();
//     }
//   }

//   private loadCartItems(): void {
//     this.cartService.getCart(this.userId.toString()).pipe(
//       // Lấy mảng cartItems từ đối tượng Cart
//       map((data: Cart) => data.cartItems || []),  // Trả về mảng cartItems hoặc mảng rỗng nếu không có
//       catchError(error => {
//         console.error('Error getting cart:', error);
//         return of([]);  // Trả về mảng rỗng nếu có lỗi
//       })
//     ).subscribe(cartItems => this.cartItems = cartItems);}  // Cập nhật giỏ hàng

//   private loadProducts(): void {
//     this.productService.getData().pipe(
//       catchError(error => {
//         console.error('Error loading products:', error);
//         return of([]);
//       })
//     ).subscribe(productData => this.products = productData);
//   }

//   calculateOrderTotal(): number {
//     return this.cartItems.reduce((total, item) => total + (item.subtotal || 0), 0);
//   }

//   removeItemFromCart(userId: number, itemId: number): void {
//     this.cartService.removeCartItem(userId, itemId).pipe(
//       switchMap(() => this.cartService.getCart(this.userId.toString())),
//       map((data: Cart) => data.cartItems || []),  // Lấy cartItems từ Cart
//       catchError(error => {
//         console.error('Error removing item:', error);
//         return of([]);  // Trả về mảng rỗng nếu có lỗi
//       })
//     ).subscribe(cartItems => this.cartItems = cartItems);
//   }

//   updateCartItemQuantity(event: Event, item: CartItem): void {
//     const target = event.target as HTMLInputElement;
//     item.quantity = +target.value;

//     this.cartService.updateCartItemQuantity(this.userId, item.id, item.quantity).pipe(
//       catchError(error => {
//         console.error('Error updating cart item quantity:', error);
//         return of(null);
//       })
//     ).subscribe(() => this.loadCartItems());
//   }

//   getProductImage(productId: number): string {
//     const product = this.products.find(p => p.id === productId);
//     return product ? product.img1 : 'Không tìm thấy hình ảnh';
//   }

//   getProductRouterLink(productId: number): string[] {
//     const product = this.products.find(p => p.id === productId);
//     return product ? ['/product', product._id] : ['/product'];
//   }

//   applyVoucher(): void {
//     this.discountService.getDiscountByCode(this.voucherCode).pipe(
//       map(discountOrArray => Array.isArray(discountOrArray) ? discountOrArray[0] : discountOrArray),
//       catchError(error => {
//         console.error('Error applying voucher:', error);
//         this.discountInfo = null;
//         return of(null);
//       })
//     ).subscribe(discount => {
//       if (discount && !this.isUserEligible(discount.userids)) {
//         this.discountInfo = discount;
//         alert('Áp dụng mã thành công!');
//       } else {
//         alert('Bạn đã hết lượt sử dụng!');
//       }
//     });
//   }

//   isUserEligible(userids: any[]): boolean {
//     return userids.some(id => id.userid === this.userId);
//   }

//   goToCheckout(): void {
//     const orderTotal = this.calculateOrderTotal();
//     const shippingFee = this.voucherCode === 'MIENPHIVANCHUYEN' ? 0 : 25;
//     const discount = this.discountInfo ? (orderTotal * (+this.discountInfo.valuecode / 100)) : 0;
//     const totalAmount = orderTotal + shippingFee - discount;

//     const queryParams: Params = {
//       userId: this.userId.toString(),
//       cartItems: JSON.stringify(this.cartItems),
//       orderTotal: orderTotal.toString(),
//       shippingFee: shippingFee.toString(),
//       discount: discount.toString(),
//       totalAmount: totalAmount.toString(),
//       voucherCode: this.voucherCode
//     };
    
//     this.router.navigate(['/checkout'], { queryParams });
//   }
}
