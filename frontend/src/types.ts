import { any } from "zod"

export type INewUser = {
    name: string,
    email: string,
    username: string,
    password: string
}

export type BgTypes = {
    id: any,
    innit: any,

}