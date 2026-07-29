import { Link } from 'react-router-dom';
export default function ProductCard({ product }) {
  return <Link to={`/product/${product._id}`} className="group block text-gray-700">
    <div className="overflow-hidden bg-[#f8f5f2]"><img src={product.image[0]} alt={product.name} className="aspect-[3/4] w-full object-cover transition duration-300 group-hover:scale-105" /></div>
    <p className="min-h-10 pt-3 text-xs leading-5 sm:text-sm">{product.name}</p><p className="pt-1 text-sm font-medium">₹{product.price}</p>
  </Link>;
}
