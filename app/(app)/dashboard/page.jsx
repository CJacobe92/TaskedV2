'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

const page = () => {
    const {data:session} = useSession();
    console.log(session && session.user.token)
  return (
    <div>Dashboard</div>
  )
}

export default page