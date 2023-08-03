import GlobalContextProvider, { GlobalContext } from '@providers/GlobalContextProvider'
import NextAuthProvider from '@providers/NextAuthProvider'
import '@styles/globals.css'

export const metadata = {
  title: 'Tasked!',
  description: 'One tasked to rule them all'
}

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <GlobalContextProvider>
         <html lang="en">
          <body>{children}</body>
        </html>
      </GlobalContextProvider>
    </NextAuthProvider>
  )
}
