import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";

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

  userWasEmitted(users: User[]) {
    this.dataSource = users;
  }

  public async goBack() {
    await this.router.navigate(['home']);
  }
}
