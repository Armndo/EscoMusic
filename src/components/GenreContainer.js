import React, { useState } from 'react';
import Index from './genre/Index.js';
import Create from './genre/Create.js';
import View from './genre/View.js';
import Edit from './genre/Edit.js';

function GenreContainer(props) {
	const [genre, setGenre] = useState(props.target);
  
  return (
    <>
      {(() => {
        switch (props.action) {
          case "index": return <Index setGenre={setGenre} setAction={props.setAction}/>
          case "create": return <Create setAction={props.setAction}/>
          case "view": return <View genre={genre} setTab={props.setTab} setAction={props.setAction} setTarget={props.setTarget}/>
          case "edit": return <Edit setGenre={setGenre} genre={genre} setAction={props.setAction}/>
          default: return null
        }
      })()}
    </>
  );
}

export default GenreContainer;