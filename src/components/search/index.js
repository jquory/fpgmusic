// import { render } from "@testing-library/react";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Album from '../Album';
import CreatePlaylist from '../createPlaylist';

function SearchBar() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  const accessToken = useSelector((state) => state.token.token);

  const getSpotify = () => {
    fetch(
      `https://api.spotify.com/v1/search?q=${
        search
      }&type=track&limit=10&access_token=${
        accessToken}`,
    )
      .then((res) => res.json())
      .then((item) => {
        console.log(item);
        setData(item.tracks.items);
      });
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    getSpotify();
  };

  return (
    <div className="box">
      <div className="container">
        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            className="input"
            name="txt"
            placeholder="masukkan lagu yang ingin anda cari"
            value={search}
            onChange={handleChange}
          />
          <button className="button" type="button" onClick={handleSubmit}>
            Search
          </button>
        </form>
      </div>

      <div className="card-container">
        {data.map((song) => (
          <div key={song.id} className="cardContent">
            <Album data={song} selected={selected} setSelected={setSelected} />
          </div>
        ))}
      </div>
      <div className="card-playlist">
        <div className="title" />
        {/* <Button variant="primary">
          Add to playlist
        </Button> */}
      </div>
      <CreatePlaylist accessToken={accessToken} selected={selected} />

    </div>
  );
}

export default SearchBar;
