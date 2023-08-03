import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    pages: {
        signIn: '/login',
    },
    session: {strategy: 'jwt'},
    providers:[
        CredentialsProvider({
            id: 'login',
            name: 'credentials',
            authorize: async(credentials) => {
                const baseURL = `${process.env.API_URL}/auth`
                const payload = {
                    email: credentials.email,
                    password: credentials.password
                }

                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({"auth": payload})
                }

                const response = await fetch(baseURL, requestOptions)
                
                if (response.ok) {
                  const user = {
                    uid: response.headers.get('Uid'),
                    token: response.headers.get('Authorization'),
                  };
                  return user;
                } else {
                  return null; // Return null for login failure
                }
            }
        }),
        CredentialsProvider({
            id: 'register',
            name: 'credentials',
            authorize: async(credentials) => {
                const baseURL = `${process.env.API_URL}/users`

                const payload = {
                    email: credentials.email,
                    password: credentials.password,
                    password_confirmation: credentials.password_confirmation
                }

                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({"users": payload})
                }

                const response = await fetch(baseURL, requestOptions)
                
                if (response.ok) {
                    const user = {
                      uid: response.headers.get('Uid'),
                      token: response.headers.get('Authorization'),
                    };
                    return user;
                  } else {
                    return null; // Return null for login failure
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
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}