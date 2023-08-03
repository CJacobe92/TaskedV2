'use client'

import React, { useContext } from 'react'
import Task from './Task'
import { GlobalContext } from '@providers/GlobalContextProvider'
import Category from './Category'
import TaskInput from './inputs/TaskInput'
import New from './buttons/New'
import Edit from './buttons/Edit'

const Urgent = () => {
  const {state} = useContext(GlobalContext)
  const data = state.data
  return (
    <div className='bg-teal-100 h-[92vh] w-full overflow-y-auto'>
      <div className='flex flex-row justify-between w-full p-4'>
        <h1 className='text-2xl'>Timeline</h1>
        <Edit />
      </div>
      {
        data && data.categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className='m-4 bg-white border border-black'>
            <Category category={category}/>
              {category.tasks && category.tasks.length === 0 ? 
                <div className='flex flex-row px-2'>
                  <TaskInput category={category}/>
                  <New />
                </div>: 
                <>
                  {category && 
                    category.tasks.filter((task) => !task.completed && task.urgent).map((task, taskIndex) => (
                      <div key={taskIndex}><Task task={task} taskIndex={taskIndex }/></div>
                  ))}
                  {state.edit ?  
                    <div className='flex flex-row px-2 m-1'>
                      <TaskInput category={category}/>
                      <New />
                    </div>:
                    null
                  }
                 
                </>
              }
          </div>
        ))
      }
    </div>
  )
}

export default Urgent