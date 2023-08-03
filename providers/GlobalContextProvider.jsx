'use client'

import { fetchUserData } from "@services/ApiFetch"
import { useSession } from "next-auth/react"
import { createContext, useEffect, useReducer } from "react"

export const GlobalContext = createContext(null)

const initialState = {
  data: null,
  edit: false,
  refetch: false,
  path: 'timeline'
}

const reducer = (state, action) => {
  switch(action.type){
    case 'SET_DATA':
      return {...state, data: action.payload};

    case 'SET_EDIT':
      return {...state, edit: !state.edit}

    case 'SET_PATH':
      return {...state, path: action.payload}

    case 'REFETCH':
      return {...state, refetch: true}

    case 'RESET_REFETCH':
      return {...state, refetch: false}

    default:
      return state;
  }
}

const GlobalContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {data: session} = useSession()
  
  useEffect(() => {
    const getData = async () => {
      if (session) {
        const userData = await fetchUserData(session);
        dispatch({ type: 'SET_DATA', payload: userData })
        dispatch({type: 'RESET_REFETCH'})
      }
    };
    getData();
  }, [session, useSession, state.refetch]);

  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider