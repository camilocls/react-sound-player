import React, { useState } from 'react'
import classNames from 'classnames'
import './Controls.scss'
import { ReactComponent as IconPrev } from '../../assets/icon-prev.svg'
import { ReactComponent as IconNext } from '../../assets/icon-next.svg'
import { ReactComponent as IconPlay } from '../../assets/icon-play.svg'
import { ReactComponent as IconPause } from '../../assets/icon-pause.svg'

const Controls = (props) => {
  const { actions, isPlaying } = props
  const { setStatePlayer, setNextTrack, setPrevTrack } = actions

  return (
    <div className={classNames('controls', props.className)}>
      <button onClick={setPrevTrack} className="controls__button controls__prev">
        <IconPrev />
      </button>
      {isPlaying ? (
        <button 
          onClick={() => setStatePlayer(false)} 
          className="controls__button controls__pause"
        >
          <IconPause />
        </button>
      ) : (
        <button 
          onClick={() => setStatePlayer(true)} 
          className="controls__button controls__play"
        >
          <IconPlay />
        </button>
      )}
      <button onClick={setNextTrack} className="controls__button controls__next">
        <IconNext />
      </button>
    </div>
  )
}

export default Controls