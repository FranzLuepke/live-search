import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'; 
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        HomeRoutingModule,
        MatButtonModule,
        HttpClientModule,
    ],
})

export class HomeModule {}