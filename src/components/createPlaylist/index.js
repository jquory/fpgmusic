/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Style from './playlist.module.css';

function CreatePlaylist({ selected }) {
  const [playlist, setPlaylist] = useState({
    namePlaylist: '',
    descriptionPlaylist: '',
  });
  const [hasError, setErrors] = useState(false);
  const [playlistData, setPlaylistData] = useState([]);
  const [playlistId, setplaylistId] = useState('');

  const accessToken = useSelector((state) => state.token.token);

  const getPlaylist = () => {
    axios
      .get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPlaylistData(res.data.items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const addSong = () => {
    console.log(selected);
    let allTracks = '';
    selected.forEach((it) => {
      allTracks += `${it},`;
    });
    axios
      .post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?access_token=${accessToken}&uris=${allTracks}`,
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const postData = () => {
    axios
      .post(
        'https://api.spotify.com/v1/users/31f2pmcxaksb35iqcjhay5hddnvi/playlists',
        {
          name: playlist.namePlaylist,
          description: playlist.descriptionPlaylist,
          public: false,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        setplaylistId(res.data.id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const errors = { ...playlist };
    if (errors.namePlaylist.length <= 10) {
      setErrors({
        ...errors,
        namePlaylist: 'Minimum 10 characters',
      });
    } else {
      setErrors({
        ...errors,
        namePlaylist: '',
      });
    }
    postData();
    setPlaylist({
      namePlaylist: '',
      descriptionPlaylist: '',
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setPlaylist({
      ...playlist,
      [name]: value,
    });
    const errors = { ...playlist };
    if (errors.namePlaylist.length <= 10) {
      setErrors({
        ...errors,
        namePlaylist: 'Minimum 10 characters',
      });
    } else {
      setErrors({
        ...errors,
        namePlaylist: '',
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="card-playlist">
          <Button variant="primary" onClick={addSong}>
            Add to playlist
          </Button>
          <Button variant="primary" onClick={getPlaylist}>
            Playlist Data
          </Button>
        </div>
        <div className={Style.playlistData}>
          {playlistData.map((item) => (
            <div key={item.id} className={Style.playlistItem}>
              <h5>{item.name}</h5>
              <p>{item.description}</p>
              <p>{item.tracks.total}</p>
              <Button variant="primary" className={Style.btnData} onClick={addSong}>
                Add song
              </Button>
            </div>
          ))}
        </div>

      </div>
      <div className="playlist">
        <div className="title">
          <h1>Create playlist</h1>
        </div>
        <div className="form">
          <form id="submit-playlist" onSubmit={handleFormSubmit}>
            <div className="input-group">
              <label id="namePlaylist">Name:</label>
              <input
                id="namePlaylist"
                required
                name="namePlaylist"
                type="text"
                value={playlist.namePlaylist}
                onChange={handleFormChange}
              />
              {hasError.namePlaylist && (
              <p className="error">{hasError.namePlaylist}</p>
              )}
            </div>
            <div className="input-group">
              <label id="descPlaylist">Description:</label>
              <input
                id="descPlaylist"
                rows="4"
                name="descriptionPlaylist"
                type="text"
                value={playlist.descriptionPlaylist}
                onChange={handleFormChange}
              />
            </div>
            <button
              className="btn btn-secondary"
              variant="primary"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePlaylist;
