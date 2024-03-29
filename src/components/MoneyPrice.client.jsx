import { useMoney } from '@shopify/hydrogen';

/**
 * A client component that defines the currency code, currency symbol, and amount of a product
 */
export default function MoneyPrice({money}) {
  const {currencyCode, currencyNarrowSymbol, amount} = useMoney(money);
  return (
    <span className="text-lg text-[#ebb93c] text-md m-5">
      {currencyCode}
      {currencyNarrowSymbol}
      {amount}
    </span>
  );
}
