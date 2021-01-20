import React, { useState } from 'react';
import NavBar from '../components/NavBar.js';
import ArtistContainer from '../components/ArtistContainer.js';
import BandContainer from '../components/BandContainer.js';
import GenreContainer from '../components/GenreContainer.js';
import InstrumentContainer from '../components/InstrumentContainer.js';
import AlbumContainer from '../components/AlbumContainer.js';
import SongContainer from '../components/SongContainer.js';
import '../css/mainView.css';

function MainView(props) {
	const [tab, setTab] = useState("");
	const [action, setAction] = useState("index");
	const [target, setTarget] = useState({});
  
  return (
    <div className="mainView">
      <NavBar
        logout={props.logout}
        setTab={setTab}
        tab={tab}
        setAction={setAction}
      />
      <div className="total">
        {(() => {
          switch (tab) {
            case "artist": return <ArtistContainer setTab={setTab} setAction={setAction} action={action} setTarget={setTarget} target={target}/>;
            case "band": return <BandContainer setTab={setTab} setAction={setAction} action={action} setTarget={setTarget} target={target}/>;
            case "genre": return <GenreContainer setTab={setTab} setAction={setAction} action={action} setTarget={setTarget} target={target}/>;
            case "instrument": return <InstrumentContainer setTab={setTab} setAction={setAction} action={action} setTarget={setTarget} target={target}/>;
            case "album": return <AlbumContainer setTab={setTab} setAction={setAction} action={action} setTarget={setTarget} target={target}/>;
            case "song": return <SongContainer setTab={setTab} setAction={setAction} action={action} setTarget={setTarget} target={target}/>;
            default: return null
          }
        })()}
      </div>
    </div>
  );
}

export default MainView;