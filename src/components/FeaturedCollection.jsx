import { flattenConnection, Image, Link } from '@shopify/hydrogen';
import ProductCard from './ProductCard';
/**
 * A shared component that defines a single featured collection to display on a storefront
 */
export default function FeaturedCollection({collection}) {
  const featuredProducts = collection
  ? flattenConnection(collection.products)
  : null;
  return collection ? (
    <div className="shadow-xl rounded-xl grid grid-cols-1 lg:grid-cols-1 items-center bg-white overflow-hidden m-20">
      <div>{collection.image ? (
        <div className=' flex justify-center w-full'>
        <Image width="622" height="465" data={collection.image} />
        </div>
        
      ) : null}
      <div className="px-10 py-10 lg:py-0">
        <h2 className="text-gray-700 text-3xl font-bold mb-5 flex justify-center">
          {collection.title}
        </h2>
        <p className="text-lg text-gray-500 mb-6 flex justify-center">{collection.description}</p>
        <Link
          to={`/collections/${collection.handle}`}
          className="flex justify-center mx-128 bg-gray-900 text-white text-lg font-medium rounded-md py-4 px-16 uppercase"
        >
          Sell all {collection.title}
        </Link>
      </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-64 m-8">
            {featuredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
    </div>
  ) : null;
}
