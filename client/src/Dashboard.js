import React, { useEffect }  from 'react';
import useAuth from './useAuth';
import {useState} from "react";
import "./Dashboard.css";
import Player from './Player';
import TrackSearchResult from './TrackSearchResult';
import SpotifyWebApi from 'spotify-web-api-node';
import { Container,Form } from 'react-bootstrap';


const spotifyApi = new SpotifyWebApi({
    clientId :"863517822c3f40a98b43d05c4628e380",
})

function Dashboard({code}) {
    const accessToken = useAuth(code);
    const [search,setSearch] = useState("");
   const [searchResults,setSearchResults] = useState([]);
   const [playingTrack,setPlayingTrack] = useState();
//    console.log(searchResults);
function chooseTrack(track){
    setPlayingTrack(track)
}
   useEffect(() => {
       if(!accessToken) return
  spotifyApi.setAccessToken(accessToken);
   },[accessToken])
  
 useEffect(() => {
     if(!search) return setSearchResults([]);
     if(!accessToken) return 
   
     let cancel = false;
     spotifyApi.searchTracks(search).then(res => {
      if(cancel) return 
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )
               return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
              }
            }) 
        )
     } )
   return ()=> cancel =true
 },[search,accessToken])

    function handleChange(event){
        setSearch(event.target.value);
    }
  return <div>
  
    <Container className="container" >
 <Form.Control 
    type="search" 
    placeholder="Search Songs/Artists"
    onChange={handleChange}
    value={search}  />
    <div className="middle" >
       {searchResults.map(track => {
           return  <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
       })}
    </div>
    <div>
     {/* <Player accessToken={accessToken} trackUri={playingTrack?.uri} /> */}
    </div>
    </Container>
  

  </div>;
}

export default Dashboard;
