import React, { useState } from 'react';
import Index from './album/Index.js';
import Create from './album/Create.js';
import View from './album/View.js';
import Edit from './album/Edit.js';

function AlbumContainer(props) {
	const [album, setAlbum] = useState(props.target);
  
  return (
    <>
      {(() => {
        switch (props.action) {
          case "index": return <Index setAlbum={setAlbum} setAction={props.setAction} session={props.session} setLoader={props.setLoader}/>
          case "create": return <Create setAction={props.setAction}/>
          case "view": return <View album={album} setTab={props.setTab} setAction={props.setAction} setTarget={props.setTarget} session={props.session}/>
          case "edit": return <Edit setAlbum={setAlbum} album={album} setAction={props.setAction}/>
          default: return null
        }
      })()}
    </>
  );
}

export default AlbumContainer;