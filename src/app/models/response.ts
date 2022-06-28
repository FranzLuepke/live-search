import { User } from "./user";

export interface Response {
    hits: User[];
    total_hits: number;
}