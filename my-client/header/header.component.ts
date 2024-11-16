// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [],
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.css'
// })
// export class HeaderComponent {

// }
import { CommonModule } from '@angular/common';
import {Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent{

  menuOpen = false;

  toggleMenu(event: Event) {
    event.stopPropagation(); // Prevent event from bubbling to the document
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Close the menu if clicking outside the .dropdown-container or on the menu icon
    if (!target.closest('.dropdown-container') && this.menuOpen) {
      this.menuOpen = false;
    }
  }
}


// @HostListener('document:click', ['$event'])
// onClickOutside(event: MouseEvent) {
//   const target = event.target as HTMLElement;
//   if (!target.closest('.dropdown-container') && this.menuOpen) {
//     this.menuOpen = false;
//   }
// }

