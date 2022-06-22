import { FocusTrap } from '@headlessui/react';
import { Image } from '@shopify/hydrogen';
import { Link } from '@shopify/hydrogen/client';
import { Fragment, useEffect } from 'react';
import logo from '../assets/Logo.jpg';

let scrollPosition = 0;
/**
 * A client component that defines the navigation for a web storefront
 */
export default function Navigation({isOpen, pages, collections}) {
  const OpenFocusTrap = !isOpen ? FocusTrap : Fragment;

  useEffect(() => {
    if (isOpen) {
      scrollPosition = window.scrollY;
      document.body.style.position = 'fixed';
    } else if (document.body.style.position) {
      document.body.style.position = '';
      window.scrollTo(0, scrollPosition);
    }
  }, [isOpen]);

  return (
        <div className="flex flex-row items-center">
          <div className=" lg:block w-20 mr-20 items-stretch">
          <Image src={logo} width="90" height="90" />
          </div>
          <div className=" lg:block text-center">
          <nav className=" lg:block text-center items-stretch flex">
            <ul className="md:flex items-center justify-center">
            <li>
              <Link
                    to={`/`}
                    className="block p-4 hover:opacity-80 text-[#2D4C85]"
                  >Home</Link>
              </li>
              <li>
              <Link
                    to={`/collections/frontpage`}
                    className="block p-4 hover:opacity-80 text-[#2D4C85]"
                  >Shop</Link>
              </li>
              <li>
              <Link
                    to={`/about`}
                    className="block p-4 hover:opacity-80 text-[#2D4C85]"
                  >About</Link>
              </li>
              <li>
              <Link
                    to={`/contact`}
                    className="block p-4 hover:opacity-80 text-[#2D4C85]"
                  >Contact</Link>
              </li>
            </ul>
          </nav>
          </div>
      </div>
  );
  }