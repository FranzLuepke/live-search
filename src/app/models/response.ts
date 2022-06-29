import { UserResponse } from "./userResponse";

export interface Response {
    hits: UserResponse[];
    total_hits: number;
}