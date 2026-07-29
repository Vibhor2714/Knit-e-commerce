import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
const Login = () => {
  const { setUser } = useContext(StoreContext); const [name, setName] = useState(''); const [email, setEmail] = useState(''); const navigate = useNavigate();
  const submit = (e) => { e.preventDefault(); setUser({ name: name || email.split('@')[0], email }); navigate('/'); };
  return (
    <form onSubmit={submit} className="mx-auto my-16 max-w-md border p-8"><h1 className="text-center text-2xl">LOGIN / <span className="font-semibold">CREATE ACCOUNT</span></h1><p className="mt-3 text-center text-sm text-gray-500">Use any name and email to start shopping.</p><input value={name} onChange={(e) => setName(e.target.value)} className="mt-7 w-full border p-3" placeholder="Name (optional)" /><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-3 w-full border p-3" placeholder="Email address" /><input required type="password" className="mt-3 w-full border p-3" placeholder="Password" /><button className="mt-5 w-full bg-black py-3 text-sm text-white">CONTINUE</button></form>
  )
}
export default Login
