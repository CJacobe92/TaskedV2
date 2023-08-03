'use client'
import React, { useState } from 'react'
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterForm = () => {
  const [formData, setFormData] = useState({email:'', password:'', password_confirmation: ''})
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await signIn('register', {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        redirect: false,
      })

      if (!response.error) { 
        console.log('Login success')
        router.push('/timeline')
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
        <h1 className='mainForm__title'>Tasked!</h1>
        <p className='mainForm__pitch'>Sign up for an account</p>
        <p className='mainForm__link'>Already have an account? <Link href={'/login'} className='text-orange-700'>Login</Link></p>
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
        <label htmlFor="password">Confirm Password</label>
        <input
          onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
          value={formData.password_confirmation}
          type="password" 
          name="password_confirmation" 
          id="password_confirmation" />
      </div>
      <div className='mainForm__group'>
        <button type='submit'>Register</button>
      </div>
      <div className='mainForm__group'>
        <p className='privacy__terms'>By signing up you agree with our privacy terms and conditions.</p>
      </div>
    </form>
  )
}

export default RegisterForm