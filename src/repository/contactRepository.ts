import db from "../db";

interface Contact{
    fname: string;
    lname: string;
    email: string;
    mobileNo: string;
    message: string;
}

export const contactUser = async(contact:Contact):Promise<void> =>{
    await db('contact').insert(contact)
}