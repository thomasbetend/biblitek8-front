export class CommentModel {
    content?: string;
    date?: string;
    user?: {
        id: number | undefined;
    };
    postShare?: {
        id: number | undefined;
    };
}

