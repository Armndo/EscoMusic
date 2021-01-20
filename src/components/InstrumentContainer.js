import React, { useState } from 'react';
import Index from './instrument/Index.js';
import Create from './instrument/Create.js';
import View from './instrument/View.js';
import Edit from './instrument/Edit.js';

function InstrumentContainer(props) {
	const [instrument, setInstrument] = useState(props.target);
  
  return (
    <>
      {(() => {
        switch (props.action) {
          case "index": return <Index setInstrument={setInstrument} setAction={props.setAction}/>
          case "create": return <Create setAction={props.setAction}/>
          case "view": return <View instrument={instrument} setTab={props.setTab} setAction={props.setAction} setTarget={props.setTarget}/>
          case "edit": return <Edit setInstrument={setInstrument} instrument={instrument} setAction={props.setAction}/>
          default: return null
        }
      })()}
    </>
  );
}

export default InstrumentContainer;