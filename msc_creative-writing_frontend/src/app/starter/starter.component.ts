import { Component } from '@angular/core';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrl: './starter.component.scss'
})
export class StarterComponent {
  slides : any[] = [
    {
      url: './assets/book-composition-with-open-book.jpg',
      title: 'First slide',
      description: 'This is the first slide'
    },
    {
      url: './assets/creative-composition-with-books-flower.jpg',
      title: 'Second slide',
      description: 'This is the second slide'
    },
    {
      url: './assets/modern-bookstore-showcasing-rows-vibrant-books.jpg',
      title: 'Third slide',
      description: 'This is the third slide'
    }
  ];
}
