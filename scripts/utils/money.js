export function toDollars(priceCents){
  return (priceCents / 100).toFixed(2);
}

export default toDollars;