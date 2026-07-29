import { assets } from '../assets/assets';
import Title from '../components/Title';
const About = () => {
  return (
    <div className="pt-10"><Title first="ABOUT" second="US" /><div className="mt-8 flex flex-col gap-10 md:flex-row"><img src={assets.about_img} className="max-w-full md:w-1/2" alt="About Forever" /><div className="flex flex-col justify-center gap-5 text-sm leading-6 text-gray-600"><p>Forever was created to make everyday style easy, expressive and accessible. We curate quality essentials that feel good to wear and are simple to shop.</p><p>From discovery to delivery, we focus on a reliable, customer-first experience.</p><h2 className="pt-3 font-semibold text-gray-800">OUR MISSION</h2><p>To make modern fashion more approachable through honest pricing, dependable quality and thoughtful service.</p></div></div></div>
  )
}
export default About
