import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Response } from "../models/response";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    // url = '/api/index/intranet_persistence';
    url = '';
    username = '';
    password = '';

    constructor(private httpClient: HttpClient) {}

    search(type: 'firstName' | 'lastName' | 'email' | 'phone' | 'consumerId', value: string) {
        const headers = {
            'Ocp-Apim-Subscription-Key': '92ed2d08af93477ebef8d5d2cdd02da8',
            'Ocp-Apim-Trace': 'true',
          }
          const body = {
            "query" :{
              "query" : "id: 060d4784-6195-447c-866b-44a2c7416bc8"
            },
            "size" : 200,
            "fields" : [{type: value}]
          };
          
          return this.httpClient.post<Response>(this.url, JSON.stringify(body), { headers });
    }

    searchUser(user: User) {
      const headers = {
        'Ocp-Apim-Subscription-Key': '92ed2d08af93477ebef8d5d2cdd02da8',
        'Ocp-Apim-Trace': 'true',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`)
      }

      let searchString = '';
      searchString += (user.firstName ? `"firstName": "${user.firstName}", ` : '');
      searchString += (user.lastName ? `"lastName": ${user.lastName}", ` : '');
      searchString += (user.email ? `"email": "${user.email}", ` : '');
      searchString += (user.phone ? `"phone": "${user.phone}", ` : '');
      searchString += (user.consumerId ? `"consumerId": "${user.consumerId}"` : '');

      console.log(searchString);

      const body = {
        "query" :{
          "query" : searchString
        },
        "size" : 200,
        "fields" : ["*"]
      };
      // const url = 'https://livesearchapi.azure-api.net/api/index/intranet_persistence/test';
      // const url = "http://10.17.134.107:8094/api/index/argo/query";
      // return this.httpClient.get<Response>('https://livesearchapi.azure-api.net/api/index/intranet_persistence/test');
      return this.httpClient.post<Response>(this.url, JSON.stringify(body), { headers });
  }

    getResponse(): Observable<Response> {
      return this.httpClient.get<Response>('https://livesearchapi.azure-api.net/api/index/intranet_persistence/test');
    }
}