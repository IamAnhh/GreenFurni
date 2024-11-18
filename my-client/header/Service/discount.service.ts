import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  getDiscountByCode(voucherCode: string) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
