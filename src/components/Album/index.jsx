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
      {/* <table>
        <tbody>
          <tr>
            <td>
              <div id="img-album">
                <img src={data.album.images[0].url} alt={data.title} />
              </div>
            </td>
            <td width="100%">
              <div id="album-detail card-content">
                <h2 id="album-title">{data.name}</h2>
                <div id="artist-info">
                  <p>
                    <span id="artist-name">{data.artists[0].name}</span>
                  </p>
                </div>
              </div>
            </td>
            <td>
              {selected.includes(data.uri) ? (
                <button
                  type="button"
                  className="btn bg-secondary"
                  onClick={() => setSelected(selected.filter((uri) => uri !== data.uri))}
                >
                  Deselect
                </button>
              ) : (
                <button
                  type="button"
                  className="btn bg-secondary"
                  onClick={() => setSelected([...selected, data.uri])}
                >
                  Select
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}

export default Album;
