import React, { useEffect }  from 'react';
import useAuth from './useAuth';
import {useState} from "react";
import "./Dashboard.css";
import SpotifyWebApi from 'spotify-web-api-node';
import { Container,Form } from 'react-bootstrap';


const spotifyApi = new SpotifyWebApi({
    clientId :"863517822c3f40a98b43d05c4628e380",
})

function Dashboard({code}) {
    const accessToken = useAuth(code);
    const [search,setSearch] = useState("");
   const [searchResults,setSearchResults] = useState([]);
   console.log(searchResults);
   useEffect(() => {
       if(!accessToken) return
  spotifyApi.setAccessToken(accessToken);
   },[accessToken])
  
 useEffect(() => {
     if(!search) return setSearchResults([]);
     if(!accessToken) return 
   
     spotifyApi.searchTracks(search).then(res => {
         setSearchResults( 
            res.body.tracks.items.map(track => {
               const smallestAlbumImage = track.album.images.reduce((smallest,image) => {
                   if(image.height < smallest.height) return image
                   return smallest;
               },track.album.images[0])
   
   
                return {
                   artist : track.artists [0].name,
                   title : track.name,
                   uri : track.uri,
                   albumUri : smallestAlbumImage.url
                }
            }) 
        )
     } )
   
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
        Songs
    </div>
    <div>Bottom</div>
    </Container>
  

  </div>;
}

export default Dashboard;
