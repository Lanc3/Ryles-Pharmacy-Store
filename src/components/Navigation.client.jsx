import { FocusTrap } from '@headlessui/react';
import { Image } from '@shopify/hydrogen';
import { Link } from '@shopify/hydrogen/client';
import { Fragment, useEffect } from 'react';
import logo from '../assets/Logo.png';

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
        <div className=" w-full flex items-center ">
          <div className="flex">
          <Image src={logo} width="150" height="150" />
          </div>
          <div className="flex justify-center w-full pr-28 ">
          <nav className="flex flex-row">
            <ul className="flex">
            <li>
              <Link
                    to={`/`}
                    className="m-5 p-1 outline-none hover:border-ryles-blue border-transparent border-2 hover:border-current text-[#2D4C85] rounded-lg"
                  >Home</Link>
              </li>
              <li>
              <Link
                    to={`/collections/frontpage`}
                    className="m-5 p-1 outline-none hover:border-ryles-blue border-transparent border-2 hover:border-current text-[#2D4C85] rounded-lg"
                  >Shop</Link>
              </li>
              <li>
              <Link
                    to={`/about`}
                    className="m-5 p-1 outline-none hover:border-ryles-blue border-transparent border-2 hover:border-current text-[#2D4C85] rounded-lg"
                  >About</Link>
              </li>
              <li>
              <Link
                    to={`/contact`}
                    className="m-5 p-1 outline-none hover:border-ryles-blue border-transparent border-2 hover:border-current text-[#2D4C85] rounded-lg"
                  >Contact</Link>
              </li>
            </ul>
          </nav>
          </div>
      </div>
  );
  }