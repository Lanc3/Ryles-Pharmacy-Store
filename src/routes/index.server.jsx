import {
  CacheDays, flattenConnection, gql, Link,
  Seo, useSession, useShop,
  useShopQuery
} from '@shopify/hydrogen';

import { Suspense } from 'react';
import FeaturedCollection from '../components/FeaturedCollection';
import Layout from '../components/Layout.server';
import ProductCard from '../components/ProductCard';
import Welcome from '../components/Welcome.server';
export default function Index() {
  const {countryCode = 'US'} = useSession();

  return (
    <Layout hero={<GradientBackground />}>
      <Suspense fallback={null}>
        <SeoForHomepage />
      </Suspense>
      <div className="relative mb-12">
        <Welcome />
        <Suspense fallback={<BoxFallback />}>
          <FeaturedProductsBox country={countryCode} />
          <FeaturedCollectionBox/>
        </Suspense>

      </div>
    </Layout>
  );
}

function SeoForHomepage() {
  const {
    data: {
      shop: {title, description},
    },
  } = useShopQuery({
    query: SEO_QUERY,
    cache: CacheDays(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title,
        description,
      }}
    />
  );
}

function BoxFallback() {
  return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
}

function FeaturedProductsBox({country}) {
  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country,
      language: languageCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredProductsCollection = collections[0];
  
  const featuredProducts = featuredProductsCollection
    ? flattenConnection(featuredProductsCollection.products)
    : null;

  return (
    <div className="p-10 mx-20">
      {featuredProductsCollection ? (
        <>
          <div className="w-full flex justify-center items-center mb-8 text-md font-medium ">
            <span className="w-full font-semibold text-lg text-white text-primary mb-2 flex bg-ryles-gold uppercase justify-center items-center rounded-xl">
              SHOP OUR BEST DEALS NOW
            </span>
            <span className="hidden md:inline-flex">
             
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to={`/collections/${featuredProductsCollection.handle}`}
              className="text-blue-600"
            >
              Shop all
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

function FeaturedCollectionBox({country}) {
  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country,
      language: languageCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  

  return (collections.map((coll) => <FeaturedCollection collection={coll} />));
}

function GradientBackground() {
  return (
    <div className="fixed top-0 w-full h-full overflow-hidden bg-blue-wave">
      <div className="absolute w-full h-full from-gray-50 z-10" />

    </div>
  );
}

const SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      description
    }
  }
`;

const QUERY = gql`
  query indexContent($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(first: 6) {
      edges {
        node {
          handle
          id
          title
          description
          image {
            id
            url
            altText
            width
            height
          }
          products(first: 3) {
            edges {
              node {
                handle
                id
                title
                description
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
          }
        }
      }
    }
  }
`;
