export class PostModel {
    id: number | undefined;
    image: string | undefined;
    description: string | undefined;
    user?: {
        id: number | undefined;
    };
    date: string | undefined;
}
