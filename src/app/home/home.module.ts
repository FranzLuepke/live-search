import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'; 
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        HomeRoutingModule,
        MatButtonModule,
    ],
})

export class HomeModule {}