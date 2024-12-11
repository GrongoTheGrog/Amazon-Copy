export function toDollars(priceCents){
  priceCents = Math.round(priceCents);
  return (priceCents / 100).toFixed(2);
}
