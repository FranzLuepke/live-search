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

    search(value: string) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${env.environment.auth.username}:${env.environment.auth.password}`)
    }
      const body = {
        "query" : {
          "field": "_all",
          "prefix": value
        },
        "size": 1,
        "from": 0,
        "fields" : ["*"],
        "explain": false,
        "highlight": {}
      };
      console.log(body);
      return this.httpClient.post<Response>(env.environment.endpoint, JSON.stringify(body), { headers });
    }

    getMoreDetails(consumerId: string) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${env.environment.auth.username}:${env.environment.auth.password}`)
    }
      const body = {
        "query" : {
          "field": "_all",
          "prefix": consumerId
        },
        "size": 1,
        "from": 0,
        "fields" : ["*"],
        "explain": false,
        "highlight": {}
      };
      console.log(body);
      return this.httpClient.post<Response>(env.environment.endpoint+'/detail', JSON.stringify(body), { headers });
    }
}