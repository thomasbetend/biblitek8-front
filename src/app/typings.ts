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
