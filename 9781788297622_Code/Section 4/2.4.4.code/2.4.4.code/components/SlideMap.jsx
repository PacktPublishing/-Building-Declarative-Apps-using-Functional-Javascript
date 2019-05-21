import R from 'ramda'
import dom from 'utils/dom'

export default ({ slides }) => {
  return (
    <div>
      <items className='slide-map'>
        { slides.map((column, i) => {
          return (<span className='column' >
                { column.map((slide, j)=> {
                  return (<span className={ `slide-item ${ slide.active ? 'active' : '' }` } />)
                }) }
              <span className="clearfix"></span>
                </span>
          )
        })
        }
      </items>
      <div className="clearfix"></div>

    </div>
  )
}
