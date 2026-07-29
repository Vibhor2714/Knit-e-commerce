import { useContext } from 'react'
import Hero from "../components/Hero";
import { StoreContext } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import Title from '../components/Title';

const Home = () => {
  const { products } = useContext(StoreContext)
  return (
    <div>
      <Hero />
      <section className="pt-16"><Title first="LATEST" second="COLLECTIONS" /><p className="mx-auto max-w-2xl text-center text-sm text-gray-500">Discover wardrobe essentials designed for every day.</p><div className="grid grid-cols-2 gap-x-4 gap-y-7 pt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">{products.slice(0, 10).map((product) => <ProductCard key={product._id} product={product} />)}</div></section>
      <section className="pt-20"><Title first="BEST" second="SELLERS" /><div className="grid grid-cols-2 gap-x-4 gap-y-7 pt-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">{products.filter((product) => product.bestseller).slice(0, 10).map((product) => <ProductCard key={product._id} product={product} />)}</div></section>
    </div>
  )
}

export default Home
