import { GlobalContext } from '@providers/GlobalContextProvider'
import React, { useContext } from 'react'

const Edit = () => {
  const {dispatch} = useContext(GlobalContext)
  return (
    <button onClick={()=> dispatch({type: 'SET_EDIT'})}>Edit</button>
  )
}

export default Edit