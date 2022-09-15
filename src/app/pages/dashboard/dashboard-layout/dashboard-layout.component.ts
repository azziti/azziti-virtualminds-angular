import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  constructor(public storageService : StorageService, private router: Router, private authService : AuthService) { }


  ngOnInit(): void {

    console.log('dashboard loaded')
    console.log('is authenticated', this.authService.isAuthenticated());

  }

}
