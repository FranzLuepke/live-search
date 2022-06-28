export class User {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    consumerId?: string;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        consumerId: string,
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.consumerId = consumerId;
    }
}