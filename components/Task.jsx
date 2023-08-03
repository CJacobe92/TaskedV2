'use client'

import React, { useContext, useState } from 'react'
import { GlobalContext } from '@providers/GlobalContextProvider'
import { fetchUpdateTask } from '@services/ApiFetch'
import { useSession } from 'next-auth/react'
import CompletedBtn from './buttons/CompletedBtn'
import DiscardBtn from './buttons/DiscardBtn'
import UrgentBtn from './buttons/UrgentBtn'

const Task = ({task, taskIndex}) => {

	const { state, dispatch } = useContext(GlobalContext)
	const { data: session } = useSession();
	const [formData, setFormData] = useState({name: null, category_id: null, task_id: null})

	const handleSubmit = async(e) => {
			if(e.key === 'Enter'){
				await fetchUpdateTask(session, formData.name, formData.category_id, formData.task_id)
				dispatch({type: 'REFETCH'})
			}
	}
  return (
    <>
			<div className='flex flex-row justify-between' key={taskIndex}>
				<div className='flex w-full p-1'>
						<p className='m-2'>{taskIndex + 1}.</p>
						<input 
							onKeyDown={handleSubmit}
							onChange={(e)=> setFormData({...formData, name: e.target.value, category_id: task.category_id, task_id: task.id})}
							className={`w-full m-1 border-b outline-none p-1 ${!state.edit ? 'border-black select-none' : 'border-orange-700 bg-orange-100'}`}  
							defaultValue={task && task.name} disabled={!state.edit ? true : false}/>
				</div>
				<div className='flex'>
						<UrgentBtn />
						<CompletedBtn />
						<DiscardBtn task={task}/>
				</div>
			</div>
    </>            
  )
}

export default Task