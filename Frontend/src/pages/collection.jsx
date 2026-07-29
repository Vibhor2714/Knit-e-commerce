import { useContext, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import Title from '../components/Title';
const Collection = () => {
  const { products } = useContext(StoreContext); const [params] = useSearchParams();
  const [category, setCategory] = useState('All'); const [sort, setSort] = useState('relevant');
  const shown = useMemo(() => products.filter((p) => (category === 'All' || p.category === category) && p.name.toLowerCase().includes((params.get('search') || '').toLowerCase())).sort((a,b) => sort === 'low' ? a.price-b.price : sort === 'high' ? b.price-a.price : 0), [products, category, sort, params]);
  return (
    <div className="pt-10"><Title first="ALL" second="COLLECTIONS" /><div className="mt-7 flex flex-col gap-5 border-y py-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-2">{['All','Men','Women','Kids'].map((item) => <button key={item} onClick={() => setCategory(item)} className={`border px-4 py-2 text-sm ${category === item ? 'bg-black text-white' : ''}`}>{item}</button>)}</div><select value={sort} onChange={(e) => setSort(e.target.value)} className="border px-3 py-2 text-sm"><option value="relevant">Sort by: Relevant</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option></select></div><p className="mt-5 text-sm text-gray-500">{shown.length} products found</p><div className="grid grid-cols-2 gap-x-4 gap-y-7 pt-6 sm:grid-cols-3 md:grid-cols-4">{shown.map((product) => <ProductCard key={product._id} product={product} />)}</div></div>
  )
}
export default Collection
