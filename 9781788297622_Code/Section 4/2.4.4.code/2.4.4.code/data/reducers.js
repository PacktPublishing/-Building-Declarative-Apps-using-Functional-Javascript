import R from 'ramda'
import compose from 'utils/compose'
import { setupSlides, activeSlide } from 'utils/slide-utils'


// mainReducer :: (Object, Object) -> Object
function mainReducer (state, action = {}) {

  const { settings = {} } = state
  const { type, value } = action

  switch (type) {
    case 'SETUP_SLIDES':
      return { ...state, slides: setupSlides(action.value) }

    case 'MOVE_TO_SLIDE':
      const slidePos = value
      const slides = state.slides || []
      return { ...state, slides: activeSlide(slidePos)(slides), slidePos }

    case 'TEST_ACTION':
      return R.merge(state, { title: 'Packt Pub Presentation App' })

    case 'CUSTOM_TITLE':
      const title = value
      return { ...state, title } // same as Object.assign({}, state, { title })

    case 'CHANGE_SETTING':
      return { ...state, settings: R.merge(settings, R.fromPairs([value]))}

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
