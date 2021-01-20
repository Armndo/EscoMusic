import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar.js';
import ArtistContainer from '../components/ArtistContainer.js';
import BandContainer from '../components/BandContainer.js';
import GenreContainer from '../components/GenreContainer.js';
import InstrumentContainer from '../components/InstrumentContainer.js';
import AlbumContainer from '../components/AlbumContainer.js';
import SongContainer from '../components/SongContainer.js';
import RecordContainer from '../components/RecordContainer.js';
import '../css/mainView.css';

function MainView(props) {
	const [tab, setTab] = useState("");
	const [action, setAction] = useState("index");
  const [target, setTarget] = useState({});
  const [collection, setCollection] = useState({artists: [], bands: [], records: [], albums: [], songs: [], genres: [], instruments: []});
	const [loader, setLoader] = useState(false);

	useEffect(() => {
    setLoader(true);
		axios.get(
			"http://localhost/api/fetch.php",
		).then(function(response) {
			setCollection(response.data);
      setLoader(false);
		}).catch(function(e) {
			console.log(e);
		});
  }, [setLoader]);

  function load() {
    setLoader(true);
		axios.get(
			"http://localhost/api/fetch.php",
		).then(function(response) {
			setCollection(response.data);
      setLoader(false);
		}).catch(function(e) {
			console.log(e);
		});
  }
  
  return (
    <div className="mainView">
      <div className={"loader"} style={{display: (loader ? "block" : "none")}}/>
      <NavBar
        logout={props.logout}
        setTab={setTab}
        tab={tab}
        setAction={setAction}
        load={load}
        setCollection={setCollection}
      />
      <div className="total">
        {(() => {
          switch (tab) {
            case "artist": return <ArtistContainer setTab={setTab} setAction={setAction} action={action} setTarget={setTarget} target={target} setLoader={setLoader} session={props.session}/>;
            case "band": return <BandContainer setTab={setTab} setAction={setAction} action={action} setTarget={setTarget} target={target} setLoader={setLoader} session={props.session}/>;
            case "genre": return <GenreContainer setTab={setTab} setAction={setAction} action={action} setTarget={setTarget} target={target} setLoader={setLoader} session={props.session}/>;
            case "instrument": return <InstrumentContainer setTab={setTab} setAction={setAction} action={action} setTarget={setTarget} target={target} setLoader={setLoader} session={props.session}/>;
            case "album": return <AlbumContainer setTab={setTab} setAction={setAction} action={action} setTarget={setTarget} target={target} setLoader={setLoader} session={props.session}/>;
            case "song": return <SongContainer setTab={setTab} setAction={setAction} action={action} setTarget={setTarget} target={target} setLoader={setLoader} session={props.session}/>;
            case "record": return <RecordContainer setTab={setTab} setAction={setAction} action={action} setTarget={setTarget} target={target} setLoader={setLoader} session={props.session}/>;
            case "search": if(collection.artists.length > 0 || collection.bands.length > 0 || collection.records.length > 0 || collection.albums.length > 0 || collection.songs.length > 0 || collection.genres.length > 0 || collection.instruments.length > 0) return(
              <div className="form">
                <div className="title">
                  <p>Resultados</p>
                </div>
                {collection.artists.length > 0 ?
                  <>
                    Artistas:
                    <ul>
                    {collection.artists.map((artist) =>
                      <li key={artist.id} onClick={() => {setTarget(artist); setAction("view"); setTab("artist")}}><p>{artist.name}</p></li>
                    )}
                    </ul>
                    <br/>
                  </>
                : null}
                {collection.bands.length > 0 ?
                  <>
                    Bandas:
                    <ul>
                    {collection.bands.map((band) =>
                      <li key={band.id} onClick={() => {setTarget(band); setAction("view"); setTab("band")}}><p>{band.band}</p></li>
                    )}
                    </ul>
                    <br/>
                  </>
                : null}
                {collection.records.length > 0 ?
                  <>
                    Disqueras:
                    <ul>
                    {collection.records.map((record) =>
                      <li key={record.id} onClick={() => {setTarget(record); setAction("view"); setTab("record")}}><p>{record.record}</p></li>
                    )}
                    </ul>
                    <br/>
                  </>
                : null}
                {collection.albums.length > 0 ?
                  <>
                    Álbumes:
                    <ul>
                    {collection.albums.map((album) =>
                      <li key={album.id} onClick={() => {setTarget(album); setAction("view"); setTab("album")}}><p>{album.album}</p></li>
                    )}
                    </ul>
                    <br/>
                  </>
                : null}
                {collection.songs.length > 0 ?
                  <>
                    Canciones:
                    <ul>
                    {collection.songs.map((song) =>
                      <li key={song.id} onClick={() => {setTarget(song); setAction("view"); setTab("song")}}><p>{song.song}</p></li>
                    )}
                    </ul>
                    <br/>
                  </>
                : null}
                {collection.genres.length > 0 ?
                  <>
                    Géneros Musicales:
                    <ul>
                    {collection.genres.map((genre) =>
                      <li key={genre.id} onClick={() => {setTarget(genre); setAction("view"); setTab("genre")}}><p>{genre.genre}</p></li>
                    )}
                    </ul>
                    <br/>
                  </>
                : null}
                {collection.instruments.length > 0 ?
                  <>
                    Instrumentos Musicales:
                    <ul>
                    {collection.instruments.map((instrument) =>
                      <li key={instrument.id} onClick={() => {setTarget(instrument); setAction("view"); setTab("instrument")}}><p>{instrument.instrument}</p></li>
                    )}
                    </ul>
                  </>
                : null}
              </div>
            ); else return(
              <div className="form">No hay resultados.</div>
            );
            default: return(
              <div className="form">
                <h1>¡Bienvenido {props.session.name}!</h1>
                <br/>
                {"Quizás te interese: "}
                {collection.artists.map((artist) =>
                  <p className="link" key={artist.id} onClick={() => {setTarget(artist); setAction("view"); setTab("artist")}}>{artist.name} - (Artista)</p>
                )}
                {collection.bands.map((band) =>
                  <p className="link" key={band.id} onClick={() => {setTarget(band); setAction("view"); setTab("band")}}>{band.band} - (Banda)</p>
                )}
                {collection.records.map((record) =>
                  <p className="link" key={record.id} onClick={() => {setTarget(record); setAction("view"); setTab("record")}}>{record.record} - (Disquera)</p>
                )}
                {collection.albums.map((album) =>
                  <p className="link" key={album.id} onClick={() => {setTarget(album); setAction("view"); setTab("album")}}>{album.album} - (Álbum)</p>
                )}
                {collection.songs.map((song) =>
                  <p className="link" key={song.id} onClick={() => {setTarget(song); setAction("view"); setTab("song")}}>{song.song} - (Canción)</p>
                )}
                {collection.genres.map((genre) =>
                  <p className="link" key={genre.id} onClick={() => {setTarget(genre); setAction("view"); setTab("genre")}}>{genre.genre} - (Género musical)</p>
                )}
                {collection.instruments.map((instrument) =>
                  <p className="link" key={instrument.id} onClick={() => {setTarget(instrument); setAction("view"); setTab("instrument")}}>{instrument.instrument} - (Instrumento musical)</p>
                )}
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
}

export default MainView;