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
      <div className='flex w-full justify-center'>
      <div className="text-center w-4/5 h-128 bg-shop bg-cover flex justify-center items-center z-10 mt-0 rounded-b-xl">
        <div className="w-1/2 h-auto bg-white rounded-xl space-y-4 pb-10">
          <p className='text-xl font-semibold  text-white text-primary block bg-ryles-gold'>Welcome to Ryles Pharmacy Online</p>
          <p className='text-lg text-ryles-blue font-bold'>Browse our great deals now in our</p>
          <p className='text-lg text-ryles-blue font-bold'>new online store</p>
          <Link
          to={`/collections/frontpage`}
          className="inline-block bg-[#84754E] text-white text-lg font-medium rounded-xl py-1 px-8 uppercase hover:bg-[#b8a880] transition duration-150 ease-in-out"
        >
          Shop Now
        </Link>
        </div>
      </div>
      </div>
      
      <div className="text-center w-full h-96  flex justify-center items-center">
      
      <div className="w-4/5 h-60 bg-white  space-y-4 rounded-xl">
          <p className='font-semibold text-lg text-white text-primary mb-2 block bg-ryles-gold rounded-t-xl'>GET IN TOUCH</p>
          <div className='flex flex-row justify-center'>
          <p className='pr-2 text-lg text-ryles-blue font-bold'>Call now on </p>
          <p className='text-lg text-ryles-blue font-bold'>(066)71 24701</p>
          </div>
          <p className='text-lg text-ryles-blue font-bold'>Fill out our contact form now and we will</p>
          <p className='text-lg text-ryles-blue font-bold'>get back to you ASAP</p>
          <Link
          to={`/contact`}
          className="inline-block bg-[#84754E] text-white text-lg font-medium rounded-xl py-1 px-8 uppercase hover:bg-[#b8a880] transition duration-150 ease-in-out"
        >
          Contact Us
        </Link>
        </div>
      </div>
      <div className='w-4/5 bg-white h-128 mx-auto space-y-4 block rounded-xl'>
          <div className='flex justify-center bg-ryles-gold h-12 items-center w-full rounded-t-xl'>
            <p className='text-xl text-white font-bold'>About Ryles Pharmacy</p>
          </div>
          <div className='flex flex-row  justify-center h-96'>
            <div className='flex w-2/5 flex-col mr-20 justify-center text-center'>
              <p className='pb-5 text-lg text-ryles-blue font-bold'>Ryles pharmacy is open six days a week at 35 ashe Street, with our dedicated team on hand to help with all your needs.</p>
              <p className='pb-5 text-lg text-ryles-blue font-bold'>We are a fully locally owned pharmacy with a staff that puts focus on superior customer care and efficient service with a smile</p>
              <p className='pb-5 text-lg text-ryles-blue font-bold'>Click below to learn more about the staff at Ryles Pharmacy</p>
              <div className='flex justify-center'>
              <Link
              to={`/about`}
                className="bg-[#84754E] text-white text-lg font-medium rounded-xl px-8 uppercase w-60 flex justify-center items-center hover:bg-[#b8a880] transition duration-150 ease-in-out"
                >
              Learn More
              </Link>
              </div>
              
            </div>
            <div className='flex w-1/3 flex-col bg-inside-store bg-cover rounded-xl ml-20'></div>
          </div>
        </div>
        <div className="text-center w-full mt-10 flex justify-center items-center">
      <div className="w-4/5 bg-transparent rounded-md mx-auto space-y-4 pt-6">
      <div class="flex flex-wrap ">
         <div class="w-full ">
            <div class="text-center mx-auto mb-12 lg:mb-20 bg-white w-full rounded-xl">
               <span class="font-semibold text-lg text-white text-primary mb-2 block bg-ryles-gold rounded-t-xl">
               Our Services
               </span>
               <h2
                  class="
                  font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[40px]
                  text-ryles-blue
                  mb-4
                  "
                  >
                  What We Offer
               </h2>
               <p class="text-base text-body-color">
               Services including but not limited to.
               </p>
            </div>
         </div>
      </div>
          <div class="flex flex-wrap ">
         <div class="w-full md:w-1/2 lg:w-1/3 px-4">
            <div
               className="
               p-10
               md:px-7
               xl:px-10
               rounded-[20px]
               border-2 border-[#84754E]
               bg-white
               shadow-md
               hover:shadow-lg
               mb-8
               transition-all duration-500 ease-in-out hover:scale-110
               "
               >
               <div
                  className="
                  w-[70px]
                  h-[70px]
                  flex
                  items-center
                  justify-center
                  align-middle
                  bg-ryles-blue
                  rounded-2xl
                  mb-8
                  ml-28
                  "
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="60"
                     height="60">
  <path fill="white" d="M39 0H9a7 7 0 0 0-7 7v34a7 7 0 0 0 7 7h30a7 7 0 0 0 7-7V7a7 7 0 0 0-7-7zm5 41a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h30a5 5 0 0 1 5 5z"></path>
  <path fill="white" d="M38 4h-5a3 3 0 0 0-2.93 2.37 9 9 0 0 0-12.14 0A3 3 0 0 0 15 4h-5a4 4 0 0 0-4 4v32a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4zm-8.42 13.21a1 1 0 0 0-1.37 1.37A7 7 0 0 1 25 19.92a1 1 0 0 0-2 0 7 7 0 0 1-3.23-1.34 1 1 0 0 0-1.37-1.37A7 7 0 0 1 17.08 14a1 1 0 0 0 0-2 7 7 0 0 1 1.34-3.23 1 1 0 0 0 1.37-1.37A7 7 0 0 1 23 6.08a1 1 0 0 0 2 0 7 7 0 0 1 3.23 1.34 1 1 0 0 0 1.37 1.37A7 7 0 0 1 30.92 12a1 1 0 0 0 0 2 7 7 0 0 1-1.34 3.21zM40 40a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2c6.51 0 6-.68 6 2.9-4.7 9.1 7.17 17.67 14.37 10.47A9 9 0 0 0 32 8.9V7a1 1 0 0 1 1-1h5a2 2 0 0 1 2 2z"></path>
  <path fill="white" d="M24 11a2 2 0 0 0-1 3.72V17a1 1 0 0 0 2 0v-2.28A2 2 0 0 0 24 11z"></path>
</svg>

               </div>
               <h4 class="font-semibold text-xl text-dark mb-3">
                  Weight Management
               </h4>
               <p class="text-body-color">
               Free Weight/Height/BMI Measurement
               </p>
            </div>
         </div>
         <div class="w-full md:w-1/2 lg:w-1/3 px-4">
            <div
               class="
               p-10
               md:px-7
               xl:px-10
               rounded-[20px]
               border-2 border-[#84754E]
               bg-white
               shadow-md
               hover:shadow-lg
               mb-8
               transition-all duration-500 ease-in-out hover:scale-110
               "
               >
               <div
                  className="
                  w-[70px]
                  h-[70px]
                  flex
                  items-center
                  justify-center
                  align-middle
                  bg-ryles-blue
                  rounded-2xl
                  mb-8
                  ml-28
                  "
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="60"
                     height="60">
  <path fill="white" d="M28.38 10.58a6.5 6.5 0 0 0-12 .55l-1.87 5.17-1.8 5a6.55 6.55 0 0 0-.38 2.21 4.45 4.45 0 0 1-3.92-3.16L7.09 16l6.81-2a1 1 0 0 0-.59-2l-6.8 2.08L5.2 9.81a4.5 4.5 0 0 1 8.61-2.62l.64 2.1a1 1 0 0 0 1.25.71 1 1 0 0 0 .66-1.25l-.64-2.15a6.5 6.5 0 1 0-12.43 3.8l1.6 5.26 1.61 5.26a6.51 6.51 0 0 0 6.15 4.6 6.52 6.52 0 0 0 3.53 3.92l.43.17a6.49 6.49 0 0 0 8.32-3.9l.67-1.85a1 1 0 0 0-1.88-.68L23.05 25a4.5 4.5 0 0 1-5.76 2.7l-.3-.12a4.51 4.51 0 0 1-2.4-5.58l1.46-4 9.41 3.41a1 1 0 0 0 .34.06 1 1 0 0 0 .94-.66 1.52 1.52 0 0 0 0-.21 1.08 1.08 0 0 0 .11-.18l1.73-4.79a6.45 6.45 0 0 0-.2-5.05zm-1.65 4.29L25.2 19.1 16.74 16l1.53-4.23a4.5 4.5 0 0 1 8.46 3.06z" ></path>
</svg>
               </div>
               <h4 class="font-semibold text-xl text-dark mb-3">
                  Birth Control
               </h4>
               <p class="text-body-color">
               Emergency Hormonal Contraception
               </p>
            </div>
         </div>
         <div class="w-full md:w-1/2 lg:w-1/3 px-4">
            <div
               class="
               p-10
               md:px-7
               xl:px-10
               rounded-[20px]
               border-2 border-[#84754E]
               bg-white
               shadow-md
               hover:shadow-lg
               mb-8
               transition-all duration-500 ease-in-out hover:scale-110
               "
               >
               <div
                  className="
                  w-[70px]
                  h-[70px]
                  flex
                  items-center
                  justify-center
                  align-middle
                  bg-ryles-blue
                  rounded-2xl
                  mb-8
                  ml-28
                  "
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="60" height="60" ><path fill="white"  d="M116.437 28.306 99.694 11.563a1.749 1.749 0 1 0-2.474 2.474l3.494 3.495-12.085 12.084-9.924-9.925a1.75 1.75 0 0 0-2.475 2.475l2.593 2.593-10.47 10.469-11.7 11.7-11.717 11.717-7.38 7.38a7.867 7.867 0 0 0 0 11.129l.069.07-11.9 11.9a6.507 6.507 0 0 0 0 9.192l.742.743-14.9 14.9a1.75 1.75 0 0 0 2.475 2.475l14.9-14.9.742.742a6.5 6.5 0 0 0 9.193 0l11.9-11.9.07.069a7.879 7.879 0 0 0 11.129 0l41.268-41.268 2.592 2.593a1.75 1.75 0 0 0 2.475-2.475l-9.927-9.925 12.084-12.084 3.495 3.494a1.749 1.749 0 0 0 2.474-2.474zM36.4 99.806a3.073 3.073 0 0 1-4.243 0L28.2 95.847a3.005 3.005 0 0 1 0-4.244L40.1 79.7l8.2 8.2zm23.1-11.835a4.376 4.376 0 0 1-6.18 0l-13.29-13.29a4.376 4.376 0 0 1 0-6.18l6.144-6.143 6.55 6.549a1.749 1.749 0 0 0 2.476-2.474l-6.55-6.55 9.234-9.234 6.55 6.55a1.749 1.749 0 1 0 2.474-2.474l-6.549-6.55 9.233-9.233 6.55 6.549a1.75 1.75 0 0 0 2.475-2.474l-6.55-6.55 9.233-9.234 6.094 6.094L100.767 46.7zM95.909 36.9l-4.805-4.8 12.085-12.085 4.805 4.805z"/></svg>
               </div>
               <h4 class="font-semibold text-xl text-dark mb-3">
                  Flu Vaccination
               </h4>
               <p class="text-body-color">
               At Ryle's Pharmacy we are preparing for the winter season. Book your flu vaccine today.
               </p>
            </div>
         </div>
         <div class="w-full md:w-1/2 lg:w-1/3 px-4">
            <div
               class="
               p-10
               md:px-7
               xl:px-10
               rounded-[20px]
               border-2 border-[#84754E]
               bg-white
               shadow-md
               hover:shadow-lg
               mb-8
               transition-all duration-500 ease-in-out hover:scale-110
               "
               >
               <div
                  className="
                  w-[70px]
                  h-[70px]
                  flex
                  items-center
                  justify-center
                  align-middle
                  bg-ryles-blue
                  rounded-2xl
                  mb-8
                  ml-28
                  "
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 100 100" width="100" height="100">
  <path fill="white" d="M31.667 10c-11.046 0-20 8.954-20 20s8.954 20 20 20c11.047 0 20-8.954 20-20s-8.954-20-20-20zM45 30c0 2.467-.716 4.751-1.886 6.733l-18.181-18.18c1.982-1.17 4.266-1.887 6.733-1.887C39.03 16.667 45 22.637 45 30zm-26.667 0c0-2.467.716-4.751 1.886-6.733l18.18 18.18c-1.982 1.17-4.266 1.887-6.733 1.887-7.363-.001-13.333-5.971-13.333-13.334zM70 48.333c-11.048 0-20 8.952-20 20 0 11.049 8.952 20 20 20s20-8.951 20-20c0-11.048-8.952-20-20-20zM70 55c2.468 0 4.753.716 6.731 1.885L58.555 75.068c-1.172-1.982-1.888-4.268-1.888-6.735C56.667 60.97 62.637 55 70 55zm0 26.667c-2.468 0-4.753-.717-6.731-1.885l18.177-18.184c1.172 1.982 1.888 4.268 1.888 6.734-.001 7.364-5.971 13.335-13.334 13.335zM87.07 12.931c-3.906-3.904-10.234-3.908-14.14-.001L59.597 26.263c-3.906 3.906-3.906 10.239 0 14.142a9.994 9.994 0 0 0 14.141 0L87.07 27.072c3.907-3.905 3.907-10.233 0-14.141zM64.31 35.692a3.334 3.334 0 0 1 0-4.715l4.311-4.31 4.713 4.715-4.31 4.31a3.337 3.337 0 0 1-4.714 0zm18.046-13.334-4.31 4.31-4.714-4.715 4.311-4.308a3.333 3.333 0 0 1 4.713 0 3.343 3.343 0 0 1 0 4.713zM43.737 72.923l-16.665-16.66c-3.906-3.909-10.237-3.902-14.142 0a9.997 9.997 0 0 0 0 14.141L29.595 87.07c3.906 3.906 10.238 3.906 14.142 0 3.906-3.906 3.906-10.241 0-14.147zM17.643 60.977a3.334 3.334 0 0 1 4.715 0l5.975 5.977-4.714 4.714-5.977-5.977a3.338 3.338 0 0 1 .001-4.714zm21.38 21.379h-.005a3.333 3.333 0 0 1-4.71 0l-5.975-5.977 4.713-4.713 5.977 5.977a3.335 3.335 0 0 1 0 4.713z"></path>
</svg>
               </div>
               <h4 class="font-semibold text-xl text-dark mb-3">
               Viagra Connect 
               </h4>
               <p class="text-body-color">
               Viagra Connect is an effective treatment for erectile problems (EPs) in men
               </p>
            </div>
         </div>
         <div class="w-full md:w-1/2 lg:w-1/3 px-4">
            <div
               class="
               p-10
               md:px-7
               xl:px-10
               rounded-[20px]
               border-2 border-[#84754E]
               bg-white
               shadow-md
               hover:shadow-lg
               mb-8
               transition-all duration-500 ease-in-out hover:scale-110
               "
               >
               <div
                  className="
                  w-[70px]
                  h-[70px]
                  flex
                  items-center
                  justify-center
                  align-middle
                  bg-ryles-blue
                  rounded-2xl
                  mb-8
                  ml-28
                  "
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="60" height="60">
  <g data-name="Blood Pressure">
    <path fill="white" d="m25.71 13.71 2-2a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 1.42 1.42z"></path>
    <path fill="white" d="M46 19.57c0-2.28.41-4.61-2.09-5.41-1-6-9.91-5.24-9.91.84v25a6 6 0 0 1-12 0v-6h1a1 1 0 0 0 1-1v-3.18c2.44-.87 2-3.21 2-5.82 3.57 0 3 .59 3-5.26a7 7 0 0 0-3-12.66V3a3 3 0 0 0-3-3H3a3 3 0 0 0-3 3v24a3 3 0 0 0 3 3h15v3a1 1 0 0 0 1 1h1v6a8 8 0 0 0 16 0V15a3 3 0 0 1 5.88-.78c-2.25.91-1.88 3-1.88 5.35C36.25 24 38.07 34 43 34s6.73-10 3-14.43zM27 22h-4v-2.29a7 7 0 0 0 4 0zm3-9a5 5 0 1 1-5-5 5 5 0 0 1 5 5zM3 28c-1.43 0-1 .3-1-25a1 1 0 0 1 1-1h7.11C7.22 4.82 8 6.71 8 23a7 7 0 0 0 2.11 5zm7-5V7a5 5 0 0 1 5-5h8a1 1 0 0 1 1 1v3.08a7 7 0 0 0-3 12.66c0 5.87-.53 5.26 3 5.26v3a1 1 0 0 1-1 1h-8a5 5 0 0 1-5-5zm12 7v2h-2v-2zm20-11.84V17a1 1 0 0 1 2 0c0 2.2.29.44-2 1.16zM43 32c-2.94 0-4.31-8.22-1.32-11.32a1.62 1.62 0 0 1 2.64 0C47.31 23.77 45.94 32 43 32z"></path>
  </g>
</svg>
               </div>
               <h4 class="font-semibold text-xl text-dark mb-3">
               Free Blood Pressure Checks
               </h4>
               <p class="text-body-color">
               A member of our trained pharmacy team will take your blood pressure in the privacy of a consultation room.
               </p>
            </div>
         </div>
         <div class="w-full md:w-1/2 lg:w-1/3 px-4">
            <div
               class="
               p-10
               md:px-7
               xl:px-10
               rounded-[20px]
               border-2 border-[#84754E]
               bg-white
               shadow-md
               hover:shadow-lg
               mb-8
               transition-all duration-500 ease-in-out hover:scale-110
               "
               >
               <div
                  className="
                  w-[70px]
                  h-[70px]
                  flex
                  items-center
                  justify-center
                  align-middle
                  bg-ryles-blue
                  rounded-2xl
                  mb-8
                  ml-28
                  "
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="60" height="60">
  <path fill="white" d="m19.022 23.455 31.435 44.17-3.264 2.323-31.435-44.17zM88.307 127.997l-25.641-36.2 3.271-2.317 23.348 32.966 17.247-11.938-28.471-40.195 3.269-2.317 30.814 43.502zM51.734 26.212l13.96 19.71-3.27 2.316-13.96-19.71z"></path>
  <path fill="white" d="m40.074 128-23.842-16.502 60.321-85.161 3.269 2.316-57.978 81.855 17.243 11.935 69.882-99.199 3.275 2.308z"></path>
  <path fill="white" d="m109.416 29.207-25.491-25.2H44.453l-25.49 25.198-2.817-2.85L42.806 0H85.57l26.663 26.357z"></path>
  <path fill="white" d="M19.697 25.778h87.604v4.007H19.697z"></path>
</svg>
               </div>
               <h4 class="font-semibold text-xl text-dark mb-3">
               PrEP Medication
               </h4>
               <p class="text-body-color">
               PrEP has been shown in many studies to be safe and highly effective at preventing HIV.
               </p>
            </div>
         </div>
         <div class="w-full md:w-1/2 lg:w-1/3 px-4">
            <div
               class="
               p-10
               md:px-7
               xl:px-10
               rounded-[20px]
               border-2 border-[#84754E]
               bg-white
               shadow-md
               hover:shadow-lg
               mb-8
               transition-all duration-500 ease-in-out hover:scale-110
               "
               >
               <div
                  className="
                  w-[70px]
                  h-[70px]
                  flex
                  items-center
                  justify-center
                  align-middle
                  bg-ryles-blue
                  rounded-2xl
                  mb-8
                  ml-28
                  "
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="60" height="60">
 
    <path fill="white" d="M1095.79 488.178c4.814-12.322-1.27-26.217-13.593-31.031s-26.217 1.27-31.031 13.593c-19.748 50.574-49.614 95.81-87.162 133.275-37.623 37.538-82.93 67.331-133.476 86.938-12.323 4.763-18.45 18.615-13.687 30.938 4.763 12.322 18.615 18.45 30.938 13.686a434.995 434.995 0 0 0 149.976-97.624c42.283-42.19 75.878-93.03 98.035-149.775z"></path>
    <path fill="white" d="M1096.07 471.585c-4.349-12.477-17.992-19.067-30.469-14.718-12.477 4.35-19.067 17.992-14.718 30.47a387.167 387.167 0 0 1 18.087 75.762c3.465 25.783 4.298 51.887 2.53 77.905-.88 13.202 9.112 24.62 22.314 25.5 13.202.88 24.62-9.111 25.5-22.314a435.247 435.247 0 0 0-2.907-87.466 435.14 435.14 0 0 0-20.337-85.139zM1529.5 735.769c12.426 4.556 26.195-1.824 30.75-14.25 4.556-12.426-1.824-26.195-14.25-30.75-64.707-23.768-123.193-57.532-172.269-98.623-48.813-40.87-88.232-88.843-115.09-141.266-6.006-11.753-20.404-16.412-32.157-10.406-11.753 6.006-16.411 20.404-10.405 32.157 29.915 58.39 73.375 111.449 126.9 156.266 53.262 44.595 116.589 81.184 186.52 106.872z"></path>
    <path fill="white" d="M1081.06 623.378c-10.613 7.92-12.796 22.949-4.876 33.562 7.92 10.614 22.95 12.796 33.563 4.876 29.04-21.68 58.235-51.175 83.947-83.588 25.997-32.773 48.587-68.747 63.976-102.816 5.436-12.063.063-26.251-12-31.687-12.062-5.435-26.25-.062-31.686 12-13.773 30.492-34.184 62.93-57.79 92.69-23.197 29.244-49.339 55.706-75.134 74.963z"></path>
    <path fill="white" d="M1173.9 255.793c109.226 0 208.114 44.275 279.695 115.856 71.58 71.58 115.856 170.469 115.856 279.695 0 109.225-44.275 208.114-115.856 279.695-71.58 71.58-170.469 115.856-279.695 115.856s-208.115-44.276-279.696-115.856c-71.58-71.58-115.856-170.47-115.856-279.695s44.276-208.114 115.856-279.695c71.58-71.58 170.47-115.856 279.696-115.856zm245.757 149.793c-62.893-62.893-149.782-101.793-245.757-101.793-95.977 0-182.865 38.902-245.758 101.793-62.891 62.893-101.793 149.783-101.793 245.757 0 95.974 38.902 182.864 101.793 245.757 62.893 62.891 149.782 101.793 245.758 101.793 95.975 0 182.864-38.902 245.757-101.793 62.893-62.893 101.793-149.783 101.793-245.757 0-95.975-38.9-182.864-101.793-245.757zM687.055 1343.39c34.447-79.949 90.09-139.41 171.204-178.924 79.585-38.767 183.401-57.878 315.65-57.878 124.98 0 227.284 23.242 306.464 61.317 90.645 43.589 151.159 106.742 181.076 177.21l.087-.037c.68 1.6 1.169 3.232 1.484 4.873l102.48 388.137.053-.014c3.383 12.815-4.264 25.949-17.079 29.331-2.216.585-4.44.839-6.623.795H605.46c-13.255 0-24-10.745-24-24 0-2.715.452-5.325 1.282-7.758l17.222-65.23a288.225 288.225 0 0 0 47.39 8.107l-10.792 40.881h1074.68l-94.564-358.157c-25.766-59.428-78.156-113.132-156.933-151.014-72.885-35.048-168.184-56.441-285.84-56.441-124.864 0-221.77 17.5-294.65 53.002-70.258 34.223-118.426 85.631-148.202 154.69L672.4 1584.443c-16.153-.017-32.33-1.974-47.957-5.961l60.756-230.124 23.156 6.093-23.205-6.126a24.055 24.055 0 0 1 1.902-4.936z"></path>
    <path fill="white" d="M980.704 1157.05c-7.196-11.08-22.013-14.228-33.093-7.031-11.08 7.196-14.228 22.013-7.031 33.093 24.858 38.104 59.812 68.782 100.678 89.873 40.654 20.98 87.15 32.546 135.328 32.546 46.19 0 90.932-10.65 130.492-30.11 39.702-19.533 74.148-48.019 99.587-83.612 7.663-10.77 5.145-25.713-5.625-33.376-10.769-7.663-25.712-5.145-33.375 5.624-20.72 28.99-49.009 52.307-81.774 68.425-32.908 16.19-70.38 25.05-109.305 25.05-40.577 0-79.53-9.634-113.391-27.11-33.652-17.368-62.297-42.419-82.492-73.372zM542.098 1037.58c-1.45-8.698-9.677-14.575-18.374-13.126-8.698 1.45-14.575 9.677-13.126 18.375 13.526 81.153-10.97 161.518-33.93 236.845-36.676 120.324-69.701 228.672 45.647 318.77a224.293 224.293 0 0 0 7.067 5.3c51.522 37.061 115.6 50.005 175.226 42.742 60.006-7.306 115.897-35.103 150.525-79.432a176.11 176.11 0 0 0 4.153-5.539c5.143-7.144 3.519-17.107-3.626-22.25-7.144-5.142-17.107-3.518-22.25 3.627a144.498 144.498 0 0 1-3.401 4.536c-29.231 37.421-77.217 60.986-129.15 67.308-52.311 6.37-108.245-4.78-152.853-36.868a192.693 192.693 0 0 1-6.066-4.549c-98.1-76.626-68.094-175.07-34.772-284.395 24.03-78.832 49.664-162.937 34.93-251.345z"></path>
    <path fill="white" d="M880.856 1424.95c22.648 0 43.156 9.183 58.003 24.03 14.846 14.846 24.03 35.355 24.03 58.002 0 22.65-9.184 43.159-24.03 58.003-14.847 14.847-35.355 24.03-58.003 24.03-22.65 0-43.159-9.183-58.003-24.03-14.846-14.844-24.03-35.353-24.03-58.003 0-22.647 9.184-43.156 24.03-58.002 14.844-14.847 35.353-24.03 58.003-24.03zm12.752 69.28a17.978 17.978 0 0 0-12.752-5.278 17.98 17.98 0 0 0-12.752 5.278 17.978 17.978 0 0 0-5.279 12.752 17.98 17.98 0 0 0 5.279 12.753 17.98 17.98 0 0 0 12.752 5.278c4.982 0 9.491-2.017 12.752-5.278a17.98 17.98 0 0 0 5.279-12.753c0-4.981-2.018-9.49-5.279-12.752zM514.555 544.361c-8.698 1.483-14.546 9.74-13.063 18.437 1.483 8.698 9.74 14.546 18.437 13.063l51.097-8.913c4.222-.735 8.582-.828 12.904-.353 9.781 1.076 19.367 5.012 26.907 10.946 6.869 5.404 11.816 12.35 13.15 20.002l15.75-2.687-15.762 2.748.087.462c.342 2.188.405 4.436.155 6.72L593.063 888.02c-4.06 36.906-19.638 64.948-40.605 82.48-13.22 11.055-28.57 17.926-44.429 20.157-15.83 2.228-32.23-.108-47.586-7.448-23.475-11.225-44.818-34.145-58.768-70.373l-102.391-265.91a25.25 25.25 0 0 1-1.49-5.83c-1.03-7.942 1.947-16.062 7.328-23.144 6.028-7.935 14.858-14.44 24.672-18.219 3.874-1.49 7.878-2.54 11.889-3.06l50.768-6.586c8.732-1.104 14.918-9.08 13.813-17.812-1.104-8.732-9.08-14.917-17.812-13.813l-50.768 6.586c-6.56.85-13.046 2.541-19.264 4.935-15.272 5.88-29.11 16.133-38.673 28.719-10.21 13.436-15.755 29.611-13.578 46.393a57.17 57.17 0 0 0 3.365 13.205l102.39 265.91c17.16 44.565 44.394 73.225 74.768 87.75 21.245 10.156 43.891 13.392 65.712 10.322 21.794-3.066 42.716-12.365 60.553-27.28 26.903-22.497 46.818-57.789 51.856-103.606l31.154-283.234c.584-5.307.433-10.45-.367-15.383-.03-.223-.063-.447-.102-.672l-.011.003v-.004l-.011.003c-2.8-15.955-12.132-29.656-24.888-39.693-12.097-9.52-27.515-15.837-43.283-17.571-7.228-.795-14.54-.637-21.653.604l-51.097 8.912z"></path>
    <path fill="white" d="M640.688 893.084c1.864-17.535-10.84-33.262-28.375-35.126-17.535-1.864-33.262 10.84-35.126 28.375-3.57 32.45-16.98 56.866-34.98 71.918-10.911 9.124-23.474 14.78-36.365 16.594-12.835 1.806-26.115-.078-38.524-6.01-20.025-9.576-38.424-29.625-50.769-61.686-6.282-16.43-24.696-24.657-41.125-18.375S350.768 913.47 357.05 929.9c18.763 48.731 48.941 80.262 82.767 96.436 24.19 11.565 49.956 15.251 74.774 11.76 24.76-3.483 48.472-13.998 68.617-30.844 29.87-24.978 51.952-63.895 57.48-114.167z"></path>
  <path fill="none" d="M0 0h2048v2048H0z"></path>
</svg>

               </div>
               <h4 class="font-semibold text-xl text-dark mb-3">
               Express Medicines Service
               </h4>
               <p class="text-body-color">
               We offer a full range of services to in store and remotely.
               </p>
            </div>
         </div>
         <div class="w-full md:w-1/2 lg:w-1/3 px-4">
            <div
               class="
               p-10
               md:px-7
               xl:px-10
               rounded-[20px]
               border-2 border-[#84754E]
               bg-white
               shadow-md
               hover:shadow-lg
               mb-8
               transition-all duration-500 ease-in-out hover:scale-110
               "
               >
               <div
                  className="
                  w-[70px]
                  h-[70px]
                  flex
                  items-center
                  justify-center
                  align-middle
                  bg-ryles-blue
                  rounded-2xl
                  mb-8
                  ml-28
                  "
                  >
                  <svg
                     width="32"
                     height="32"
                     viewBox="0 0 32 32"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     >
                     <path
                        d="M18.6746 0.26779C10.0637 -1.33065 1.86522 4.39279 0.266779 13.0037C-0.506658 17.1803 0.421467 21.3568 2.79334 24.8631C5.21678 28.3693 8.82615 30.6897 12.9512 31.4631C13.9308 31.6178 14.859 31.7209 15.7871 31.7209C23.2637 31.7209 29.9668 26.3584 31.359 18.6756C32.9574 10.0647 27.234 1.81466 18.6746 0.26779ZM29.6574 18.3662C29.5543 18.8819 29.4512 19.449 29.2965 19.9131L16.7668 15.2209V1.81466C17.2824 1.86623 17.8496 1.91779 18.3652 2.02091C25.9449 3.4131 30.998 10.735 29.6574 18.3662ZM14.9105 1.81466V14.9115H1.86522C1.91678 14.3959 1.96834 13.8287 2.07147 13.3131C3.20584 6.86779 8.67147 2.22716 14.9105 1.81466ZM13.3121 29.6584C9.65115 28.9881 6.45428 26.9256 4.28865 23.8318C2.79334 21.7178 1.96834 19.2428 1.81365 16.7678H15.6324L28.5746 21.6147C26.048 27.3381 19.7574 30.8443 13.3121 29.6584Z"
                        fill="white"
                        />
                  </svg>
               </div>
               <h4 class="font-semibold text-xl text-dark mb-3">
               Specialized Medications
               </h4>
               <p class="text-body-color">
                  Come into Ryle's and ask one of our highly trained staff about this service.
               </p>
            </div>
         </div>
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
