export class User {
    consumerId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    genderCode?: string;
    prefixCode?: string;
    middleName?: string;
    addressName?: string;
    addressCityName?: string;
    addressLine?: string;
    emailTypeCode?: string;
    phoneId?: string;
    phoneNumber?: string;

    constructor(
        consumerId: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        genderCode: string,
        prefixCode: string,
        middleName: string,
        addressName: string,
        addressCityName: string,
        addressLine: string,
        emailTypeCode: string,
        phoneId: string,
        phoneNumber: string,
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.consumerId = consumerId;
        this.genderCode = genderCode;
        this.prefixCode = prefixCode;
        this.middleName = middleName;
        this.addressName = addressName;
        this.addressCityName = addressCityName;
        this.addressLine = addressLine;
        this.emailTypeCode = emailTypeCode;
        this.phoneId = phoneId;
        this.phoneNumber = phoneNumber;
    }
}
