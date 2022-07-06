export class UserResponse {
    FIRST_NAME: string;
    LAST_NAME: string;
    EMAIL_ADDRESS: string;
    CNSMR_HOME_PHONE_NBR: string;
    CNSMR_ID: string;
    CNSMR_GENDER_CODE: string;
    CNSMR_MIDDLE_NAME: string;
    CNSMR_ADDRESS_LINE1: string;
    CNSMR_PHONE_NBR: string;
    CNSMR_LOYALTY_NUMBER: string;
    CNSMR_LOYALTY_TIER: string;

    constructor(
        FIRST_NAME: string,
        LAST_NAME: string,
        EMAIL_ADDRESS: string,
        CNSMR_HOME_PHONE_NBR: string,
        CNSMR_ID: string,
        CNSMR_GENDER_CODE: string,
        CNSMR_MIDDLE_NAME: string,
        CNSMR_ADDRESS_LINE1: string,
        CNSMR_PHONE_NBR: string,
        CNSMR_LOYALTY_NUMBER: string,
        CNSMR_LOYALTY_TIER: string,
    ) {
        this.FIRST_NAME = FIRST_NAME;
        this.LAST_NAME = LAST_NAME;
        this.EMAIL_ADDRESS = EMAIL_ADDRESS;
        this.CNSMR_HOME_PHONE_NBR = CNSMR_HOME_PHONE_NBR;
        this.CNSMR_ID = CNSMR_ID;
        this.CNSMR_GENDER_CODE = CNSMR_GENDER_CODE;
        this.CNSMR_MIDDLE_NAME = CNSMR_MIDDLE_NAME;
        this.CNSMR_ADDRESS_LINE1 = CNSMR_ADDRESS_LINE1;
        this.CNSMR_PHONE_NBR = CNSMR_PHONE_NBR;
        this.CNSMR_LOYALTY_NUMBER = CNSMR_LOYALTY_NUMBER;
        this.CNSMR_LOYALTY_TIER = CNSMR_LOYALTY_TIER;
    }
}