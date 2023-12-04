import { ID } from "appwrite"; //CREATES A RANDOM ID FOR EACH NEW USER
import { INewUser } from "@/types";
import { account } from "./config";

export async function createUserAccount(user:INewUser){
    try{
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
    } catch (error){
        console.log(error)
        return error
    }
}