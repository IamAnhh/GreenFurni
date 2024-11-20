// import { Routes } from '@angular/router';

// export const routes: Routes = [];

import {NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PassworndAuthenticationComponent } from './passwornd-authentication/passwornd-authentication.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BlogComponent } from './blog/blog.component';
import { FaqComponent } from './faq/faq.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PolicyComponent } from './policy/policy.component';
import { RequestedProductComponent } from './requested-product/requested-product.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { VoucherComponent } from './voucher/voucher.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

export const routes: Routes = [
  {path:'' , component:HomePageComponent},
  {path: 'login', component:LoginComponent},
  {path:'signup', component:SignUpComponent},
  {path:'resetpassword',component:ResetPasswordComponent},
  {path: 'audentification', component:PassworndAuthenticationComponent},
  {path:'newpassword', component:NewPasswordComponent},

  { path: 'homepage', component: HomePageComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },

  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'custom', component: RequestedProductComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'address', component: AddressComponent },
  { path: 'voucher', component: VoucherComponent },
  { path: 'management', component: OrderManagementComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}







// // app-routing.module.ts
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { ProductComponent } from './product/product.component';

// const routes: Routes = [
//   { path: 'home', component: HomeComponent },
//   { path: 'product', component: ProductComponent },
//   { path: '', redirectTo: '/home', pathMatch: 'full' }, // Chuyển hướng đến 'home' nếu đường dẫn rỗng
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
