
import { Link } from 'react-router-dom';


export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='text-3xl text-pretty text-center text-emerald-950 font-bold '> Sign Up </h1>
      <form className ='flex flex-col gap-4'>
        <input type = "text" placeholder = 'Username' id='username' className='bg-slate-200 p-3 rounded-lg'/>
        <input type="email" placeholder='Email'id='email' className='bg-slate-200 p-3 rounded-lg'/>
        <input type="password" placeholder='Password'id='password' className='bg-slate-200 p-3 rounded-lg'/>
        <button className='bg-lime-200 text-black font-medium text-center p-3 rounded-lg uppercase hover:opacity-60 outline-lime-500 disabled:opacity-80 gap-4
        ' >
        Sign Up</button>
      </form>
      <div className='flex  gap-2 mt-5'>
        <p className='text-pretty text-slate-950 font-medium text-right
        '> Already have an acoount?</p>
        <Link to="/sign-in" className='text-emerald-950 font-bold text-right'>
        <span className='text-violet-500 '>Sign in</span></Link>
        
      </div>
      
    </div>
  )
}
