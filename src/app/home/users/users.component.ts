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
  users: User[] = [];
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
        loyaltyID: response.fields?.CNSMR_LOYALTY_NUMBER,
        loyaltyTier: response.fields?.CNSMR_LOYALTY_TIER,
        addressLine: response.fields?.CNSMR_ADDRESS_LINE1,
        genderCode: '',
        prefixCode: '',
        middleName: '',
        addressName: '',
        addressCityName: '',
        emailTypeCode: '',
        phoneId: '',
        phoneNumber: '',
      });
    });
    this.users = newUsers;
    if (newUsers.length === 0) {
      this.noRegistersFound = true;
    } else {
      this.noRegistersFound = false;
    }
  }

  public async goBack() {
    await this.router.navigate(['home']);
  }

  searchDetailedInformation(id: string) {
    console.log('DETAILS QUERY');
    this.dataService.getMoreDetails(id).subscribe((data) => {
      console.log(data);
      data.hits.forEach((hit) => {
        const fields = hit.fields;
        const found = this.users.find((user) => user.consumerId === fields.CNSMR_ID);
        if (found) {
          found.firstName = fields.FIRST_NAME;
          found.lastName = fields.LAST_NAME;
          found.email = fields.EMAIL_ADDRESS;
          found.phone = fields.CNSMR_HOME_PHONE_NBR;
          found.consumerId = fields.CNSMR_ID;
          found.loyaltyID = fields.CNSMR_LOYALTY_NUMBER;
          found.loyaltyTier = fields.CNSMR_LOYALTY_TIER;
          found.addressLine = fields.CNSMR_ADDRESS_LINE1;
          found.genderCode = fields.CNSMR_GENDER_CODE;
          found.prefixCode = '';
          found.middleName = fields.CNSMR_MIDDLE_NAME;
          found.addressName = '';
          found.addressCityName = '';
          found.emailTypeCode = '';
          found.phoneId = '';
          found.phoneNumber = fields.CNSMR_PHONE_NBR;
        }
      });
    });
  }
}
