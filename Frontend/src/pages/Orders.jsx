import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
const Orders = () => {
  const { orders } = useContext(StoreContext);
  return (
    <div className="pt-10"><h1 className="text-2xl">MY <span className="font-semibold">ORDERS</span></h1>{orders.length === 0 ? <div className="py-20 text-center text-gray-500">No orders yet. <Link to="/collection" className="text-black underline">Start shopping</Link></div> : <div className="mt-7">{orders.map((order) => <div key={order.id} className="mb-5 border p-5"><div className="flex flex-wrap justify-between gap-3 border-b pb-4 text-sm"><div><b>{order.id}</b><p className="mt-1 text-gray-500">{new Date(order.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p></div><div className="text-right"><b>₹{order.total}</b><p className="mt-1 text-green-700">● {order.status}</p></div></div>{order.items.map(({ product, quantity, size, key }) => <div key={key} className="flex items-center gap-4 pt-4"><img src={product.image[0]} className="h-16 w-14 bg-gray-50 object-cover" alt="" /><p className="flex-1 text-sm">{product.name}<br/><span className="text-gray-500">Size: {size} · Qty: {quantity}</span></p><p className="text-sm">₹{product.price * quantity}</p></div>)}</div>)}</div>}</div>
  )
}

export default Orders
