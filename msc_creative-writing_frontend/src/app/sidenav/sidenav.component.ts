import { CommonModule } from '@angular/common';
import { Component, Input, Signal, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

export type MenuItem = {
  icon: string;
  label: string;
  route? : any;
  subMenu? : MenuItem[];
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  menuItems : MenuItem[] = [
    {
      icon: 'dashboard',
      label: 'Történetek',
      route: 'dashboard'
    },
    {
      icon: 'book',
      label: 'Fejezetek',
      route: 'chapters',
      subMenu: [
        {
          icon: 'edit',
          label: 'Dokumentum készítő',
          route: 'doc-editor'
        }
      ]
    },
    {
      icon: 'person',
      label: 'Karakterek',
      route: 'characters',
      subMenu: [
        {
          icon: 'edit',
          label: 'Karakter tervező',
          route: 'character-editor'
        },
        {
          icon: 'group_work',
          label: 'Karakterkapcsolatok',
          route: 'character-connections'
        }
      ]
    },
    {
      icon: 'perm_media',
      label: 'Galéria',
      route: 'gallery'
    }

  ];

  collapsed = false;

  sidenavWidth : any;

  switch() {
    this.collapsed = !this.collapsed;
    console.log(this.collapsed);
    this.sidenavWidth = this.collapsed ? '90px' : '250px';
    console.log(this.sidenavWidth);
  }

}
