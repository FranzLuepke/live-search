import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Response } from "../models/response";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    url = '';
    username = '';
    password = '';

    constructor(private httpClient: HttpClient) {}

    search(value: string) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`)
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
      const post = this.httpClient.post<Response>(this.url, JSON.stringify(body), { headers });
      console.log(post);
      return post;
    }

    getResponse(): Observable<Response> {
      return this.httpClient.get<Response>('https://livesearchapi.azure-api.net/api/index/intranet_persistence/test');
    }
}