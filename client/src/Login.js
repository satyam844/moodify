import React from 'react';
import { Container } from 'react-bootstrap';
import "./login.css";

const auth_url = "https://accounts.spotify.com/authorize?client_id=863517822c3f40a98b43d05c4628e380&response_type=code&redirect_uri=http://localhost:3000/&scope=user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-library-modify%20user-library-read%20streaming%20app-remote-control%20playlist-modify-public%20playlist-modify-private%20playlist-read-private%20playlist-read-collaborative";
function Login() {
  return <Container className='login' >
       
     <a className="btn btn-lg btn-success" type="button" href={auth_url}>Log in</a>

  </Container>;
}

export default Login;
