import React, { useState, useEffect, useRef } from 'react'
import { getOffsetLeft } from '../../utils/utils'
import './ProgressTrack.scss'

const ProgressTrack = (props) => {
  const { track, isPlaying, actions } = props
  const { setStatePlayer } = actions
  const [audio] = useState(new Audio())
  const [currentTime, setCurrentTime] = useState('00:00')
  const [duration, setDuration] = useState('00:00')
  const [currentProgress, setCurrentProgress] = useState(0)
  const bar = useRef(null)
  const progressBar = useRef(null)
  const progressBarHover = useRef(null)
  const progressBarHoverTime = useRef(null)
  
  useEffect(() => {
    audio.loop = false
    let currentMinutes, 
        currentSeconds,
        durationMinutes,
        durationSeconds,
        playProgress

    audio.addEventListener('timeupdate', () => {
      currentMinutes = Math.floor(audio.currentTime / 60)
      currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60)
      playProgress =(audio.currentTime / audio.duration) * 100
      currentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds 
      currentMinutes = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes 
      
      if(isNaN(currentSeconds) || isNaN(currentMinutes)) {
        return
      }

      setCurrentTime( `${currentMinutes}:${currentSeconds}` )

      durationMinutes = Math.floor(audio.duration / 60)
      durationSeconds = Math.floor(audio.duration - durationMinutes * 60)
      
      if(isNaN(durationSeconds) || isNaN(durationMinutes)) {
        return
      }

      durationSeconds = durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds 
      durationMinutes = durationMinutes < 10 ? `0${durationMinutes}` : durationMinutes
      setDuration( `${durationMinutes}:${durationSeconds}` )
      
      progressBar.current.style.width = `${playProgress}%`
      
      if( playProgress === 100 ) {
        progressBar.current.style.width = 0
        setCurrentTime('00:00')
        setStatePlayer(false)
      }
    })
  }, [])

  useEffect(() => {
    if (track && track.url && audio) {
      audio.src = track.url
      audio.load()
    }
    if (isPlaying) {
      audio.play()
    }
    setDuration('00:00')
  }, [track])

  useEffect(() => {
    if (isPlaying) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [isPlaying])

  const handleHoverSeek = (event) => {
		const seekHoverPosition = event.clientX - getOffsetLeft(bar.current)
		const seekHoverProgress = audio.duration * (seekHoverPosition / bar.current.offsetWidth)
    const seekMinutesHover = seekHoverProgress / 60;
		let currentMinutesHover = Math.floor(seekMinutesHover);
		let currentSecondsHover = Math.floor(seekHoverProgress - currentMinutesHover * 60);
		
		if( (currentMinutesHover < 0) || (currentSecondsHover < 0) )
      return
		
    if( (currentMinutesHover < 0) || (currentSecondsHover < 0) )
      return
    
    currentMinutesHover = currentMinutesHover < 10 ? `0${currentMinutesHover}` : currentMinutesHover 
    currentSecondsHover = currentSecondsHover < 10 ? `0${currentSecondsHover}` : currentSecondsHover 
    
    if( isNaN(currentMinutesHover) || isNaN(currentSecondsHover) )
      progressBarHoverTime.current.innerText = '--:--'
    else
      progressBarHoverTime.current.innerText = `${currentMinutesHover}:${currentSecondsHover}`    
    
    progressBarHover.current.style.width = `${seekHoverPosition}px`
    progressBarHoverTime.current.style.transform = `translateX(${seekHoverPosition}px)`
    progressBarHoverTime.current.style.opacity = 1

    setCurrentProgress(Math.floor(seekHoverProgress))
  }
  
  const handleLeaveSeek = () => {
    progressBarHover.current.style.width = 0
    progressBarHoverTime.current.style.opacity = 0
  }
  
  const handleClickSeek = () => {
    audio.currentTime = currentProgress
  }
  
  return (
    <div className="progress-track">
      <div className="progress-track__time">
        <div className="progress-track__time-progress">{currentTime}</div>
        <div className="progress-track__time-total">{duration}</div>
      </div>
      <div 
        onMouseMove={handleHoverSeek}
        onMouseLeave={handleLeaveSeek}
        onClick={handleClickSeek}
        ref={bar}
        className="progress-track__bar">
        <div
          ref={progressBar} 
          className="progress-track__progress-bar" />
        <div
          ref={progressBarHover} 
          className="progress-track__progress-bar-hover" />
        <div
          ref={progressBarHoverTime} 
          className="progress-track__progress-bar-hover-time">00:00</div>
      </div>
    </div>
  )
}

export default ProgressTrack