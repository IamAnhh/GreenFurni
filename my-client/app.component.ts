import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RequestedProductComponent } from './requested-product/requested-product.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { VoucherComponent } from './voucher/voucher.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PassworndAuthenticationComponent } from './passwornd-authentication/passwornd-authentication.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { BlogComponent } from './blog/blog.component';
import { FaqComponent } from './faq/faq.component';
import { PolicyComponent } from './policy/policy.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { ProductReviewComponent } from './product-review/product-review.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    SignUpComponent,
    ResetPasswordComponent,
    PassworndAuthenticationComponent,
    NewPasswordComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    AboutUsComponent,
    ProductListComponent,
    ProductDetailComponent,
    RequestedProductComponent,
    ProfileComponent,
    AddressComponent,
    VoucherComponent,
    OrderManagementComponent,
    ProductReviewComponent,
    BlogComponent,
    BlogDetailComponent,
    FaqComponent,
    PolicyComponent,
    ShoppingCartComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-client';
}
