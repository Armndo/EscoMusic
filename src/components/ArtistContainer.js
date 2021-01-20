import React, { useState } from 'react';
import Index from './artist/Index.js';
import Create from './artist/Create.js';
import View from './artist/View.js';
import Edit from './artist/Edit.js';

function ArtistContainer(props) {
	const [artist, setArtist] = useState(props.target);
  
  return (
    <>
      {(() => {
        switch (props.action) {
          case "index": return <Index setArtist={setArtist} setAction={props.setAction}/>
          case "create": return <Create setAction={props.setAction}/>
          case "view": return <View artist={artist} setTab={props.setTab} setAction={props.setAction} setTarget={props.setTarget}/>
          case "edit": return <Edit setArtist={setArtist} artist={artist} setAction={props.setAction}/>
          default: return null
        }
      })()}
    </>
  );
}

export default ArtistContainer;