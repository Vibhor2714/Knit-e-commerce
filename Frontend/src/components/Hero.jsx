import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className="flex flex-col-reverse overflow-hidden bg-[#f5eee7] sm:flex-row">
      <div className="flex w-full flex-col items-start justify-center px-6 py-10 sm:w-1/2 sm:px-16 sm:py-14"><p className="mb-3 flex items-center gap-2 text-xs font-medium tracking-[.16em] before:h-[2px] before:w-8 before:bg-gray-700 sm:text-sm sm:tracking-[.2em]">OUR BESTSELLERS</p><h1 className="font-serif text-3xl leading-tight sm:text-5xl">Latest Arrivals</h1><Link to="/collection" className="mt-6 flex items-center gap-2 text-xs font-semibold tracking-widest underline underline-offset-8 sm:mt-7 sm:text-sm">SHOP NOW →</Link></div>
      <img src={assets.hero_img} alt="New fashion collection" className="w-full object-cover sm:w-1/2" />
    </div>
  )
}

export default Hero
