export interface Post {
    id: number,
    image: string,
    description: string,
    user: {
        id: number,
        pseudo: string,
        avatar: string,
    },
    date: string
}

export interface Post2 {
    id: number,
    image: string,
    description: string,
    user: string
}

export interface Like {
    id: number,
    total: number,
    postShare: string
}

export interface Book {
    author: string,
    name: string
}

export interface User {
    firstname: string,
    lastname: string
}

export interface Token {
    token: string;
}

export interface Profile {
    avatar: string;
    email: string;
    pseudo: string;
    id: number;
}

export interface PostArray {
    "hydra:member": [Post];
}

export interface CommentArray {
    "hydra:member": [Comment2];
}

export interface LikeArray {
    "hydra:member": [Like];
}

export interface Comment {
    content: string,
    date: string,
    user: string,
    postShare: string
}

export interface Comment2 {
    content: string,
    date: string,
    user: {
        id: number,
        pseudo: string,
        avatar: string
    },
    post_share?: {
        id: number
    }
}

export interface idealBibli {
    id?: number,
    book1: string,
    book2: string,
    book3: string,
    book4: string,
    book5: string,
    user: string,
}

export interface IdealBibliArray {
    "hydra:member": [];
}
