// index.js

import R from 'ramda'
import dom, { renderDOM } from 'utils/dom'
import compose from 'utils/compose'
import { IOContainer } from 'utils/containers'
import Slideshow from './components/Slideshow'



// setItem :: (Str, *) -> IOContainer
const setItem = (key, val) => {
  return IOContainer.of(() => {
    localStorage.setItem(key, JSON.stringify(val))
  })
}


// getItem :: Str -> IOContainer
const getItem = (itemKey) => IOContainer
  .of(() => localStorage.getItem(itemKey))


// groupByProp :: Str -> [Obj] -> [[Obj]]
const groupByProp = (key) => R.compose(
  R.groupWith(R.eqProps(key)),
  R.sortBy(R.prop(key))
)

const update = renderDOM((state) => {
  return (
    <div className='container'>
      <h1>{ state.title }</h1>
      <Slideshow slides = { state.slides || [] } />
    </div>
  )
}, document.getElementById('packtPubApp'))

// setupSlides :: Str -> [[Object]]
const setupSlides = compose.log(
  R.over(R.lensProp('slides'), groupByProp('id')),
  JSON.parse
)

getItem('slides')
  .map(setupSlides)
  .map(update)
  .perform()


./app/components/Slideshow.jsx 
import dom from 'utils/dom'
import R from 'ramda'



export default () => {
  return (
    <div>
      <h2>Welcome to the show! The slide show baby!!</h2>
    </div>
  )
}



app/components/SlidesColumns.jsx 
import dom, { fromHTML } from 'utils/dom'
import R from 'ramda'

// slideClass :: Slide -> String
const slideClass = (slide) => `slide ${ !slide.active ? '' : 'active' }`

// Img :: Obj -> VNode
const Img = ({ src, alt = ''}) => <img src={ src } alt={ alt } />


// Column :: [Slide] -> VNode
const Slide = (slide) => (
  <div style={ slide.style } className={ slideClass(slide) }>
    <div className='header'>
      <div className='header title'>
        <h3 className='display-4'>
          <strong className='lead'>
            { slide.id }/{ slide.order || 0 }
          </strong> - { slide.title || '' }
        </h3>
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
export const Column = (colSlides) => (
  <div className='presentation column'>
    { R.map(Slide, colSlides) }
  </div>
)





// app/data/slides.js

/**
 * State (Stored in LocalStorage)
 * {
 *   title: str
 *   slides: [ SlideObjects ]
 * }
 */
export default {
  title: "Packt Pub Slideshow",
  slides: [
    {
      id: 1,
      order: 0,
      title: 'Welcome to the Amazing Presentation',
      html: '<h3 class="lead">This presentation is brought to you by <small>Functional Programming and Packt Publishing</small></h3>',
      text: 'Enjoy! Copyright 2017',
      img: {
        src: 'img/slide-one.png',
        alt: 'An amazing presentation',
      }
    },
    {
      id: 2,
      title: 'I/O Here We Go!',
      text: 'Input and Output are what make the world go round.'
    }, {
      id: 4,
      title: 'Thanks for attending the Input/Output paradox presentation!',
      html: '<p>This is the final slide I am afraid</p>',
    },
    {
      id: 2,
      title: 'I/O Here We Go!',
      order: 3,
      html: `<ul>
               <li>Nobody knows where "input" comes from</li>
               <li>But if we analyze Input, we see the word "put"</li>
             </ul>`,
      text: 'Input and Output are what make the world go round.'
    },
    {
      id: 2,
      title: 'I/O Here We Go!',
      order: 1,
      html: `<ul>
               <li>Nobody knows where "input" comes from</li>
             </ul>`,
      text: 'Input and Output are what make the world go round.'
    },
    {
      id: 1,
      order: 1,
      title: 'Welcome to the Amazing Presentation',
      html: '<h3 class="lead">This presentation is brought to you by <small>Functional Programming and Packt Publishing</small></h3>',
      text: 'Enjoy! Copyright 2017',
      img: {
        src: 'img/slide-one.png',
        alt: 'An amazing presentation',
      }
    },
    {
      id: 3,
      order: 1,
      title: 'Third Slide',
      html: '<p>I ran out of reliable information for this story</p>',
      style: {
        background: '#00838f',
        color: '#dad3df',
      }
    },
    {
      id: 2,
      title: 'I/O Here We Go!',
      order: 2,
      html: `<ul>
               <li>Nobody knows where "input" comes from</li>
               <li>But if we analyze Input, we see the word "put"</li>
               <li>We see that Input is related to Output. We can prove this by: <pre>In + ( Output - Out ) = Input!</pre></li>
             </ul>`,
      text: 'Input and Output are what make the world go round.',
    },
  ],
}
