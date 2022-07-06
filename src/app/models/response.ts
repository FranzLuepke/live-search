import { UserResponse } from "./userResponse";

export interface Response {
    hits: Hit[];
    total_hits: number;
}

export interface Hit {
    id: string;
    fields: UserResponse;
}