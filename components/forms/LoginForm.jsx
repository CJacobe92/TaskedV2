'use client'
import React, { useState } from 'react'
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from 'next/navigation';

const LoginForm = () => {
  const [formData, setFormData] = useState({email:'', password:''})
  const router = useRouter()
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await signIn('login', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      if (!response.error) { 
        router.push('/dashboard')
      } else {
        console.error(response.error)
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
        <button type='submit'>Sign in</button>
      </div>
    </form>
  )
}

export default LoginForm