export class UserResponse {
    FIRST_NAME: string;
    LAST_NAME: string;
    EMAIL_ADDRESS: string;
    CNSMR_HOME_PHONE_NBR: string;
    CNSMR_ID: string;

    constructor(
        FIRST_NAME: string,
        LAST_NAME: string,
        EMAIL_ADDRESS: string,
        CNSMR_HOME_PHONE_NBR: string,
        CNSMR_ID: string,
    ) {
        this.FIRST_NAME = FIRST_NAME;
        this.LAST_NAME = LAST_NAME;
        this.EMAIL_ADDRESS = EMAIL_ADDRESS;
        this.CNSMR_HOME_PHONE_NBR = CNSMR_HOME_PHONE_NBR;
        this.CNSMR_ID = CNSMR_ID;
    }
}