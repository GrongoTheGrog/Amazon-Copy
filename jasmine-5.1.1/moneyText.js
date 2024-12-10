import toDollars from "../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(toDollars(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(toDollars(0)).toEqual('0.00');
  });

  it('works with decimal', () => {
    expect(toDollars(2000.5)).toEqual('20.01');
  })
});