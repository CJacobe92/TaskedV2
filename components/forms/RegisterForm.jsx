'use client'
import React, { useState } from 'react'
import { signIn, useSession } from "next-auth/react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({email:'', password:'', password_confirmation: ''})
  const { data: session } = useSession()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await signIn('login', {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        redirect: false
      })

      if (response) { 
        router.push('/dashboard')
      } else {
        console.log('Login failed')
      }
    } catch (error) {
      console.error(error.message)
    }
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
        <label htmlFor="password">Confirm Password</label>
        <input
          onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
          value={formData.password_confirmation}
          type="password" 
          name="password_confirmation" 
          id="password_confirmation" />
      </div>
      <div className='mainForm__group'>
        <button type='submit'>Sign in</button>
      </div>
    </form>
  )
}

export default RegisterForm