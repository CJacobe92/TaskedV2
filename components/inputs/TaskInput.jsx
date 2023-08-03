'use client'

import { GlobalContext } from '@providers/GlobalContextProvider'
import { fetchCreateTask } from '@services/ApiFetch'
import { useSession } from 'next-auth/react'
import React, { useContext, useState } from 'react'

const TaskInput = ({category}) => {

  const [formData, setFormData] = useState({name: null})
  const { dispatch } = useContext(GlobalContext)
  const { data: session } = useSession();

  const handleSubmit = async(e) => {
    if(e.key === 'Enter'){
      await fetchCreateTask(session, formData.name, category.id)
      dispatch({type: 'REFETCH'})
    }
  }
  return (
    <input 
      onKeyDown={handleSubmit}
      onChange={(e) => setFormData({...formData, name: e.target.value})}
      type='text'
      placeholder='Add new task' 
      className='w-full m-2 border-b border-orange-700 outline-none'/>    
  )
}

export default TaskInput