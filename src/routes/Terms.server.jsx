import { Image, Link } from '@shopify/hydrogen';
import gql from 'graphql-tag';
import { Suspense } from 'react';
import WaveBackground from '../assets/wave.jpg';
import Layout from '../components/Layout.server';

function BoxFallback() {
  return (
    <div className="bg-white p-12 shadow-xl rounded-xl text-gray-900 h-60"></div>
  );
}
function GradientBackground() {
  return (
    <div className="fixed top-0 w-full h-full overflow-hidden">
      <div className="absolute w-full h-full bg-gradient-to-t from-gray-50" />

      <Image src={WaveBackground} width="100%" height="100%" />
    </div>
  );
}

export default function Terms() {
  return (
      <Layout hero={<GradientBackground/>}>
       <Suspense fallback={null}>
      <div className="text-center w-full h-128 bg-shop bg-cover flex justify-center items-center z-99 relative">
        <div className="w-1/2 h-60 bg-white rounded-xl border-4 border-[#84754E] space-y-4 pt-6 px-">
          <p className='text-xl'>Terms and Conditions</p>
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
      </Suspense>
      </Layout>
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
