import reverseString from '../containers/reverseString';

test('racecar reversed is racecar', () => {
  expect(reverseString('racecar')).toMatch(/racecar/);
});

test('Moon reversed is nooM', () => {
  expect(reverseString('Moon')).toMatch(/nooM/);
});

test('L337! reversed is !733L', () => {
  expect(reverseString('L337!')).toMatch(/!733L/);
});

test('[@.@]! reversed is !]@.@[', () => {
  expect(reverseString('[@.@]!')).toMatch(/!\]@.@\[/);
});
