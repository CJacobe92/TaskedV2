import { GlobalContext } from '@providers/GlobalContextProvider';
import { fetchDeleteTask } from '@services/ApiFetch';
import { useSession } from 'next-auth/react'
import React, { useContext } from 'react'

const DiscardBtn = ({task}) => {
  const { data:session } = useSession();
  const { dispatch } = useContext(GlobalContext);
  
  const handleDelete = async() => {
    await fetchDeleteTask(session, task.category_id, task.id)
    dispatch({type: 'REFETCH'})
  }
  
  return (
    <button onClick={handleDelete} className='task__btn'>Discard</button>
  )
}

export default DiscardBtn