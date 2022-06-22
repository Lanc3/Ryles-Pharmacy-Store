import { Link } from '@shopify/hydrogen/client';
import { useEffect, useState } from 'react';

import CartToggle from './CartToggle.client';
import { useCartUI } from './CartUIProvider.client';
import Navigation from './Navigation.client';

/**
 * A client component that specifies the content of the header on the website
 */
export default function Header({pages, collections, storeName}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const {isCartOpen} = useCartUI();

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    setScrollbarWidth(scrollbarWidth);
  }, [isCartOpen]);

  return (
    <header className="h-20 lg:h-32 flex flex-row" role="banner">
      <div
        className={`fixed z-20 h-22 lg:h-32 w-full border-b border-gray-200 px-6 md:px-8 md:py-6 lg:pt-8 lg:pb-0 mx-auto bg-white ${
          isMobileNavOpen ? '' : 'bg-opacity-95'
        }`}
      >
        <div
          className="h-full flex lg:flex-col place-content-between"
          style={{
            paddingRight: isCartOpen ? scrollbarWidth : 0,
          }}
        >
          <div className="text-center w-full flex justify-between items-center">
            <Navigation
              pages={pages}
              collections={collections}
              storeName={storeName}
              isOpen={isMobileNavOpen}
            />
            <Link
              className="font-black uppercase text-3xl tracking-widest"
              to="/"
            ></Link>
            <CartToggle
              handleClick={() => {
                if (isMobileNavOpen) setIsMobileNavOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}