import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { DepartmentsService } from '../services/departments.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    SharedModule
  ],
  declarations: [DepartmentsComponent],
  providers: [DepartmentsService]
})
export class DepartmentsModule { }
