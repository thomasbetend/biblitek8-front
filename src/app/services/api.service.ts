import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { CommentArray, Post, PostArray } from '../typings';
import { PostModel } from '../models/post.model';
import { CommentModel } from '../models/comment.model';
import { LikeModel } from '../models/like.model';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    baseURL: string = "http://localhost:8000/api";
    token? = localStorage.getItem('token');

    constructor(private http: HttpClient) { 
    }

    getPostsList() {
        return this.http.get<PostArray>(`${this.baseURL}/post_shares?page=1&order%5Bdate%5D=desc`);
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

    getPostsByPostId2(id: number) {
        return this.http.get<Post>(`${this.baseURL}/post_shares/${id}`);
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
        return this.http.get<CommentArray>(`${this.baseURL}/comments?page=1&post_share=${id}`);
    }

    addComment(comment: CommentModel) {
        const headers = {'content-type': 'application/json'}  
        console.log('body', comment);
        return this.http.post(`${this.baseURL}/comments.json`, comment, {'headers': headers});
    }

    padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }

    formatDate(date: Date) {
        return (
            [
                date.getFullYear(),
                this.padTo2Digits(date.getMonth() + 1),
                this.padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
                this.padTo2Digits(date.getHours()),
                this.padTo2Digits(date.getMinutes()),
                this.padTo2Digits(date.getSeconds()),
            ].join(':')
        );
    }

    getLikesByPostId(postId: number) {
        return this.http.get(`${this.baseURL}/likes.json`);
    }

    addLikeOnPost(like: LikeModel) {
        const headers = {'content-type': 'application/json'}  
        console.log('body', like);
        return this.http.post(`${this.baseURL}/likes.json`, like, {'headers': headers});
    }

}
