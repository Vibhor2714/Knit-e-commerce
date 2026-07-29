export default function Title({ first, second }) {
  return <h2 className="py-3 text-center text-xl text-gray-600 sm:py-4 sm:text-3xl">{first} <span className="font-semibold text-gray-800">{second}</span></h2>;
}
