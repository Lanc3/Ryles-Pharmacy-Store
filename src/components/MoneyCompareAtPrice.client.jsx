import { useMoney } from '@shopify/hydrogen';

/**
 * A client component that renders a product's compare at price
 */
export default function MoneyCompareAtPrice({money}) {
  const {amount, currencyNarrowSymbol} = useMoney(money);
  return (
    <span className="line-through text-lg mr-2.5 text-ryles-gold">
      {currencyNarrowSymbol}
      {amount}
    </span>
  );
}
