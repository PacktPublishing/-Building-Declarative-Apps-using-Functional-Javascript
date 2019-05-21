import R from 'ramda'
import dom, { renderDOM } from 'utils/dom'
import compose from 'utils/compose'
import { createStore } from './data/redux-ish'
import Slideshow from './components/Slideshow'
import Controls from './components/Controls'
import slides from './data/slides'
import mainReducer from './data/reducers'
import actionHistMiddle from './utils/action-history-middleware'
// initialState :: Object
const initialState = {
  title: '',
  presentation: {
    slides:: [],
    slidePos: [0,0],
  },
  settings: {},
}


const {
  getState, dispatch, subscribe
} = createStore(mainReducer, initialState, actionHistMiddle)


const update = renderDOM((state) => {
  const { presentation, settings, title } = state
  return (
    <div>
      <h1>{ title }</h1>
      <Slideshow presentation={ presentation } settings={ settings } />
    </div>
  )
}, document.getElementById('packtPubApp'))

subscribe(() => {
  update(getState(), dispatch)
})

dispatch({ type: 'TEST_ACTION' })
dispatch({ type: 'SETUP_SLIDES', value: slides })
