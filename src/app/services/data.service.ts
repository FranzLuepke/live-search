import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Response } from "../models/response";
import { User } from "../models/user";
import * as env from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  liveSearch(type: string, value: string) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${env.environment.auth.username}:${env.environment.auth.password}`)
  }
  let field = '';
    if (type === 'firstName') {
      field = 'FIRST_NAME';
    } else if (type === 'lastName') {
      field = 'LAST_NAME';
    } else {
      field = '_all';
    }
    const body = {
      "query" : {
        "field": field,
        "prefix": value
      },
      "size": 10,
      "from": 0,
      "fields" : ["*"],
      "explain": false,
      "highlight": {}
    };
    console.log(body);
    return this.httpClient.post<Response>(env.environment.endpoint, JSON.stringify(body), { headers });
  }

  manualSearch(user: User) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${env.environment.auth.username}:${env.environment.auth.password}`)
    }
    const body = {
      "query" : {
        "disjuncts": [
          {
            "field": "CNSMR_ID",
            "match": user?.consumerId
          },
          {
            "field": "CNSMR_PHONE_NBR",
            "match": user?.phone
          },
          {
            "field": "EMAIL_ADDRESS",
            "match": user?.email
          },
          {
            "field": "FIRST_NAME",
            "match": user?.firstName
          },
          {
            "field": "LAST_NAME",
            "match": user?.lastName
          }
        ]
      },
      "size": 10,
      "from": 0,
      "fields" : ["*"],
      "explain": false,
      "highlight": {}
    };
    console.log(body);
    return this.httpClient.post<Response>(env.environment.endpoint, JSON.stringify(body), { headers });
  }

  getMoreDetails(id: string) {
    const headers = {
      'Content-Type': 'application/json',
    }
    const body = { id };
    console.log(body);
    return this.httpClient.post<Response>("http://127.0.0.1:8091/user-detail", JSON.stringify(body), { headers });
  }
}