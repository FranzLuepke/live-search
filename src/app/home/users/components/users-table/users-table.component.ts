import { Component, Input } from "@angular/core";
import { User } from "src/app/models/user";

const USERS_DATA: User[] = [];

@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  @Input() dataSource = USERS_DATA;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'consumerId',
  ];
}
