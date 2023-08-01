import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
    pages: {
        signIn: '/login',
    },
    session: {strategy: 'jwt'},
    providers:[
        CredentialsProvider({
            id: 'login',
            name: 'credentials',
            authorize: async(credentials) => {
                // const baseURL = "http://localhost:3000/api/v1/auth"
                const baseURL = "https://plannerapi.onrender.com/api/v1/auth"
                const payload = {
                    email: credentials.email,
                    password: credentials.password
                }

                const response = await axios.post(baseURL, {"auth": payload})
                const user = {
                    uid: response.headers.get('Uid'),
                    token: response.headers.get('Authorization')
                }
                if (user) {   
                    return user
                } else {
                    return null
                }
            }
        }),
        CredentialsProvider({
            id: 'register',
            name: 'credentials',
            authorize: async(credentials) => {
                // const baseURL = `http://localhost:3000/api/v1/users`
                const baseURL = "https://plannerapi.onrender.com/api/v1/auth"
                const payload = {
                    email: credentials.email,
                    password: credentials.password,
                    password_confirmation: credentials.password_confirmation
                }

                const response = await axios.post(baseURL, {"user": payload})
                const user = {
                    uid: response.headers.get('Uid'),
                    token: response.headers.get('Authorization')
                }
                if (user) {   
                    return user
                } else {
                    return null
                }
            }
        }
    )],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.user = user
            }
            return token
        },
        async session({session, token}) {
            session.user = token.user;
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET
})

export {handler as POST, handler as GET}