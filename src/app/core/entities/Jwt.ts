import { Player } from "./Player";

export interface Jwt {
    exp: number,
    iat: number,
    iss: string,
    scope: string,
    sub: string,
    player: Player
}