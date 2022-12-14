import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL: string = "http://localhost:8000/api";

  constructor(private http: HttpClient) { }


    getPostsList() {
        return this.http.get(`${this.baseURL}/posts.json`)
    }

    /* getActorsByName(lastname: string) {
        let params = new HttpParams();
        if (lastname) {
            params = params.set('lastname', lastname);
        }
        return this.http.get(`${this.baseURL}/special_actors?${lastname}`)
    }

    deleteActor(id: number) {
        return this.http.delete(`${this.baseURL}/special_actors/${id}`)
    } */

    /* addActor(actor: Actor) {
        const headers = {'content-type': 'application/json'}  
        const body=JSON.stringify(actor);
        console.log(body)
        return this.http.post(`${this.baseURL}/special_actors.json`, body,{'headers': headers})
    } */
}
