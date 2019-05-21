// 2.1
const R = require('ramda');
const { prop, compose, add } = R;
const { log } = console;

const user1 = { name: 'Michael', email: 'm@m.com' };



const greeting = compose(R.concat('Hello '), prop('name'));

log(greeting({ name: 'World' }));




// Next part
const compose = (f, g) => (x) => f(g(x));

const compose3 = (f, g, h) => (x) => f(g(h(x)));

const f = x => 'f(' + x
const g = x => 'g(' + x
const h = x => 'h(' + x
const x = 'x)))'

compose3(f, g, h) === f(g(h(x)))


