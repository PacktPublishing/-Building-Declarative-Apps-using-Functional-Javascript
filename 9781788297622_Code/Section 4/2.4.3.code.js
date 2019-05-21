/*******************************
 *
 * ./app/index.jsx
 *
 */

import R from 'ramda'
import dom, { renderDOM } from 'utils/dom'
import compose from 'utils/compose'
import { createStore } from './data/redux-ish'
import Slideshow from './components/Slideshow'
import mainReducer from './data/reducers'

// initialState :: Object
const initialState = { title: '', money: 0 }


const middleware = R.curry((createStore, reducer, initState) => {

  const actionHistory = []
  const store = createStore((state, action) => {
    switch (action.type) {
      case '@@/JUMP':
        return R.reduce((accState, nextAction) => {
          console.log(nextAction.type, nextAction.value)
          return reducer(accState, nextAction)
        }, initState, action.value)

      default:

        return reducer(state, action)
    }
  }, initState)

  window.changeState = (i) => {
    actionHistory[i] && store.dispatch({ type: '@@/JUMP', value: R.slice(0, i, actionHistory) })
  }

  const middleDispatch = (action) => {
    store.dispatch(action)
    actionHistory.push(action)
    console.log(actionHistory)
  }

  return {
    getState: store.getState,

    dispatch: middleDispatch,

    subscribe: store.subscribe,
  }
})


const {
  getState, dispatch, subscribe
} = createStore(mainReducer, initialState, middleware)


const update = renderDOM((state) => {
  return (
    <div className='container'>
    <h1>{ state.title }</h1>
  <h5>MONEY: { state.money }</h5>
  <Slideshow  slides={ state.slides || [] } />
  </div>
  )
}, document.getElementById('packtPubApp'))


subscribe(() => {
  update(getState(), dispatch)
})

dispatch({ type: 'TEST_ACTION' })
dispatch({
  type: 'DEPOSIT',
  value: 60,
})
dispatch({
  type: 'WITHDRAW',
  value: 20,
})
dispatch({
  type: 'DEPOSIT',
  value: 200,
})
dispatch({
  type: 'DEPOSIT',
  value: 10,
})




/*******************************
 *
 * ./app/data/reducers.js
 *
 */
import R from 'ramda'
import compose from 'utils/compose'


// mainReducer :: (Object, Object) -> Object
function mainReducer (state, action = {}) {

  switch (action.type) {
    case 'TEST_ACTION':
      return R.merge(state, { title: 'Packt Pub Presentation App' })

    case 'CUSTOM_TITLE':
      const title = action.type
      return { ...state, title } // same as Object.assign({}, state, { title })

    case 'DEPOSIT':
      return R.over(
        R.lensProp('money'), R.add(action.value), state
      )

    case 'WITHDRAW':
      const money = state.money - action.value
      return { ...state, money }

    default:
      // We don't know how to handle this action
      return state
  }
}

export default mainReducer



/*******************************
 *
 * ./app/data/redux-ish.jsx
 *
 */
import R from 'ramda'
import colorLog from 'utils/colorLog'

const logAction = colorLog('Action', 'rgb(179, 63, 132)')
const logCurrentState = colorLog('State: ', 'rgb(177, 116, 45)')
const logNextState = colorLog('Next State: ', 'rgb(53, 69, 180)')

// State :: Object
// Action :: Object { type }
// Store :: Object { subscribe, dispatch, getState }
// createStore :: (((State, Action) -> State), State) -> Store
export function createStore(reducer, state, middleware) {
  let currentState = state
  let currentSubscribers = []
  let nextSubscribers = []
  let isDispatching = false

  if (R.is(Function, middleware)) {
    return middleware(createStore)(reducer, state)
  }

  const getState = () => currentState
  const subscribe = listenerFn => {
    nextSubscribers = nextSubscribers.slice(0)
    nextSubscribers.push(listenerFn)
  }

  const dispatch = action => {
    if (isDispatching) {
      throw new Error('Dispatch should never be called inside of a reducer!')
    }
    isDispatching = true

    try {
      const nextState = reducer(currentState, action)
      logAction(action)
      logCurrentState(currentState)
      logNextState(nextState)

      currentState = nextState
    } finally {
      isDispatching = false
    }

    currentSubscribers = nextSubscribers
    R.map(R.call, currentSubscribers)
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}
