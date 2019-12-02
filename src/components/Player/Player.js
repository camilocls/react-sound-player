import React, { useState, useEffect } from 'react'
import Controls from '../Controls/Controls'
import ArtWork from '../ArtWork/ArtWork'
import TrackInfo from '../TrackInfo/TrackInfo'
import './Player.scss'

const Player = (props) => {
  const [playList, setPlayList] = useState([])
  const [currentTrack, setCurrentTrack] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)

  const getTrackList = async () => {
    await fetch('../data.json', {
      headers: {
        Accept: 'application/json'
      }
    }).then(response => {
      if(!response.ok) {
        throw new Error('Upsss!')
      }
  
      return response
    }).then(async response => {
      const data = await response.json()
      setPlayList(data)
      setCurrentTrack(data[0])
    }).catch(error => {
      console.log(`Error: ${error.message}`)
    })
  }

  const getNextTrack = (song) => {
    const i = playList.indexOf(song)
    if (i === -1) return undefined
    return playList[(i + 1) % playList.length]
  }

  const getPrevTrack = (song) => {
    let i = playList.indexOf(song)
    if (i === -1) return undefined
    if (i === 0) i = playList.length
    return playList[(i - 1) % playList.length]
  }

  const setStatePlayer = (state) => {
    setIsPlaying(state)
  }

  const setNextTrack = () => {
    setCurrentTrack(getNextTrack(currentTrack))
    setIsPlaying(true)
  }
  
  const setPrevTrack = () => {
    setCurrentTrack(getPrevTrack(currentTrack))
    setIsPlaying(true)
  }

  useEffect(() => {
    getTrackList()
  }, [])

  return (
    <div className="player">
      <ArtWork 
        artwork={currentTrack.artwork}
        isPlaying={isPlaying}
        isMobile
        className="player__artwork-mobile"
      />
      {currentTrack && (
        <TrackInfo
          isPlaying={isPlaying}
          track={currentTrack} 
          actions={{ 
            setStatePlayer
          }} 
        />
      )}
      <div className="player__content">
        <ArtWork 
          artwork={currentTrack.artwork}
          isPlaying={isPlaying}
          className="player__artwork"
        />
        <Controls 
          isPlaying={isPlaying} 
          actions={{ 
            setStatePlayer, 
            setNextTrack, 
            setPrevTrack 
          }} 
          className="player__controls"
        />
      </div>
    </div>
  )
}

export default Player