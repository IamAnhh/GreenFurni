// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-policy',
//   standalone: true,
//   imports: [],
//   templateUrl: './policy.component.html',
//   styleUrl: './policy.component.css'
// })
// export class PolicyComponent {


// }



import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [CommonModule],  // Thêm CommonModule vào imports
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent {
  selectedOption: string = 'banHang';  // Biến lưu lựa chọn hiện tại

  // Hàm để thay đổi lựa chọn
  setSelectedOption(option: string): void {
    this.selectedOption = option;
  }

}
