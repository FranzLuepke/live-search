import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { UserResponse } from "src/app/models/userResponse";
import { DataService } from "src/app/services";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  dataSource: User[] = [];
  noRegistersFound = false;

  constructor(
    private router: Router,
    private dataService: DataService,
  ) {}

  userWasEmitted(users: { fields: UserResponse; }[]) {
    const newUsers: User[] = [];
    users.forEach((response) => {
      newUsers.push({
        firstName: response.fields?.FIRST_NAME,
        lastName: response.fields?.LAST_NAME,
        email: response.fields?.EMAIL_ADDRESS,
        phone: response.fields?.CNSMR_HOME_PHONE_NBR,
        consumerId: response.fields?.CNSMR_ID,
        genderCode: '',
        prefixCode: '',
        middleName: '',
        addressName: '',
        addressCityName: '',
        addressLine: '',
        emailTypeCode: '',
        phoneId: '',
        phoneNumber: '',
      });
    });
    this.dataSource = newUsers;
    if (newUsers.length === 0) {
      this.noRegistersFound = true;
    } else {
      this.noRegistersFound = false;
    }
  }

  public async goBack() {
    await this.router.navigate(['home']);
  }

  searchDetailedInformation(consumerId: string) {
    console.log('DETAILS QUERY');
    this.dataService.getMoreDetails(consumerId).subscribe((r) => {
      console.log(r);
    });
  }
}
