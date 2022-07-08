import { UserResponse } from "./userResponse";

export interface Response {
    hits: Hit[];
    total_hits: number;
    content?: UserResponse;
}

export interface Hit {
    id: string;
    fields: UserResponse;
}