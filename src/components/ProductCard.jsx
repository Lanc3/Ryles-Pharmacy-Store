import { Image, Link } from '@shopify/hydrogen';
import { Suspense } from 'react';

import MoneyCompareAtPrice from './MoneyCompareAtPrice.client';
import MoneyPrice from './MoneyPrice.client';

/**
 * A shared component that displays a single product to allow buyers to quickly identify a particular item of interest
 */
export default function ProductCard({product}) {
  const selectedVariant = product.variants.edges[0].node;

  if (selectedVariant == null) {
    return null;
  }

  return (
    <div className="text-md mb-4 relative transition-all duration-500 ease-in-out hover:scale-110 ">
      <Link to={`/products/${product.handle}`}>
      <div class="flex justify-center">
  <div class="rounded-xl shadow-lg bg-white max-w-sm">
  {selectedVariant.image ? (
            <Image
              className="object-fill rounded-t-xl max-h-96 border-t-2 border-l-2 border-r-2 border-[#84754E] min-w-full"
              data={selectedVariant.image}
            />
          ) : null}
          {!selectedVariant?.availableForSale && (
            <div className="absolute top-3 left-3 rounded-3xl text-xs bg-black text-white py-3 px-4">
              Out of stock
            </div>
          )}
    <div class="p-6 border-b-2 border-l-2 border-r-2 border-[#84754E] rounded-b-xl">
      <h5 class="text-ryles-blue text-xl font-medium mb-2">{product.title}</h5>
      <p class="text-ryles-blue text-base mb-4">
        {product.description}
      </p>
      <button type="button" class=" inline-block px-6 py-2.5 bg-ryles-blue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
      <Suspense fallback={null}>
            <MoneyPrice money={selectedVariant.priceV2} />
          </Suspense>
      {selectedVariant.compareAtPriceV2 && (
            <Suspense fallback={null}>
              <MoneyCompareAtPrice money={selectedVariant.compareAtPriceV2} />
            </Suspense>
          )}
          </button>
    </div>
  </div>
</div>
        {/* <div className="bg-white border-2 border-[#84754E] rounded-t-lg relative flex items-center justify-center overflow-hidden object-cover h-96 ">
          {selectedVariant.image ? (
            <Image
              className="bg-white absolute w-full h-full  transform bg-center bg-cover object-center object-contain "
              data={selectedVariant.image}
            />
          ) : null}
          {!selectedVariant?.availableForSale && (
            <div className="absolute top-3 left-3 rounded-3xl text-xs bg-black text-white py-3 px-4">
              Out of stock
            </div>
          )}
        </div>

        <span className="text-white font-semibold  flex justify-center bg-ryles-gold">{product.title}</span>

        {product.vendor && (
          <p className="text-gray-900 font-medium text-sm mb-0.5">
            {product.vendor}
          </p>
        )}

        <div className="flex justify-center bg-white">
          {selectedVariant.compareAtPriceV2 && (
            <Suspense fallback={null}>
              <MoneyCompareAtPrice money={selectedVariant.compareAtPriceV2} />
            </Suspense>
          )}
          <Suspense fallback={null}>
            <MoneyPrice money={selectedVariant.priceV2} />
          </Suspense>
        </div> */}
      </Link>
    </div>
  );
}
