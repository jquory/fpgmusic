import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken } from '../../redux/slices/tokenSlice';

function Login() {
  const history = useHistory();
  const accessToken = useSelector((state) => state.token.token);
  const dispatch = useDispatch();
  const clientId = '667073ce468c4501b68e6abe4158a87b';

  useEffect(() => {
    if (accessToken) {
      history.push('/create-playlist');
    }
  }, [accessToken, history]);

  const handleLogin = () => {
    window.location.replace(
      `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000/&scope=user-read-email playlist-modify-private playlist-read-private`,
    );
  };

  const accessTokenFromUrl = window.location.hash
    .substring(1, window.location.hash.length - 1)
    .split('&')[0]
    .split('=')[1];

  if (accessTokenFromUrl) {
    dispatch(setAccessToken({ accessToken: accessTokenFromUrl }));
    history.push({
      pathname: '/create-playlist',
    });
  }

  return (
    <div className="App">
      <div className="btn-wrapper">
        <h1>Click here..</h1>
        <button type="button" className="btn bg-secondary1" onClick={() => handleLogin()}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
