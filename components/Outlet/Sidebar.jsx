'use client'
import Logout from '@components/buttons/Logout'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { usePathname } from 'next/navigation'
import { GlobalContext } from '@providers/GlobalContextProvider'

const Sidebar = () => {
  const {dispatch, state} = useContext(GlobalContext)

  const handleSelect = (path) => {
    dispatch({type: 'SET_PATH', payload: path})
    console.log(state.path)
  }
  
  return (
    <div className='flex flex-col items-center justify-between p-4 text-white bg-gray-800 w-44'>
      <div className='flex flex-col items-center justify-center w-full'>
        <Link onClick={() => handleSelect('timeline')} href={'/timeline'} className='m-2'>Timeline</Link>
        <Link onClick={() => handleSelect('urgent')} href={'/urgent'} className='m-2'>Urgent</Link>
      </div>
      <Logout />
    </div>
  )
}

export default Sidebar