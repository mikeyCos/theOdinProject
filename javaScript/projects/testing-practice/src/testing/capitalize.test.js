import capitalize from '../containers/capitalize';

test('J should be capitalized', () => {
  expect(capitalize('jim')).toMatch(/^[A-Z]{1}\w+/);
});

test('P should be capitalized', () => {
  expect(capitalize('pam')).toMatch(/^[A-Z]{1}\w+/);
});
