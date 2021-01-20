import React, { useState } from 'react';
import Index from './band/Index.js';
import Create from './band/Create.js';
import View from './band/View.js';
import Edit from './band/Edit.js';

function BandContainer(props) {
	const [band, setBand] = useState(props.target);
  
  return (
    <>
      {(() => {
        switch (props.action) {
          case "index": return <Index setBand={setBand} setAction={props.setAction} session={props.session} setLoader={props.setLoader}/>
          case "create": return <Create setAction={props.setAction}/>
          case "view": return <View band={band} setTab={props.setTab} setAction={props.setAction} setTarget={props.setTarget} session={props.session}/>
          case "edit": return <Edit setBand={setBand} band={band} setAction={props.setAction}/>
          default: return null
        }
      })()}
    </>
  );
}

export default BandContainer;