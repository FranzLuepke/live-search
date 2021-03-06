import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { first, map, startWith } from 'rxjs/operators';
import { Hit, Response } from "src/app/models/response";
import { UserResponse } from "src/app/models/userResponse";
import { DataService } from "src/app/services/data.service";

export interface Options {
  searchField: string[];
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
  @Input() noUsersFound = false;
  @Output() emitUsers = new EventEmitter<Hit[]>();
  formGroup: FormGroup;
  options: Options = { 
    searchField: [],
    firstName: [],
    lastName: [],
    email: [],
    phone: [],
    consumerId: [],
  };
  filteredOptions: Observable<Options>;
  advancedSearch = false;
  readonly EMAIL_REGX = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[A-Za-z]{2,4}';
  searchEnabled = true;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
  ) {
    this.formGroup = this.formBuilder.group({
      searchField: ['', [Validators.minLength(3)]],  
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(this.EMAIL_REGX)]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      consumerId: ['', [Validators.required, Validators.minLength(5)]],
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

  private _filter(value: string, type: 'searchField' | 'firstName' | 'lastName' | 'email' | 'phone' | 'consumerId'): string[] {
      const filterValue = value?.toLowerCase();
      return this.options[type].filter(option => option.toLowerCase().includes(filterValue));
  }

  public search(type: 'searchField' | 'firstName' | 'lastName' | 'email' | 'phone' | 'consumerId', $event: any) {
    if (this.searchEnabled) {
      if (this.formGroup.get(type)?.valid) {
        console.log(`${type}: ${$event}`);
        this.dataService.liveSearch(type, $event).pipe(first()).subscribe((response: Response) => {
          console.log(response);
          this.emitUsers.emit(response.hits);
          this.searchEnabled = false;
        });
      }
    }
  }

  public async checkUser() {
    const user = this.formGroup.value;
    this.dataService.manualSearch(user).pipe(first()).subscribe((response: Response) => {
      console.log(response);
      this.emitUsers.emit(response.hits);
    });
  }

  public isFormValid() {
    return (this.firstNameControl?.invalid || this.lastNameControl?.invalid)
    && (this.firstNameControl?.invalid || this.emailControl?.invalid)
    && (this.firstNameControl?.invalid || this.phoneControl?.invalid)
    && (this.firstNameControl?.invalid || this.consumerIdControl?.invalid)
    && (this.lastNameControl?.invalid || this.emailControl?.invalid)
    && (this.lastNameControl?.invalid || this.phoneControl?.invalid)
    && (this.lastNameControl?.invalid || this.consumerIdControl?.invalid)
    && (this.emailControl?.invalid || this.phoneControl?.invalid)
    && (this.emailControl?.invalid || this.consumerIdControl?.invalid)
    && (this.phoneControl?.invalid || this.consumerIdControl?.invalid);
  }

  toggleAdvancedSearch() {
    this.advancedSearch = !this.advancedSearch;
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
