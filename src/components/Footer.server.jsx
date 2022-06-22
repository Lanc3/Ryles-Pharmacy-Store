import { Link } from '@shopify/hydrogen';

/**
 * A server component that specifies the content of the footer on the website
 */
export default function Footer({collection, product}) {
  return (
    <footer role="contentinfo">
      <div className="relative bg-white border-t border-b border-black border-opacity-5">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-12 grid grid-cols- md:grid-cols-4 gap-18">
          <div>
            <h2 className="text-md font-medium uppercase mb-4 text-ryles-blue">Legal</h2>
            <ul className="mt-8 space-y-1">
              <li className="flex items-center text-sm font-medium text-ryles-blue hover:text-gray-900">
                <Link to="terms">Terms of Service</Link>
              </li>
              <li className="flex items-center text-sm font-medium text-ryles-blue hover:text-gray-900">
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li className="flex items-center text-sm font-medium text-ryles-blue hover:text-gray-900">
                <Link to="/shipping">Shipping Policy</Link>
              </li>
              <li className="flex items-center text-sm font-medium text-ryles-blue hover:text-gray-900">
                <Link to="/refund">Refund Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-md font-medium uppercase mb-4 text-ryles-blue">
              Address
            </h2>
            <ul className="mt-8 space-y-4">
              <li className=" text-sm font-medium text-ryles-blue hover:text-gray-900">
                <p>35 Ashe Street</p>
                <p>Tralee,Kerry</p>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-md font-medium uppercase mb-4 text-ryles-blue">Contact</h2>
            <ul className="mt-8 space-y-4">
            <li className=" text-sm font-medium text-ryles-blue hover:text-gray-900">
                <p>(066)7124701</p>
                <p>FB @rylespharmacy</p>
                <p>IN @rylespharmacy</p>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-md font-medium uppercase mb-4 text-ryles-blue">Links</h2>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center text-sm font-medium text-ryles-blue hover:text-gray-900">
                <Link to="/">Home</Link>
              </li>
              <li className="flex items-center text-sm font-medium text-ryles-blue hover:text-gray-900">
                <Link to={`/products/${product?.handle}`}>Products</Link>
              </li>
              <li className="flex items-center text-sm font-medium text-ryles-blue hover:text-gray-900">
                <Link to={`/collections/${collection?.handle}`}>
                  Collection
                </Link>
              </li>
              <li className="flex items-center text-sm font-medium text-ryles-blue hover:text-gray-900">
                <Link to="/404">404</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-6 px-4 md:px-8 bg-gray-50 flex justify-center">
        <p className="text-gray-600">© {new Date().getFullYear()} Ryles Pharmacy</p>
      </div>
    </footer>
  );
}
