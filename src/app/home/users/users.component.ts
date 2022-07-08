import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Hit } from "src/app/models/response";
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

  userWasEmitted(hits: Hit[]) {
    const newUsers: User[] = [];
    hits.forEach((hit) => {
      newUsers.push({
        id: hit.id,
        firstName: hit.fields?.FIRST_NAME,
        lastName: hit.fields?.LAST_NAME,
        email: hit.fields?.EMAIL_ADDRESS,
        phone: hit.fields?.CNSMR_HOME_PHONE_NBR,
        consumerId: hit.fields?.CNSMR_ID,
        loyaltyID: hit.fields?.CNSMR_LOYALTY_NUMBER,
        loyaltyTier: hit.fields?.CNSMR_LOYALTY_TIER,
        addressLine: hit.fields?.CNSMR_ADDRESS_LINE1,
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
    console.log(id);
    this.dataService.getMoreDetails(id).subscribe((data) => {
      console.log(data);
      // data.hits.forEach((hit) => {
        const fields = data.content ?? data.hits[0].fields;
        const found = this.users.find((user) => user.consumerId === fields.CNSMR_ID);
        if (found) {
          // found.id = hit.id;
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
      // });
    });
  }
}
