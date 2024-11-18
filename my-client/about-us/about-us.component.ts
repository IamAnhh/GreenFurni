import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'] // Sửa styleUrl thành styleUrls
})
export class AboutUsComponent {
  constructor(private router: Router) {}

  navigateToProducts(): void {
    this.router.navigate(['/products']).then(() => {
      window.scrollTo(0, 0); // Cuộn lên đầu trang
    });
  }
}
