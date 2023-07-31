export class Player {
    mail: string;
    username: string;
    passwd: string;

    constructor(mail: string, username: string, passwd:string) {
        this.mail = mail;
        this.username = username;
        this.passwd = passwd;
    }
}