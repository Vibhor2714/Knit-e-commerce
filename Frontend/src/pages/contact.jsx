import { assets } from '../assets/assets';
import Title from '../components/Title';
const Contact = () => {
  return (
    <div className="pt-10"><Title first="CONTACT" second="US" /><div className="mt-8 flex flex-col gap-10 md:flex-row"><img src={assets.contact_img} className="max-w-full md:w-1/2" alt="Contact Forever" /><div className="flex flex-col justify-center gap-4 text-sm text-gray-600"><h2 className="text-xl font-semibold text-gray-800">Visit Our Store</h2><p>123 Fashion Street<br/>New Delhi, India</p><p>+91 98765 43210<br/>support@forever.store</p><h2 className="mt-4 text-xl font-semibold text-gray-800">Careers at Forever</h2><p>We are always looking for creative people to join our team.</p><button className="mt-2 w-fit border border-black px-6 py-3 text-black">EXPLORE JOBS</button></div></div></div>
  )
}
export default Contact
