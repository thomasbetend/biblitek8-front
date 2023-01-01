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
    "hydra:member": [];
}

export interface LikeArray {
    "hydra:member": [Like];
}

export interface Comment {
    content: "Je l'ai lu et je confirme",
    date: "2022-12-29T18:20:34.978Z",
    user: "/api/users/2",
    postShare: "/api/post_shares/19"
}
