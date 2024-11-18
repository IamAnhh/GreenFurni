import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../Service/users.service';
import { catchError, retry, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  showAddressForm = false;

  newAddress = {
    name: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    addressDetail: '',
    isDefault: false
  };

  addresses: { name: string; phone: string; province: string; district: string; ward: string; addressDetail: string; isDefault: boolean }[] = [];
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  constructor(private addressService: UsersService) { }


  // ngOnInit() {
  //   this.loadProvinces();
  //   console.log("Danh sách tỉnh:", this.provinces);  // Kiểm tra danh sách tỉnh sau khi tải
  // }

  // loadProvinces() {
  //   this.addressService.getProvinces().subscribe({
  //     next: data => {
  //       console.log("Dữ liệu tỉnh:", data);
  //       if (Array.isArray(data.data.data)) {
  //         this.provinces = data.data.data;  // Sử dụng `data.data.data` để lấy mảng tỉnh
  //       } else {
  //         console.error("Dữ liệu tỉnh không phải là mảng:", data.data.data);
  //       }
  //     },
  //     error: error => {
  //       console.error("Lỗi khi lấy danh sách tỉnh:", error);
  //     }
  //   });
  // }
  // onProvinceChange(provinceCode: string) {
  //   this.newAddress.district = '';
  //   this.newAddress.ward = '';
  //   this.districts = [];
  //   this.wards = [];

  //   this.addressService.getDistricts(provinceCode).subscribe({
  //     next: data => {
  //       console.log("Dữ liệu huyện:", data);
  //       if (Array.isArray(data.data.data)) {
  //         this.districts = data.data.data;
  //       } else {
  //         console.error("Dữ liệu huyện không phải là mảng:", data.data.data);
  //       }
  //     },
  //     error: error => {
  //       console.error("Lỗi khi lấy danh sách huyện:", error);
  //     }
  //   });
  // }

  // onDistrictChange(districtCode: string) {
  //   this.newAddress.ward = '';
  //   this.wards = [];

  //   this.addressService.getWards(districtCode).subscribe({
  //     next: data => {
  //       console.log("Dữ liệu xã/phường:", data);
  //       if (Array.isArray(data.data.data)) {
  //         this.wards = data.data.data;
  //       } else {
  //         console.error("Dữ liệu xã/phường không phải là mảng:", data.data.data);
  //       }
  //     },
  //     error: error => {
  //       console.error("Lỗi khi lấy danh sách xã/phường:", error);
  //     }
  //   });
  // }

  filteredDistricts: any[] = [];
  filteredWards: any[] = [];



  ngOnInit() {
    this.loadProvinces();
  }

  loadProvinces() {
    this.addressService.getProvinces().subscribe(data => {
      this.provinces = data.data.data;
    });
  }

  onProvinceChange(provinceCode: string) {
    this.newAddress.district = '';
    this.newAddress.ward = '';
    this.filteredWards = [];

    // Lấy danh sách huyện theo tỉnh đã chọn
    this.addressService.getDistricts(provinceCode).subscribe(data => {
      this.districts = data.data.data;
      this.filteredDistricts = this.districts.filter(district => district.parent_code === provinceCode);
    });
  }

  onDistrictChange(districtCode: string) {
    this.newAddress.ward = '';

    // Lấy danh sách xã/phường theo huyện đã chọn
    this.addressService.getWards(districtCode).subscribe(data => {
      this.wards = data.data.data;
      this.filteredWards = this.wards.filter(ward => ward.parent_code === districtCode);
    });
  }

  saveAddress() {
    if (this.newAddress.name && this.newAddress.phone && this.newAddress.province && this.newAddress.district && this.newAddress.ward && this.newAddress.addressDetail) {
      // Find and store the full names based on selected codes
      const provinceName = this.provinces.find(p => p.code === this.newAddress.province)?.name;
      const districtName = this.districts.find(d => d.code === this.newAddress.district)?.name;
      const wardName = this.wards.find(w => w.code === this.newAddress.ward)?.name;

      // Store the full address with names
      const addressToSave = {
        ...this.newAddress,
        province: provinceName || '',
        district: districtName || '',
        ward: wardName || '',
      };

      // If 'isDefault' is selected, reset other addresses' default status
      if (addressToSave.isDefault) {
        this.addresses.forEach(address => (address.isDefault = false));
      }

      // Push the new address to the list and reset the form
      this.addresses.push(addressToSave);
      this.showAddressForm = false;
      this.newAddress = {
        name: '',
        phone: '',
        province: '',
        district: '',
        ward: '',
        addressDetail: '',
        isDefault: false
      };
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  }


  deleteAddress(address: { name: string; phone: string; province: string; district: string; ward: string; addressDetail: string; isDefault: boolean }) {
    const index = this.addresses.indexOf(address);
    if (index > -1) {
      this.addresses.splice(index, 1);
    }
  }

  editAddress(address: { name: string; phone: string; province: string; district: string; ward: string; addressDetail: string; isDefault: boolean }) {
    this.newAddress = { ...address };
    this.showAddressForm = true;
    this.deleteAddress(address);
  }

  setDefault(address: { name: string; phone: string; province: string; district: string; ward: string; addressDetail: string; isDefault: boolean }) {
    this.addresses.forEach(a => a.isDefault = false);
    address.isDefault = true;
  }


}






























