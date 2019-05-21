const R = require('ramda')
const compose = require('../utils/compose')
const getData = require('../data/users')

const B = (f) => (g) => (x) => f(g(x))
const D = (f) => (x) => (g) => (y) => f(x)(g(y))
const S = R.curry((f, g, x) => f(x)(g(x)))
const K = (x) => (y) => x
const I = (x) => x
const C = (f) => (x) => (y) => f(y)(x)
const T = R.curry((x, f) => f(x))

const data = R.reverse(getData())

// getUserById :: String -> User
const getUserById =  R.compose(R.head, T(data), R.filter, R.propEq('id'))

// greeting :: String -> String
const greeting = R.concat('Greetings, ')

// nameArr :: Obj -> Ar
const nameArr = S(B(R.prepend)(R.prop('first')) , (B(Array)(R.prop('last'))))

// userGreeting :: User -> String
const userGreeting = compose(greeting, R.join(' '), nameArr, R.prop('name'))

// main :: String -> String
const main = compose.clog(userGreeting, getUserById)

main('59110bb415e9c57f9c3c5c32')

/**** Additional Code that was used through the video
 *

 // const predicate = (id) => (user) => R.prop('id', user) === id
 // const predicate = (id) => (user) => R.equals(id, R.prop('id', user))
 // const predicate = (id) => (user) => R.equals(id)(R.prop('id', user))
 // const predicate = id => user =>  D(R.equals)(id)(R.prop('id'))(user)
 // const predicate = id => user =>  C(D(R.equals))(R.prop('id'))(id)(user)
 // const predicate = C(D(R.equals))(R.prop('id'))
 // const predicate = C(D(R.propEq('id')))(I)
 // const predicate = C(D(R.propEq('id')))(I)
 // const predicate = (S(S(K(S(K(S))(K)))(S))(K(K)))(S(K(S(K(S))(K)))(R.equals))(R.prop('id'))


 // const getUserById = R.compose(R.head, T(getData()), R.filter, predicatePropId)
 // const getUserById = (id) => R.head(T(data)(R.filter(predicate(id))))

 // getUserById :: Int -> User
 const getUserById =  R.compose(R.head, T(data), R.filter, R.propEq('id'))

 // giveUserGreeting :: User -> String
 //const userGreeting = (user) => R.concat('Greetings, ')(R.concat(user.name.first)(R.concat(' ', user.name.last)))
 // const greeting = user => R.concat(J(R.concat)('Greetings, ')(' ')(user.name.first), user.name.last)
 // greeting :: String -> String
 const greeting = R.concat('Greetings, ')
 // nameArr :: Obj -> Ar
 //const nameArr = n => [R.prop('first', n), R.prop('last', n)]
 // S = f g x => f(x)(g(x))
 //              R.prepend(R.prop('first'))(B(Array, R.prop('last')))

 //const nameArr = nameObj => R.prepend( R.prop('first')(nameObj) ) ( Array(R.prop('last')(nameObj)))
 //const nameArr =            S(B(R.prepend, R.prop('first'))) (B(Array, R.prop('last')))

 //const nameArr = x => R.prepend(R.prop('first')(x))(Array(R.prop('last')(x)))
 //const nameArr = x => R.prepend(R.prop('first')(x)) (B(Array)(R.prop('last'))(x))
 const nameArr = S(B(R.prepend)(R.prop('first')) , (B(Array)(R.prop('last'))))
 //const userGreeting = (user) => greeting((R.concat(user.name.first)(R.concat(' ', user.name.last))))

 // main :: String -> String
 const userGreeting = compose(greeting, R.join(' '), nameArr, R.prop('name'))
 const main = compose.clog(userGreeting, getUserById)

 main('59110bb415e9c57f9c3c5c32')


 */
