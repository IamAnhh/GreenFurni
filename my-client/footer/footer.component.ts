// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-footer',
//   standalone: true,
//   imports: [],
//   templateUrl: './footer.component.html',
//   styleUrl: './footer.component.css'
// })
// export class FooterComponent {

// }

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  mobileMenu: HTMLElement | null = null;
  navMenu: HTMLElement | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Lắng nghe sự kiện DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
      const h4Elements = document.querySelectorAll('footer h4');

      h4Elements.forEach((h4Element) => {
        h4Element.addEventListener('click', () => {
          h4Element.classList.toggle('active');
        });
      });
    });

    // Lấy mobile menu và nav menu
    this.mobileMenu = document.getElementById("mobile-menu");
    this.navMenu = document.getElementById("nav");

    if (this.mobileMenu && this.navMenu) {
      this.mobileMenu.addEventListener("click", () => {
        if (this.mobileMenu?.classList && this.navMenu?.classList) {
          this.mobileMenu.classList.toggle("active");
          this.navMenu.classList.toggle("active");
        }
      });
    }

    // Lắng nghe sự kiện điều hướng của Angular Router
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // Cuộn lên đầu trang khi điều hướng hoàn tất
        window.scrollTo(0, 0);
      }
    });
  }

}
