import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CaissesListComponent } from './caisses-list/caisses-list.component';
import { CaisseEditComponent } from './caisse-edit/caisse-edit.component';
import { CaisseAddComponent } from './caisse-add/caisse-add.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { RouterModule } from '@angular/router';
import { ScvImportComponent } from './scv-import/scv-import.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    CaissesListComponent,
    CaisseEditComponent,
    CaisseAddComponent,
    ScvImportComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [],
  exports: [],
})
export class DashboardModule {}
