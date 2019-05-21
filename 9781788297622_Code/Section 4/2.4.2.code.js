/***********
 * app/index.jsx
 */
import R from 'ramda'
import dom, { renderDOM } from 'utils/dom'
import compose from 'utils/compose'
import { createStore } from './data/redux-ish'

// initialState :: Object
const initialState = { title: '', slides: [] }

// mainReducer :: (Object, Object) -> Object
const mainReducer = (state, action) => {
  switch (action.value) {
    case 'TEST_ACTION':
      return R.merge(state, { title: 'Packt Pub Presentation App' })
    case default:
      return state
  }
}



const {
  getState, dispatch, subscribe
} = createStore(mainReducer, initialState)


const update = renderDOM((state) => {
  return (
    <div className='container'>
      <h1>{ state.title }</h1>
    </div>
  )
}, document.getElementById('packtPubApp'))



/************
 * app/data/redux-ish.js
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


