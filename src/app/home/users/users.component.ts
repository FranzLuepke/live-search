import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map, startWith } from 'rxjs/operators';
import { Router } from "@angular/router";

export interface Data {
  searchData: string[];
}

export interface Options {
  firstName: string[];
  lastName: string[];
  email: string[];
  phone: string[];
  customerId: string[];
}

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
    formGroup: FormGroup;
    options: Options = { 
      firstName: ['John', 'Johny', 'Arnold'],
      lastName: [],
      email: [],
      phone: [],
      customerId: [],
    };
    filteredOptions: Observable<Options>;
    url = 'http://rhlsacbase723.na.rccl.com:8094/api/index/intranet_persistence/query';

    constructor(
      private formBuilder: FormBuilder,
      private httpClient: HttpClient,
      private router: Router,
    ) {
      this.formGroup = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.minLength(6)]],
        customerId: ['', [Validators.required]],
      });
      this.filteredOptions = this.formGroup.valueChanges.pipe(
        startWith(''),
        map(name => {
          return {
            firstName: (name['firstName'] ? this._filter(name['firstName'], 'firstName') : this.options.firstName.slice()),
            lastName: (name['lastName'] ? this._filter(name['lastName'], 'lastName') : this.options.lastName.slice()),
            email: (name['email'] ? this._filter(name['email'], 'email') : this.options.email.slice()),
            phone: (name['phone'] ? this._filter(name['phone'], 'phone') : this.options.phone.slice()),
            customerId: (name['customerId'] ? this._filter(name['customerId'], 'customerId') : this.options.customerId.slice()),
          } as Options
        }),
      );
      this.filteredOptions.subscribe((data) => {
        this.options.firstName = data.firstName;
        this.options.lastName = data.lastName;
        this.options.email = data.email;
        this.options.phone = data.phone;
        this.options.customerId = data.customerId;
      });
    }

    displayFn(user: string): string {
      return user ? user : '';
    }

    private _filter(value: string, type: 'firstName' | 'lastName' | 'email' | 'phone' | 'customerId'): string[] {
        const filterValue = value.toLowerCase();
        console.log(this.options[type]);
        console.log(filterValue);
        return this.options[type].filter(option => option.toLowerCase().includes(filterValue));
    }

    public search(type: 'firstName' | 'lastName' | 'email' | 'phone' | 'customerId', $event: any) {
      if ($event.length > 3) {
        const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
        const body = {
          "query" :{
            "query" : "id: 060d4784-6195-447c-866b-44a2c7416bc8"
          },
          "size" : 200,
          "fields" : [{type: $event}]
        };
        
        this.httpClient.post<Data>(this.url, body, { headers }).subscribe((response) => {
          console.log(response);
          this.options[type] = response.searchData;
        });
      }
    }

    public async goBack() {
      await this.router.navigate(['home']);
    }
}
