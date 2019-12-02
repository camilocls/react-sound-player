import React from 'react'
import classNames from 'classnames'
import ProgressTrack from '../ProgressTrack/ProgressTrack'
import './TrackInfo.scss'

const TrackInfo = (props) => {
  const { track, isPlaying, actions } = props

  return (
    <div className={classNames('track', props.className, { 'track--playing': isPlaying })}>
      <h2 className="track__album">{track.album}</h2>
      <h3 className="track__name">{track.artist} - {track.name}</h3>
      <ProgressTrack 
        actions={actions}
        track={track} 
        isPlaying={isPlaying}
      />
    </div>
  )
}

export default TrackInfo