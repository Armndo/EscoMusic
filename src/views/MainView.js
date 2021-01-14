import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.js';
import FormArtist from '../components/artist/Form.js';
import IndexArtist from '../components/artist/Index.js';
import '../css/mainView.css';

function MainView(props) {
	const [artists, setArtists] = useState([]);
	const [tabView, setTabView] = useState("artist index");
  
  return (
    <div className="mainView">
      <NavBar
        logout={props.logout}
      />
      <div className="total">
        {tabView === "artist index" ? <IndexArtist setTabView={setTabView}/> : <FormArtist setTabView={setTabView}/>}
      </div>
    </div>
  );
}

export default MainView;