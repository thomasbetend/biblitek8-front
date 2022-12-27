export interface Post {
    id: number,
    image: string,
    description: string,
    user: {
        id: number,
        pseudo: string,
        avatar: string,
    }
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
