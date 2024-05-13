import { Component } from '@angular/core';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrl: './starter.component.scss'
})
export class StarterComponent {
  slides : any[] = [
    {
      url: './assets/undraw_Book_lover_re_rwjy.png',
      title: 'Book lover',
      description: 'Book lover'
    },
    {
      url: './assets/undraw_My_documents_re_13dc.png',
      title: 'My documents',
      description: 'My documents'
    },
    {
      url: './assets/undraw_Personal_notebook_re_d7dc.png',
      title: 'Personal notebook',
      description: 'Personal notebook'
    }
  ];
}
