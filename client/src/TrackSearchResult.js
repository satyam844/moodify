import React from 'react';
import "./TrackSearchResult";
function TrackSearchResult({track,chooseTrack}) {

    function handlePlay(){ 
chooseTrack(track)
    }

  return <div className="albumPic" >
<img src={track.albumUrl}  style={{ height: "64px" , width: "64px" }} />
 <div onClick={handlePlay} >
     <div>{track.title}</div>
     <div>{track.artist}</div>
 </div>
  </div>;
}

export default TrackSearchResult;
