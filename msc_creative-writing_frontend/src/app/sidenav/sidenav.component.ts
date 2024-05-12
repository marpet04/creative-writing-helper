import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Signal, SimpleChanges, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { SharedDataService } from '../services/shared-data.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
export class SidenavComponent implements OnInit, OnChanges{
  menuItems : MenuItem[] = [
    {
      icon: 'dashboard',
      label: 'Történetek',
      route: 'dashboard'
    }
  ];

  fullMenuItems : MenuItem[] = [
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
      icon: 'events',
      label: 'Események',
      route: 'events',
      subMenu: [
        {
          icon: 'event_note',
          label: 'Esemény szerkesztő',
          route: 'event-editor'
        },
        {
          icon: 'timeline',
          label: 'Idővonal tervező',
          route: 'timeline'
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

  selectedStoryTitle : string = localStorage.getItem('selectedStoryTitle') ?? "";

  constructor(private sharedDataService: SharedDataService, private router: Router, private authService: AuthService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.sharedDataService.getSelectedStory().subscribe(x => {
      this.selectedStoryTitle = x?.title;
      if (this.selectedStoryTitle != "") {
        this.menuItems = this.fullMenuItems;
      }
    });
  }

  ngOnInit(): void {
      this.sharedDataService.getSelectedStory().subscribe(x => {
        this.selectedStoryTitle = x?.title;
        this.selectedStoryTitle = localStorage.getItem('selectedStoryTitle')!;
        console.log(this.selectedStoryTitle);
        if (this.selectedStoryTitle != null) {
          this.menuItems = this.fullMenuItems;
        }
      });
  }

  switch() {
    this.collapsed = !this.collapsed;
    console.log(this.collapsed);
    this.sidenavWidth = this.collapsed ? '90px' : '250px';
    console.log(this.sidenavWidth);
  }

  goToProfile() {
    this.router.navigateByUrl('/nav/profile');
  }

  goToSettings() {
    this.router.navigateByUrl('/nav/settings');
  }

  logout() {
    this.authService.logout();
  }

}
