import React, { useState } from 'react';
import Index from './song/Index.js';
import Create from './song/Create.js';
import View from './song/View.js';
import Edit from './song/Edit.js';

function SongContainer(props) {
	const [song, setSong] = useState(props.target);
  
  return (
    <>
      {(() => {
        switch (props.action) {
          case "index": return <Index setSong={setSong} setAction={props.setAction} session={props.session} setLoader={props.setLoader}/>
          case "create": return <Create setAction={props.setAction}/>
          case "view": return <View song={song} setTab={props.setTab} setAction={props.setAction} setTarget={props.setTarget} session={props.session}/>
          case "edit": return <Edit setSong={setSong} song={song} setAction={props.setAction}/>
          default: return null
        }
      })()}
    </>
  );
}

export default SongContainer;