import {useShopQuery, flattenConnection, Link} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {Suspense} from 'react';
import Layout from '../components/Layout.server';

function BoxFallback() {
  return (
    <div className="bg-white p-12 shadow-xl rounded-xl text-gray-900 h-60"></div>
  );
}


export default function Contact() {
  return (
    <div className="">
      <Layout>
      <Suspense fallback={<BoxFallback />}>
      <div className="text-center w-full h-128 bg-shop bg-cover flex justify-center items-center">
        <div className="w-1/2 h-60 bg-white rounded-xl border-4 border-[#84754E] space-y-4 pt-6 px-">
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
      <div className="text-center w-full h-96 bg-blue-wave bg-cover flex justify-center items-center">
      <div className="w-3/5 h-60 bg-white rounded-xl border-4 border-[#84754E] space-y-4 pt-6">
          <p className='text-xl'>GET IN TOUCH</p>
          <div className='flex flex-row justify-center'>
          <p className='pr-2'>Call now on </p>
          <p className='font-bold'>(066)71 24701</p>
          </div>
          <p>Fill out our contact form now and we will</p>
          <p>get back to you ASAP</p>
          <Link
          to={`/pages/contact`}
          className="inline-block bg-[#84754E] text-white text-lg font-medium rounded-xl py-1 px-8 uppercase"
        >
          Contact Us
        </Link>
        </div>
      </div>
      <div className='w-full bg-white h-128'>
          <div className='flex justify-center bg-ryles-gold h-12 items-center w-full'>
            <p className='text-xl text-white font-bold'>About Ryles Pharmacy</p>
          </div>
          <div className='flex flex-row pt-11 justify-center h-96'>
            <div className='flex w-1/4 flex-col mr-20'>
              <p className='pb-5'>Ryles pharmacy is open six days a week at 35 ashe Street, with our dedicated team on hand to help with all your needs.</p>
              <p className='pb-5'>We are a fully locally owned pharmacy with a staff that puts focus on superior customer care and efficient service with a smile</p>
              <p className='pb-5'>Click below to learn more about the staff at Ryles Pharmacy</p>
              <Link
              to={`/pages/about`}
                className="bg-[#84754E] text-white text-lg font-medium rounded-xl py-1 px-8 uppercase w-60 flex justify-center items-center"
                >
              Learn More
              </Link>
            </div>
            <div className='flex w-1/3 flex-col bg-inside-store bg-cover rounded-xl '></div>
          </div>
        </div>
        <div className="text-center w-full h-96 bg-blue-wave bg-cover flex justify-center items-center">
      <div className="w-3/5 h-60 bg-white rounded-xl border-4 border-[#84754E] space-y-4 pt-6">
          <p className='text-xl'>GET IN TOUCH</p>
          <div className='flex flex-row justify-center'>
          <p className='pr-2'>Call now on </p>
          <p className='font-bold'>(066)71 24701</p>
          </div>
          <p>Fill out our contact form now and we will</p>
          <p>get back to you ASAP</p>
          <Link
          to={`/pages/contact`}
          className="inline-block bg-[#84754E] text-white text-lg font-medium rounded-xl py-1 px-8 uppercase"
        >
          Contact Us
        </Link>
        </div>
       
      </div>
      </Suspense>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <Suspense fallback={<BoxFallback />}>
        </Suspense>
        <Suspense fallback={<BoxFallback />}>
        </Suspense>
      </div>
      </Layout>
    </div>
  );
}

const QUERY = gql`
  query welcomeContent {
    shop {
      name
    }
    products(first: 250) {
      edges {
        node {
          handle
        }
      }
    }
    collections(first: 250) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;
