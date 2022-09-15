import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ToasterComponent } from './toaster/toaster.component';
import { ToastComponent } from './toast/toast.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ToasterComponent,
    ToastComponent,
  ],
  imports: [

    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    ToasterComponent,

  ]
})
export class ComponentsModule { }
