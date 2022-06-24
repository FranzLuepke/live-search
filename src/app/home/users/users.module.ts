import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [UsersComponent],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        UsersRoutingModule,
        MatAutocompleteModule,
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
    ],
    exports: [UsersComponent],
})

export class UsersModule {}