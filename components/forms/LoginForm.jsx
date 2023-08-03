'use client'
import React, { useState } from 'react'
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginForm = () => {
  const [formData, setFormData] = useState({email:'', password:''})
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await signIn('login', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      if (!response.error) { 
        console.log('Login success')
        router.push('/timeline')
      } else {
        console.error('Login failed')
      }
    } catch (error) {
      console.error(error.message)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className='mainForm'>
      <div className='mainForm__group'>
        <h1 className='mainForm__title'>Tasked!</h1>
        <p className='mainForm__pitch'>Sign in to your account</p>
        <p className='mainForm__link'>Don't have an account? <Link href={'/register'} className='text-orange-700'>Register</Link></p>
      </div>
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
        <button type='submit'>Login</button>
      </div>
      <div className='mainForm__group'>
        <p className='privacy__terms'>By signing in you agree with our privacy terms and conditions.</p>
      </div>
    </form>
  )
}

export default LoginForm