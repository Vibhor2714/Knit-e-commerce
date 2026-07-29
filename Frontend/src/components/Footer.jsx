import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
export default function Footer() {
  return <footer className="mt-24 border-t pt-12 text-sm text-gray-600"><div className="grid gap-10 sm:grid-cols-3"><div><img className="mb-5 w-32" src={assets.logo} alt="Forever" /><p className="max-w-sm leading-6">Everyday fashion, thoughtfully selected. Shop comfortably with secure checkout and easy returns.</p></div><div><h3 className="mb-4 font-semibold text-gray-800">COMPANY</h3><div className="flex flex-col gap-2"><Link to="/">Home</Link><Link to="/collection">Collection</Link><Link to="/about">About us</Link><Link to="/contact">Contact</Link></div></div><div><h3 className="mb-4 font-semibold text-gray-800">GET IN TOUCH</h3><p>+91 98765 43210</p><p className="mt-2">support@forever.store</p></div></div><p className="mt-12 border-t py-5 text-center text-xs">© 2026 Forever Store. All rights reserved.</p></footer>;
}
