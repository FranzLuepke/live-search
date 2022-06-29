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

  userWasEmitted(users: UserResponse[]) {
    const newUsers: User[] = [];
    users.forEach((user) => {
      newUsers.push({
        firstName: user.FIRST_NAME,
        lastName: user.LAST_NAME,
        email: user.EMAIL_ADDRESS,
        phone: user.CNSMR_HOME_PHONE_NBR,
        consumerId: user.CNSMR_ID
      });
    });
    console.log(newUsers);
    this.dataSource = newUsers;
  }

  public async goBack() {
    await this.router.navigate(['home']);
  }
}
