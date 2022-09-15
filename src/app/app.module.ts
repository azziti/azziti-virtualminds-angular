import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { AuthenticationModule } from './pages/authentication/authentication.module';
import { ComponentsModule } from './components/components.module';
import { Error403Interceptor } from './interceptors/403interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    DashboardModule,
    AuthenticationModule,
    ComponentsModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Error403Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


