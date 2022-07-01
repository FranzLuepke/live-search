import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UsersTableComponent {
  @Input() dataSource: User[] = [];
  @Input() noRegistersFound = false;
  @Output() queryUserDetails = new EventEmitter<string>();
  columnsToDisplay = [
    'consumerId',
    'firstName',
    'lastName',
    'email',
    'phone',
  ];
  columnNames = [
    { key: 'consumerId', value: 'Consumer Id'},
    { key: 'firstName', value: 'First Name'},
    { key: 'lastName', value: 'Last Name'},
    { key: 'email', value: 'Email'},
    { key: 'phone', value: 'Phone'},
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: User | null = {};

  getColumnName(key: string) {
    return this.columnNames.find((name) => name.key === key)?.value;
  }

  expandElement($event: MouseEvent, element: User) {
    this.expandedElement = this.expandedElement === element ? null : element;
    $event.stopPropagation()
    this.queryUserDetails.emit(element.consumerId);
  }
}
