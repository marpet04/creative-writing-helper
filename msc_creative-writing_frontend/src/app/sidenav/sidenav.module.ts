import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavRoutingModule } from './sidenav-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidenavComponent } from './sidenav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    SidenavRoutingModule,
    MatButtonModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatListModule, 
    MatToolbarModule,
    MatExpansionModule
  ]
})
export class SidenavModule { }
