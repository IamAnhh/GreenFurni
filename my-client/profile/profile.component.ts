
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsersService } from '../Service/users.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  formData = {
    name: '',
    phone: '',
    email: '',
    gender: '',
    birthDate: '',
    avatar: ''
  };

  isEditing = false;

  constructor(private usersService: UsersService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.usersService.getProfile().subscribe(
      (data) => {
        this.formData = data;
      },
      (error) => {
        console.error('Error fetching profile data:', error);
      }
    );
  }

  onEdit(): void {
    this.isEditing = true;
  }


  onSave(): void {
    this.usersService.updateProfile(this.formData).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);

        // Cập nhật formData
        this.formData = response;

        // Quay lại trạng thái không chỉnh sửa
        this.isEditing = false;

        // Hiển thị thông báo thành công
        alert('Lưu thông tin thành công!');

        // Cập nhật giao diện
        this.cdRef.detectChanges();
      },
      (error) => {
        console.error('Error updating profile:', error);
        alert('Có lỗi xảy ra khi lưu thông tin!');
      }
    );
  }


  onAvatarSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.formData.avatar = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
