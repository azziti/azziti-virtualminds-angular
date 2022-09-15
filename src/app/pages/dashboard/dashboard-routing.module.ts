import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaisseAddComponent } from './caisse-add/caisse-add.component';
import { CaisseEditComponent } from './caisse-edit/caisse-edit.component';
import { CaissesListComponent } from './caisses-list/caisses-list.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ScvImportComponent } from './scv-import/scv-import.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'caisses-list', pathMatch: 'full' },
      { path: 'caisses-list', component: CaissesListComponent },
      { path: 'caisse-add', component: CaisseAddComponent },
      { path: 'caisse-edit/:id', component: CaisseEditComponent },
      { path: 'caisse-csv-import', component: ScvImportComponent },
      { path: 'error-404', component: NotFoundComponent },
      { path: '**', redirectTo: 'error-404', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
