import dom, { fromHTML } from 'utils/dom'
import R from 'ramda'

// slideClass :: Slide -> String
const slideClass = (slide) => `slide ${ !slide.active ? '' : 'active' }`

// Img :: Obj -> VNode
const Img = ({ src, alt = ''}) => <img src={ src } alt={ alt } />


// Slide :: [Slide] -> VNode
const Slide = (slide) => (
  <div style={ slide.style } className={ slideClass(slide) }>
    <div className='header'>
      <div className='header title'>
        <h1 className='display-4'>
          <strong className='lead'>
          </strong> { slide.title || '' }
        </h1>
      </div>
    </div>
    <div className='body'>
      { slide.html ? fromHTML(slide.html) : null }
    </div>
    <div className='img img-responsive'>
      { slide.img ? Img(slide.img) : null }
    </div>
    <footer className='footer'>
      { slide.text ? <blockquote>{ slide.text }</blockquote> : null }
    </footer>
  </div>
)


// Column :: [Slide] -> VNode
export const Column = ({ slides, fullscreen = false }) => (
  <div
    className={`presentation column ${
      fullscreen ? 'fullscreen' : ''
    }`}>
    { R.map(Slide, slides) }
  </div>
)
