import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardGuard } from './guards/dashboard.guard';


const routes: Routes = [

  { path: '', redirectTo:'authentication', pathMatch:"full" },
  { path: 'authentication',
  loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule),
  canActivate : [AuthGuard],
  canLoad : [AuthGuard]
},
  { path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate : [DashboardGuard],
    canLoad : [DashboardGuard]
  },
  { path: '**', redirectTo: '/authentication', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}