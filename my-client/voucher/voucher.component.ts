

import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: "app-voucher",
  imports: [CommonModule,SidebarComponent],
  standalone: true,
  templateUrl: './voucher.component.html',
  styleUrl: './voucher.component.css'


})
export class VoucherComponent {
  voucherError = false;

  validateVoucher(event: Event) {
    event.preventDefault(); // Ngăn hành động mặc định của form
    const voucherInput = (document.getElementById('voucherInput') as HTMLInputElement).value;

    // Kiểm tra điều kiện voucher
    if (voucherInput.length !== 10) {
      this.voucherError = true; // Hiện thông báo lỗi nếu voucher không đủ 10 ký tự
    } else {
      this.voucherError = false; // Ẩn thông báo lỗi nếu voucher hợp lệ
      // Thực hiện các hành động khác (nếu cần) khi voucher hợp lệ
    }
  }

  isPopupVisible = false; // Biến để kiểm soát hiển thị pop-up

  openPopup() {
    this.isPopupVisible = true; // Hiển thị pop-up khi nhấn vào điều kiện
  }

  closePopup() {
    this.isPopupVisible = false; // Ẩn pop-up khi nhấn nút đóng
  }

}
