export const name = 'dan';
// require('../sass/base.scss'); can use either?
import '../sass/alt.scss';

export function sayName() {
  console.log(`in sayName, Yo: ${name}`);
}

export function sayName2() {
  sayName();
}

export default function () {
  console.log('i am the default module export!');
}
