import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const WrappedComponent = (Component) => {
  const WrappedLayout = (props) => {
    return(
      <div className="min-h-screen w-[100%] flex flex-col">
      <Header />
      <div className="flex flex-row h-[92vh]">
        <Sidebar />
        <Component {...props}/>
      </div>
    </div>
    )
  }
  return WrappedLayout
}

export default WrappedComponent