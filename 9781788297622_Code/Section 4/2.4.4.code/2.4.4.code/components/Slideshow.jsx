import dom from 'utils/dom'
import { Column } from './SlidesColumns'
import R from 'ramda'



export default ({ slides = [], settings = {}}) => {
  return (
    <div>
      { R.map((colSlides) => (
        <Column fullscreen={ R.propOr(false, 'fullscreen', settings) }
                slides={ colSlides } />
      ), slides) }
    </div>
  )
}
