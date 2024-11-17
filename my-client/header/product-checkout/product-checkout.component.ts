import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { Router } from '@angular/router';
import { OrderService } from '../Service/order.service';
import { DiscountService } from '../Service/discount.service';
import { AccountcustomerService } from '../Service/accountcustomer.service';
import { Address, ClientInfo, Order } from '../Interface/Order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './product-checkout.component.html',
  styleUrl: './product-checkout.component.css'
})
export class ProductCheckoutComponent{

//   queryParamsData: any;
//   checkoutFormGroup: FormGroup;
//   isSubmitted = false;
//   cartItems: any[] = [];
//   orderTotal = 0;
//   shippingFee = 0;
//   discount = 0;
//   totalAmount = 0;
//   userId = 0;
//   voucherCode: string = '';
//   selectedPaymentMethod: string = 'Bank';
//   selectPayment(method: string) {
//     this.selectedPaymentMethod = method;
//   }

//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private activatedRoute: ActivatedRoute,
//     private orderService: OrderService,
//     private discountService: DiscountService,
//     private accountcustomerSerive:  AccountcustomerService , 
//   ) {
//     this.checkoutFormGroup = this.formBuilder.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.email, Validators.required]],
//       phone: ['', Validators.required],
//       city: ['', Validators.required],
//       country: ['Việt Nam'],
//       zip: [''],
//       district: ['', Validators.required],
//       street: ['', Validators.required],
//       orderNotes: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.activatedRoute.queryParams.subscribe((params: Params) => {
//       if (params['cartItems']) {
//         this.cartItems = JSON.parse(params['cartItems']);
        
//         this.orderTotal = parseFloat(params['orderTotal']);
//         this.shippingFee = parseFloat(params['shippingFee']);
//         this.discount = parseFloat(params['discount']);
//         this.totalAmount = parseFloat(params['totalAmount']);
//         this.userId = parseFloat(params['userId']);
//         this.voucherCode = params['voucherCode']

//         // Load thông tin tài khoản
//         this.loadAccountData(this.userId);

//         console.log('cartItems', this.cartItems)
//         console.log('orderTotal', this.orderTotal)
//         console.log('shippingFee', this.shippingFee)
//         console.log('totalAmount', this.totalAmount)
//         console.log('userId', this.userId)
//         console.log('voucherCode', this.voucherCode)


        
//       }
//     });
    
//   }

//   // Trong hàm loadAccountData
// loadAccountData(userId: number): void {
//   this.accountcustomerSerive.getAccount(userId).subscribe(
//     (account: any) => {
//       if (account && account.account) {
//         this.checkoutFormGroup.patchValue({
//           name: account.account.Name,
//           email: account.account.Mail,
//           phone: account.account.phonenumber,
//           country: account.account.addresses[0].country,
//           zip: account.account.addresses[0].postcodeZip,
//           city: account.account.addresses[0].province,
//           district: account.account.addresses[0].district,
//           street: account.account.addresses[0].addressDetail,
//         });
//       } else {
//         console.error('Account not found');
//       }
//     },
//     (error) => {
//       console.error('Error retrieving account information:', error);
//     }
//   );
// }


//   backtoCart(): void {
//     this.router.navigate(['/cart']);
//   }

//   placeOrder(): void {
//     console.log('Request body:', this.checkoutFormGroup.getRawValue());

//     this.isSubmitted = true;
//     if (this.checkoutFormGroup.invalid) {
//       return;
//     }

//     console.log('Place Order button clicked');

//     const clientInfo: ClientInfo = {
//       clientname: this.checkoutForm['name'].value,
//       clientphone: this.checkoutForm['phone'].value,
//       clientemail: this.checkoutForm['email'].value,
//     };

//     const address: Address = {
//       country: this.checkoutForm['country'].value,
//       postcodeZip: this.checkoutForm['zip'].value,
//       province: this.checkoutForm['city'].value,
//       district: this.checkoutForm['district'].value,
//       addressDetail: this.checkoutForm['street'].value,
//     };

//     console.log('Client Info:', clientInfo);
//     console.log('Address:', address);

//     const order: Order = {
//       userid: this.userId, 
//       channel: 'Website',
//       ordernumber: Number(), 
//       products: this.cartItems,
//       order_status: 'Chờ xử lí', // Trạng thái đơn hàng mặc định
//       ordereddate: new Date(),
//       paymentmethod: this.selectedPaymentMethod,
//       paymentstatus: false, 
//       totalOrderValue: this.orderTotal,
//       shippingfee: this.shippingFee,
//       discount: this.discount,
//       totalAmount: this.totalAmount,
//       adress: address,
//       clientInfo: clientInfo,
//       orderNote: 'Không có ghi chú', // 
//       id: String(), // 
//       rejectreason: '' // Lí do từ chối đơn hàng
//     };
//     console.log('Order:', order);
//     console.log('products: this.cartItems', order.products)
//         console.log('totalOrderValue: this.orderTotal', order.totalOrderValue)
//         console.log('discount: this.discount,', this.discount)
//         console.log('totalAmount: this.totalAmount,',  this.totalAmount)

//    // Gọi phương thức createOrder từ OrderService
//    this.orderService.createOrder(this.userId, order).subscribe(
//     (createdOrder) => {
//       console.log('Đơn hàng đã được tạo:', createdOrder);
//       this.discountService.updateDiscountUserIds(this.voucherCode, this.userId).subscribe(
//         (updatedDiscount) => {
//           console.log('Discount updated:', updatedDiscount);
//         },
//         (error) => {
//           console.error('Lỗi khi cập nhật Discount:', error);
//         }
//       );
//       alert('Đơn hàng đã được tạo thành công')
//       this.router.navigate(['/main-page']);
//     },
//     (error) => {
//       console.error('Lỗi khi tạo đơn hàng:', error);
//     }
//   );
//   }

//   get checkoutForm() {
//     return this.checkoutFormGroup.controls;
//   }
}