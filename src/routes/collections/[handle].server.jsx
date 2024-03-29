import {
  flattenConnection, gql, Seo, useSession,
  useShop,
  useShopQuery
} from '@shopify/hydrogen';

import Layout from '../../components/Layout.server';
import LoadMoreProducts from '../../components/LoadMoreProducts.client';
import NotFound from '../../components/NotFound.server';
import ProductCard from '../../components/ProductCard';

export default function Collection({collectionProductCount = 24, params}) {
  const {languageCode} = useShop();
  const {countryCode = 'US'} = useSession();

  const {handle} = params;
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      handle,
      country: countryCode,
      language: languageCode,
      numProducts: collectionProductCount,
    },
    preload: true,
  });

  if (data?.collection == null) {
    return <NotFound />;
  }

  const collection = data.collection;
  const products = flattenConnection(collection.products);
  const hasNextPage = data.collection.products.pageInfo.hasNextPage;

  return (
    <Layout hero={<GradientBackground />}>
      {/* the seo object will be expose in API version 2022-04 or later */}
      <Seo type="collection" data={collection} />
      <h1 className="flex justify-center font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6">
        {collection.title}
      </h1>
      <div
        dangerouslySetInnerHTML={{__html: collection.descriptionHtml}}
        className="text-lg flex justify-center"
      />
      <p className="text-sm text-gray-500 mt-5 mb-5">
        {products.length} {products.length > 1 ? 'products' : 'product'}
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <LoadMoreProducts startingCount={collectionProductCount} />
      )}
    </Layout>
  );
}
function GradientBackground() {
  return (
    <div className="fixed top-0 w-full h-full overflow-hidden bg-blue-wave">
      <div className="absolute w-full h-full from-gray-50 z-10" />

    </div>
  );
}

const QUERY = gql`
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $numProducts: Int!
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      title
      descriptionHtml
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: $numProducts) {
        edges {
          node {
            title
            vendor
            handle
            descriptionHtml
            compareAtPriceRange {
              maxVariantPrice {
                currencyCode
                amount
              }
              minVariantPrice {
                currencyCode
                amount
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  image {
                    id
                    url
                    altText
                    width
                    height
                  }
                  priceV2 {
                    currencyCode
                    amount
                  }
                  compareAtPriceV2 {
                    currencyCode
                    amount
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`;
