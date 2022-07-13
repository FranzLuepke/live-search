import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Response } from "../models/response";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class DataService {
  url = "http://127.0.0.1:8091";

  constructor(private httpClient: HttpClient) {}

  liveSearch(type: string, value: string) {
    let field = '';
    if (type === 'firstName') {
      field = 'FIRST_NAME';
    } else if (type === 'lastName') {
      field = 'LAST_NAME';
    } else {
      field = '_all';
    }
    const headers = {
      'Content-Type': 'application/json',
    }
    const body = {
      field,
      value,
    };
    return this.httpClient.post<Response>(`${this.url}/live-search`, JSON.stringify(body), { headers });
  }

  manualSearch(user: User) {
    const headers = {
      'Content-Type': 'application/json',
    }
    const fields: {"field": string, "match": string}[] = [];
    if (user?.consumerId) {
      fields.push({
        "field": "CNSMR_ID",
        "match": user?.consumerId
      });
    }
    if (user?.phone) {
      fields.push({
        "field": "CNSMR_PHONE_NBR",
        "match": user?.phone
      });
    }
    if (user?.email) {
      fields.push({
        "field": "EMAIL_ADDRESS",
        "match": user?.email
      });
    }
    if (user?.firstName) {
      fields.push({
        "field": "FIRST_NAME",
        "match": user?.firstName
      });
    }
    if (user?.lastName) {
      fields.push({
        "field": "LAST_NAME",
        "match": user?.lastName
      });
    }
    const body = {
      fields: fields,
    };
    return this.httpClient.post<Response>(`${this.url}/manual-search`, JSON.stringify(body), { headers });
  }

  getMoreDetails(id: string) {
    const headers = {
      'Content-Type': 'application/json',
    }
    const body = { id };
    console.log(body);
    return this.httpClient.post<Response>(`${this.url}/user-detail`, JSON.stringify(body), { headers });
  }
}