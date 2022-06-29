import { UserResponse } from "./userResponse";

export interface Response {
    hits: {
        fields: UserResponse[];
    }
    total_hits: number;
}