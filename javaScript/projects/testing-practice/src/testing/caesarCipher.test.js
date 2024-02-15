import caesarCipher from '../containers/caesarCipher';

test(`caesarCipher('hello', 2)`, () => {
  expect(caesarCipher('hello')).toMatch(/JGNNQ/);
});

test(`caesarCipher('Beware the Ides of March', 7)`, () => {
  expect(caesarCipher('Beware the Ides of March')).toMatch(/ILDHYL AOL PKLZ VM THYJO/);
});
