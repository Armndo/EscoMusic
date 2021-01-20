import React, { useState } from 'react';
import Index from './record/Index.js';
import Create from './record/Create.js';
import View from './record/View.js';
import Edit from './record/Edit.js';

function RecordContainer(props) {
	const [record, setRecord] = useState(props.target);
  
  return (
    <>
      {(() => {
        switch (props.action) {
          case "index": return <Index setRecord={setRecord} setAction={props.setAction} session={props.session} setLoader={props.setLoader}/>
          case "create": return <Create setAction={props.setAction}/>
          case "view": return <View record={record} setTab={props.setTab} setAction={props.setAction} setTarget={props.setTarget} session={props.session}/>
          case "edit": return <Edit setRecord={setRecord} record={record} setAction={props.setAction}/>
          default: return null
        }
      })()}
    </>
  );
}

export default RecordContainer;