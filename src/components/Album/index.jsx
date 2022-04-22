import React from 'react';
import Style from './album.module.css';

function Album({ data, selected, setSelected }) {
  return (
    <div className={Style.cardSuggested}>
      <div className={Style.container}>
        <div className={Style.imgAlbum}>
          <img src={data.album.images[1].url} alt={data.title} />
        </div>
        <div className={Style.albumDetail}>
          <h2 className={Style.albumTitle}>{data.name}</h2>
          <p className={Style.artistName}>{data.artists[0].name}</p>
        </div>
        {selected.includes(data.uri) ? (
          <button
            type="button"
            className={Style.btn}
            onClick={() => setSelected(selected.filter((uri) => uri !== data.uri))}
          >
            Deselect
          </button>
        ) : (
          <button
            type="button"
            className={Style.btn}
            onClick={() => setSelected([...selected, data.uri])}
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
}

export default Album;
