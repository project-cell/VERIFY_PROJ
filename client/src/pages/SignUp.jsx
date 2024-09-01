import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function SignUp() {
  const[formData,setFormData] =useState({});
  const[error,setError] =useState(null);
  const[loading,setLoading] =useState(false);
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  }
  //console.log(formData);
  const handleSubmit= async(e)=>{
    e.preventDefault();//no refreshing
    try{
      setLoading(true);
      const res = await fetch('/backend/auth/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if(data.success==false){
        setError(true);
        return;
        }    
      
    }catch(error){
      setLoading(false);
      setError(true);
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl text-pretty text-center text-emerald-950 font-bold '> Sign Up </h1>
      <form onSubmit={handleSubmit} className ='flex flex-col gap-4'>
        <input type = "text"
        placeholder = 'Username'
        id='username' 
        className='bg-slate-200 p-3 rounded-lg' 
        onChange={handleChange}/>

        <input type="email" 
        placeholder='Email'
        id='email' 
        className='bg-slate-200 p-3 rounded-lg'
        onChange={handleChange}/>

        <input type="password" 
        placeholder='Password'
        id='password' 
        className='bg-slate-200 p-3 rounded-lg'
        onChange={handleChange}/>

        <button disabled={loading} 
        className='bg-lime-200 text-black font-medium text-center p-3 rounded-lg uppercase hover:opacity-60 outline-lime-500 disabled:opacity-80 gap-4' >
        {loading?'Loading... ': 'Sign Up'} </button>
      </form>
      <div className='flex  gap-2 mt-5'>
        <p className='text-pretty text-slate-950 font-medium text-right
        '> Already have an acoount?</p>
        <Link to="/sign-in" className='text-emerald-950 font-bold text-right'>
        <span className='text-violet-500 '>Sign in</span></Link>
        
      </div>
      <p className='text-red-700 text-ellipsis font-bold mt-2'> {error && 'Something went wrong'}</p>
      
    </div>
  )

}
