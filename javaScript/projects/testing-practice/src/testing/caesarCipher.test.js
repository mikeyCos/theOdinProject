import caesarCipher from '../containers/caesarCipher';

test(`caesarCipher('a', 2)`, () => {
  expect(caesarCipher('a', 2)).toMatch(/^C$/);
});

test(`caesarCipher('hello', 2)`, () => {
  expect(caesarCipher('hello', 2)).toMatch(/^JGNNQ$/);
});

test(`caesarCipher('hello', 26)`, () => {
  expect(caesarCipher('hello', 26)).toMatch(/^HELLO$/);
});

test(`caesarCipher('Beware the Ides of March', 7)`, () => {
  expect(caesarCipher('Beware the Ides of March', 7)).toMatch(/^ILDHYL AOL PKLZ VM THYJO$/);
});

test(`caesarCipher('!', 18)`, () => {
  expect(caesarCipher(`!`, 18)).toMatch(/^R$/);
});

test(`caesarCipher('"', 8)`, () => {
  expect(caesarCipher(`"`, 8)).toMatch(/^"$/);
});

test(`caesarCipher('Let's carve him as a dish fit for the gods!', 18)`, () => {
  expect(caesarCipher(`Let's carve him as a dish fit for the gods!`, 18)).toMatch(
    /^\?WG\'FNUSEIWNZ \!NSFNSNV FZNX GNXBENGZWNYBVFR$/,
  );
});

test(`caesarCipher('hello world', -5)`, () => {
  expect(caesarCipher(`hello world`, -5)).toMatch(/^CZGGJ RJMGY$/);
});
