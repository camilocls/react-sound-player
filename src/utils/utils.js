export const getOffsetLeft = element => {
  let offsetLeft = 0
  do {
    if ( !isNaN( element.offsetLeft ) ) {
      offsetLeft += element.offsetLeft
    }
  } while( element = element.offsetParent )
  
  return offsetLeft
}