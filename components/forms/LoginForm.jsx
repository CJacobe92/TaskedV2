'use client'
import React, { useState } from 'react'
import { signIn, useSession } from "next-auth/react";

const LoginForm = () => {
  const [formData, setFormData] = useState({email:'', password:''})

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signIn('login', {
      email: formData.email,
      password: formData.password,
      callbackUrl: `${window.location.origin}/dashboard`
    })
  }
  
  return (
    <form onSubmit={handleSubmit} className='mainForm'>
      <div className='mainForm__group'>
        <label htmlFor="email">Email</label>
        <input 
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          value={formData.email}
          type="email" 
          name="email" 
          id="email" />
      </div>
      <div className='mainForm__group'>
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          value={formData.password}
          type="password" 
          name="password" 
          id="password" />
      </div>
      <div className='mainForm__group'>
        <button type='submit'>Sign in</button>
      </div>
    </form>
  )
}

export default LoginForm