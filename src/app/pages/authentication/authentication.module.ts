import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { AutheticationLayoutComponent } from './authetication-layout/authetication-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationRoutigModule } from './authentication-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LoginComponent,
    AutheticationLayoutComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutigModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ] ,
  exports : [
  ]
})
export class AuthenticationModule { }
