import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { UserResponse } from "src/app/models/userResponse";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  dataSource: User[] = [];

  constructor(
    private router: Router,
  ) {}

  userWasEmitted(users: { fields: UserResponse; }[]) {
    const newUsers: User[] = [];
    users.forEach((response) => {
      newUsers.push({
        firstName: response.fields.FIRST_NAME,
        lastName: response.fields.LAST_NAME,
        email: response.fields.EMAIL_ADDRESS,
        phone: response.fields.CNSMR_HOME_PHONE_NBR,
        consumerId: response.fields.CNSMR_ID
      });
    });
    console.log(newUsers);
    this.dataSource = newUsers;
  }

  public async goBack() {
    await this.router.navigate(['home']);
  }
}
