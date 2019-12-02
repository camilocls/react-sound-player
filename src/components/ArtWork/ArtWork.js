import React from 'react'
import classNames from 'classnames'
import './ArtWork.scss'
import artworkDefault from '../../assets/artwork.jpg'

const ArtWork = (props) => {
  const { isPlaying, artwork, isMobile } = props
  const artworkImage = artwork ? artwork : artworkDefault

  return (
    <div className={classNames(props.className, { 'artwork--playing': isPlaying, 'artwork': !isMobile, 'artwork-mobile': isMobile })}>
      <div
        style={{ backgroundImage: `url(${artworkImage})` }} 
        className={classNames({'artwork__image': !isMobile, 'artwork-mobile__image': isMobile})}
      />
    </div>
  )
}

export default ArtWork