export class User {
    id?: string;
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
    loyaltyID?: string;
    loyaltyTier?: string;

    constructor(
        id: string,
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
        loyaltyID: string,
        loyaltyTier: string,
    ) {
        this.id = id;
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
        this.loyaltyID = loyaltyID;
        this.loyaltyTier = loyaltyTier;
    }
}
