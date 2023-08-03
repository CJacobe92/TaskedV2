
import React from 'react'
import Edit from './buttons/Edit'

const Category = ({category}) => {
 
  return (
    <div className='flex flex-row items-center justify-between w-full p-2 text-white bg-orange-700'>
      <p>{category.name}</p>
    </div>
  )
}

export default Category