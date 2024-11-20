// import { CommonModule } from "@angular/common";
// import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
// import { FormsModule } from "@angular/forms";
// import { CustomproductService } from '../Service/customproduct.service';

// @Component({
//   selector: 'app-requested-product',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './requested-product.component.html',
//   styleUrls: ['./requested-product.component.css']
// })
// export class RequestedProductComponent implements OnInit {
//   formData = {
//     name: '',
//     email: '',
//     phone: '',
//     productName: '',
//     description: ''
//   };

//   selectedFile: File | null = null;
//   isPopupVisible: boolean = false;

//   constructor(
//     private customProductService: CustomproductService,
//     private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     console.log('RequestedProductComponent initialized.');
//   }

//   // Khi người dùng chọn file
//   onFileSelected(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       this.selectedFile = input.files[0];
//     }
//   }

//   // Gửi form và file lên server
//   onSubmit() {
//     console.log('Form submitted:', this.formData);

//     // Kiểm tra nếu có file đã chọn
//     if (this.selectedFile) {
//       this.customProductService.submitForm(this.formData, this.selectedFile)
//         .subscribe(
//           (response: any) => {
//             console.log('Response from server:', response);
//             this.showPopup(); // Hiển thị popup khi gửi thành công
//           },
//           (error: any) => {
//             console.error('Error:', error);
//           }
//         );
//     } else {
//       console.warn('No file selected.');
//       this.showPopup(); // Hiển thị popup ngay cả khi không có file
//     }
//   }

//   // Hiển thị popup cảm ơn
//   showPopup() {
//     this.isPopupVisible = true;
//   }

//   // Đóng popup
//   closePopup() {
//     this.isPopupVisible = false;
//     this.cdr.detectChanges();  // Trigger change detection nếu cần
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomproductService } from '../Service/customproduct.service';

@Component({
  selector: 'app-requested-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './requested-product.component.html',
  styleUrls: ['./requested-product.component.css'],
})
export class RequestedProductComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    productName: '',
    description: '',
  };
  isPopupVisible = false;

  constructor(private customProductService: CustomproductService) {}

  // Gửi form dữ liệu lên server
  onSubmit(): void {
    if (this.validateForm()) {
      // Gửi formData mà không cần file
      this.customProductService.submitForm(this.formData).subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);

          console.log('duwx lieeuj Formdata: ' + this.formData);
        },
        error: (err) => {
          // console.error('Error submitting form:', err);
          this.showPopup();
          this.resetForm();
        },
      });
    } else {
      alert('Vui lòng điền đầy đủ thông tin vào form!');
    }
  }

  // Hiển thị popup thành công
  showPopup(): void {
    this.isPopupVisible = true;
  }

  // Đóng popup
  closePopup(): void {
    this.isPopupVisible = false;
  }

  // Reset form sau khi gửi thành công
  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      productName: '',
      description: '',
    };
  }

  // Validate các trường trong form
  validateForm(): boolean {
    return (
      this.formData.name.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.phone.trim() !== '' &&
      this.formData.productName.trim() !== '' &&
      this.formData.description.trim() !== ''
    );
  }
}
