import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Post } from '../typings';
import { PostModel } from '../models/post.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    baseURL: string = "http://localhost:8000/api";

    constructor(private http: HttpClient) { }

    getPostsList() {
        return this.http.get(`${this.baseURL}/post_shares.json`)
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

    addPost(post: PostModel) {
        const headers = {'content-type': 'application/json'}  
        const body=JSON.stringify(post);
        console.log(body)
        return this.http.post(`${this.baseURL}/post_shares.json`, body, {'headers': headers})
    }
}
