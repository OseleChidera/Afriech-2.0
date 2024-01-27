'use server'
 
import { redirect } from 'next/navigation' 

export async function checkIfUserIsloggedIn(userID) {
    if (userID !== null) redirect('/home', 'replace');
    else redirect('/home');
}


export async function redirectTo(path) {
    redirect(`/${path}`);
}

export async function redirectToNested(path) {
    redirect(path);
}


export async function showModal(doc) {
    console.log('showModal ', doc)
}