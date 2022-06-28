import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DataService } from './data.service';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [
    DataService,
  ],
})
export class ServicesModule {}
