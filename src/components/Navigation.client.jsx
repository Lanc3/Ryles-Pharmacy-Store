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
        <div className=" w-8/12 flex justify-between items-center">
          <div className="flex">
          <Image src={logo} width="90" height="90" />
          </div>
          <div className="">
          <nav className="flex flex-row p-10">
            <ul className="flex">
            <li>
              <Link
                    to={`/`}
                    className="p-10 hover:opacity-80 text-[#2D4C85]"
                  >Home</Link>
              </li>
              <li>
              <Link
                    to={`/collections/frontpage`}
                    className="p-10 hover:opacity-80 text-[#2D4C85]"
                  >Shop</Link>
              </li>
              <li>
              <Link
                    to={`/about`}
                    className="p-10 hover:opacity-80 text-[#2D4C85]"
                  >About</Link>
              </li>
              <li>
              <Link
                    to={`/contact`}
                    className="p-10 hover:opacity-80 text-[#2D4C85]"
                  >Contact</Link>
              </li>
            </ul>
          </nav>
          </div>
      </div>
  );
  }