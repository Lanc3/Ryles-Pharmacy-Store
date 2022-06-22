import {
  flattenConnection, gql, Link, useShop,
  useShopQuery
} from '@shopify/hydrogen';
import { Suspense } from 'react';

function ExternalIcon() {
  return (
    <svg
      className="ml-3"
      width="15"
      height="14"
      viewBox="0 0 15 14"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M8.11963 0.000976562C7.56734 0.000976562 7.11963 0.448692 7.11963 1.00098C7.11963 1.55326 7.56734 2.00098 8.11963 2.00098H10.7054L4.41252 8.29387C4.022 8.68439 4.022 9.31756 4.41252 9.70808C4.80305 10.0986 5.43621 10.0986 5.82674 9.70808L12.1196 3.41519V6.00098C12.1196 6.55326 12.5673 7.00098 13.1196 7.00098C13.6719 7.00098 14.1196 6.55326 14.1196 6.00098V1.00098C14.1196 0.448692 13.6719 0.000976562 13.1196 0.000976562H8.11963Z" />
      <path d="M2.11963 2.00098C1.01506 2.00098 0.119629 2.89641 0.119629 4.00098V12.001C0.119629 13.1055 1.01506 14.001 2.11963 14.001H10.1196C11.2242 14.001 12.1196 13.1055 12.1196 12.001V9.00098C12.1196 8.44869 11.6719 8.00098 11.1196 8.00098C10.5673 8.00098 10.1196 8.44869 10.1196 9.00098V12.001H2.11963V4.00098L5.11963 4.00098C5.67191 4.00098 6.11963 3.55326 6.11963 3.00098C6.11963 2.44869 5.67191 2.00098 5.11963 2.00098H2.11963Z" />
    </svg>
  );
}

function DocsButton({url, label}) {
  return (
    <a
      href={url}
      target="_blank"
      className="bg-white shadow py-2 px-5 rounded-full inline-flex items-center hover:opacity-80"
      rel="noreferrer"
    >
      {label}
      <ExternalIcon />
    </a>
  );
}

function BoxFallback() {
  return (
    <div className="bg-white p-12 shadow-xl rounded-xl text-gray-900 h-60"></div>
  );
}

function StorefrontInfo() {
  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {language: languageCode},
    preload: true,
  });
  const shopName = data ? data.shop.name : '';
  const products = data && flattenConnection(data.products);
  const collections = data && flattenConnection(data.collections);
  const totalProducts = products && products.length;
  const totalCollections = collections && collections.length;

  const pluralize = (count, noun, suffix = 's') =>
    `${count} ${noun}${count === 1 ? '' : suffix}`;
  return (
    <div className="bg-white p-12 shadow-xl rounded-xl text-gray-900">
      <p className="text-md font-medium uppercase mb-4">Connected Storefront</p>
      <h2 className="text-2xl font-bold mb-4">{shopName}</h2>
      <p className="text-md">
        {pluralize(totalProducts, 'Product')}
        {', '}
        {pluralize(totalCollections, 'Collection')}
      </p>
      {totalProducts === 0 && totalCollections === 0 && (
        <div className="py-2 px-3 bg-red-100 text-md">
          Use the{' '}
          <a
            href="https://shopify.dev/apps/tools/cli/getting-started"
            className="text-primary font-mono font-bold underline"
            target="_blank"
            rel="noreferrer"
          >
            Shopify CLI
          </a>{' '}
          to populate sample products and collections.
        </div>
      )}
      <hr className="my-4" />
      <a
        href="https://shopify.dev/custom-storefronts/hydrogen/getting-started/create#step-2-update-information-about-your-shopify-storefront"
        className="text-md inline-flex items-center text-blue-700 font-medium hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        Change your storefront access token
        <ExternalIcon />
      </a>
    </div>
  );
}

function TemplateLinks() {
  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {language: languageCode},
    preload: true,
  });
  const products = data && flattenConnection(data.products);
  const collections = data && flattenConnection(data.collections);

  const firstProduct = products && products.length ? products[0].handle : '';
  const firstCollection = collections[0] ? collections[0].handle : '';

  return (
    <div className="bg-white p-12 md:p-12 shadow-xl rounded-xl text-gray-900">
      <p className="text-md font-medium uppercase mb-4">
        Explore the templates
      </p>
      <ul>
        <li className="mb-4">
          <Link
            to={`/collections/${firstCollection}`}
            className="text-md font-medium text-blue-700 hover:underline"
          >
            Collection template
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to={`/products/${firstProduct}`}
            className="text-md font-medium text-blue-700 hover:underline"
          >
            Product template
          </Link>
        </li>
        <li>
          <Link
            to="/error-page"
            className="text-md font-medium text-blue-700 hover:underline"
          >
            404 template
          </Link>
        </li>
      </ul>
    </div>
  );
}

/**
 * A server component that displays the content on the homepage of the Hydrogen app
 */
 export default function Welcome() {
  return (
    <div className="">
      <Suspense fallback={<BoxFallback />}>
      <div className="text-center w-full h-128 bg-shop bg-cover flex justify-center items-center z-10">
        <div className="w-1/2 h-60 bg-white rounded-xl border-4 border-[#84754E] space-y-4 pt-6 ">
          <p className='text-xl'>Welcome to Ryles Pharmacy Online</p>
          <p>Brows our great deals now in our</p>
          <p>new online store</p>
          <Link
          to={`/collections/frontpage`}
          className="inline-block bg-[#84754E] text-white text-lg font-medium rounded-xl py-1 px-8 uppercase"
        >
          Shop Now
        </Link>
        </div>
      </div>
      <div className="text-center w-full h-96  flex justify-center items-center">
      <div className="w-3/5 h-60 bg-white rounded-xl border-4 border-[#84754E] space-y-4 pt-6 shadow-2xl shadow-[#bba97d88]">
          <p className='text-xl'>GET IN TOUCH</p>
          <div className='flex flex-row justify-center'>
          <p className='pr-2'>Call now on </p>
          <p className='font-bold'>(066)71 24701</p>
          </div>
          <p>Fill out our contact form now and we will</p>
          <p>get back to you ASAP</p>
          <Link
          to={`/contact`}
          className="inline-block bg-[#84754E] text-white text-lg font-medium rounded-xl py-1 px-8 uppercase"
        >
          Contact Us
        </Link>
        </div>
      </div>
      <div className='w-full bg-white h-128'>
          <div className='flex justify-center bg-ryles-gold h-12 items-center w-full shadow-sm shadow-ryles-gold'>
            <p className='text-xl text-white font-bold'>About Ryles Pharmacy</p>
          </div>
          <div className='flex flex-row pt-11 justify-center h-96'>
            <div className='flex w-1/4 flex-col mr-20'>
              <p className='pb-5'>Ryles pharmacy is open six days a week at 35 ashe Street, with our dedicated team on hand to help with all your needs.</p>
              <p className='pb-5'>We are a fully locally owned pharmacy with a staff that puts focus on superior customer care and efficient service with a smile</p>
              <p className='pb-5'>Click below to learn more about the staff at Ryles Pharmacy</p>
              <Link
              to={`/about`}
                className="bg-[#84754E] text-white text-lg font-medium rounded-xl py-1 px-8 uppercase w-60 flex justify-center items-center"
                >
              Learn More
              </Link>
            </div>
            <div className='flex w-1/3 flex-col bg-inside-store bg-cover rounded-xl '></div>
          </div>
        </div>
        <div className="text-center w-full h-96  flex justify-center items-center">
      <div className="w-4/5 h-70 bg-white rounded-xl border-4 border-[#84754E] space-y-4 pt-6 shadow-2xl shadow-[#bba97d88]">
          <p className='text-xl'>What we Offer</p>
          <div className='flex flex-row justify-center'>
          <p className='pr-2'>We offer a continuously growing, wide range of services at Ryles Pharmacy</p>
          </div>
          <p>Services offered but not limit to include:</p>
          <div className="grid grid-cols-4 gap-4 pb-10 pt-10">
          <div>Free Weight/Height/BMI Measurement</div>
          <div>Emergency Hormonal Contraception</div>
          <div>Flu Vaccination</div>
          <div>Viagra Connect</div>
          <div>Free Blood Pressure Checks</div>
          <div>PrEP Medication</div>
          <div>Express Medicines Service</div>
          <div>Specialized Medications</div>
        </div>
        </div>
      </div>
      </Suspense>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <Suspense fallback={<BoxFallback />}>
        </Suspense>
        <Suspense fallback={<BoxFallback />}>
        </Suspense>
      </div>
    </div>
  );
}
const QUERY = gql`
  query welcomeContent($language: LanguageCode)
  @inContext(language: $language) {
    shop {
      name
    }
    products(first: 3) {
      edges {
        node {
          handle
        }
      }
    }
    collections(first: 3) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;
