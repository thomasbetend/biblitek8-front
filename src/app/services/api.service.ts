import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { PostArray } from '../typings';
import { PostModel } from '../models/post.model';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    baseURL: string = "http://localhost:8000/api";
    token? = localStorage.getItem('token');

    constructor(private http: HttpClient) { 
    }

    getPostsList() {
        return this.http.get(`${this.baseURL}/post_shares.json`)
    }

    getPostsByUserId(id: number) {
        let httpParams = new HttpParams();
        if (id) {
            httpParams = httpParams.set('id', id);
        }
        //return this.http.get(`${this.baseURL}/post_shares`, {params: httpParams})
        return this.http.get<PostArray>(`${this.baseURL}/post_shares?page=1&user=${id}`);
        //http://localhost:8000/api/post_shares?page=1&user=1
    }

    getPostsByPostId(id: number) {
        return this.http.get<PostArray>(`${this.baseURL}/post_shares/${id}`);
    }

    deletePost(id: number) {
        return this.http.delete(`${this.baseURL}/post_shares/${id}`)
    }

    addPost(post: PostModel) {
        const headers = {'content-type': 'application/json'}  
        const body=JSON.stringify(post);
        console.log('body', body);
        return this.http.post(`${this.baseURL}/post_shares.json`, body, {'headers': headers});
    }

    getCommentsByPostId(id: number) {
        return this.http.get(`${this.baseURL}/comments/id`);
    }

}
