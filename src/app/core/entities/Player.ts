export class Player {
    id: number;
    mail: string;
    username: string;
    bestScore: number;

    constructor(id: number, mail: string, username: string, passwd:string, bestScore: number) {
        this.id = id;
        this.mail = mail;
        this.username = username;
        this.bestScore = bestScore;
    }
}