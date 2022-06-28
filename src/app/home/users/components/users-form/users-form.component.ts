import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from 'rxjs/operators';
import { Response } from "src/app/models/response";
import { User } from "src/app/models/user";
import { DataService } from "src/app/services/data.service";

export interface Options {
  firstName: string[];
  lastName: string[];
  email: string[];
  phone: string[];
  consumerId: string[];
}

@Component({
    selector: 'app-users-form',
    templateUrl: './users-form.component.html',
    styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent {
  @Output() emitUsers = new EventEmitter<User[]>();
  formGroup: FormGroup;
  options: Options = { 
    firstName: ['John', 'Johny', 'Arnold'],
    lastName: [],
    email: [],
    phone: [],
    consumerId: [],
  };
  filteredOptions: Observable<Options>;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
  ) {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      consumerId: ['', [Validators.required]],
    });
    this.filteredOptions = this.formGroup.valueChanges.pipe(
      startWith(''),
      map(name => {
        return {
          firstName: (name['firstName'] ? this._filter(name['firstName'], 'firstName') : this.options.firstName.slice()),
          lastName: (name['lastName'] ? this._filter(name['lastName'], 'lastName') : this.options.lastName.slice()),
          email: (name['email'] ? this._filter(name['email'], 'email') : this.options.email.slice()),
          phone: (name['phone'] ? this._filter(String(name['phone']), 'phone') : this.options.phone.slice()),
          consumerId: (name['consumerId'] ? this._filter(name['consumerId'], 'consumerId') : this.options.consumerId.slice()),
        } as Options
      }),
    );
    this.filteredOptions.subscribe((data) => {
      this.options.firstName = data.firstName;
      this.options.lastName = data.lastName;
      this.options.email = data.email;
      this.options.phone = data.phone;
      this.options.consumerId = data.consumerId;
    });
    
  }

  displayFn(user: string): string {
    return user ? user : '';
  }

  private _filter(value: string, type: 'firstName' | 'lastName' | 'email' | 'phone' | 'consumerId'): string[] {
      const filterValue = value?.toLowerCase();
      return this.options[type].filter(option => option.toLowerCase().includes(filterValue));
  }

  public search(type: 'firstName' | 'lastName' | 'email' | 'phone' | 'consumerId', $event: any) {
    // if ($event?.length > 3) {
    //   const headers = {
    //     'Ocp-Apim-Subscription-Key': '92ed2d08af93477ebef8d5d2cdd02da8',
    //     'Ocp-Apim-Trace': 'true',
    //   }
    //   const body = {
    //     "query" :{
    //       "query" : "id: 060d4784-6195-447c-866b-44a2c7416bc8"
    //     },
    //     "size" : 200,
    //     "fields" : [{type: $event}]
    //   };
    //   this.dataService.search(type, $event).subscribe((data) => console.log(data));
    // }
  }

  public async checkUser() {
    const user = this.formGroup.value;
    this.dataService.searchUser(user).subscribe((response: Response) => {
      this.emitUsers.emit(response.hits);
    });
    // this.dataService.getResponse().subscribe((response: Response) => {
    //   this.emitUsers.emit(response.hits);
    // });
  }

  public isFormValid() {
    return this.firstNameControl?.invalid &&
    this.lastNameControl?.invalid &&
    this.emailControl?.invalid &&
    this.phoneControl?.invalid &&
    this.consumerIdControl?.invalid;
  }

  get firstNameControl() {
    return this.formGroup.get('firstName') as FormControl;
  }

  get lastNameControl() {
    return this.formGroup.get('lastName') as FormControl;
  }

  get emailControl() {
    return this.formGroup.get('email') as FormControl;
  }

  get phoneControl() {
    return this.formGroup.get('phone') as FormControl;
  }

  get consumerIdControl() {
    return this.formGroup.get('consumerId') as FormControl;
  }
}
