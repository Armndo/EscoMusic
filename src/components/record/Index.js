import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Index(props) {
  const [records, setRecords] = useState([]);

  let setLoader = props.setLoader;

	useEffect(() => {
    setLoader(true);
		axios.get(
			"http://localhost/api/fetch.php?params[]=records",
		).then(function(response) {
			setRecords(response.data.records);
      setLoader(false);
		}).catch(function(e) {
			console.log(e);
		});
  }, [setLoader]);

  function viewRecord(record) {
    props.setAction("view")
    props.setRecord(record);
  }

  function editRecord(record) {
    props.setAction("edit")
    props.setRecord(record);
  }

	function handleDestroy(record, index) {
		let params = new URLSearchParams();

		let data = {
      action: "destroy",
      id: record.id,
		};

		params.append("data", JSON.stringify(data));

    if(window.confirm("¿Eliminar la disquera '" + record.record + "'?")) {
      axios.post(
        "http://localhost/api/Controller/RecordController.php",
        params
      ).then(function(response) {
        let aux = [...records];
        aux.splice(index, 1);
        setRecords(aux);
      }).catch(function(e) {
        console.log(e);
      });
    }
	}

  return (
		<div className="table">
			<div className="title">
				<p>Disqueras</p>
        {props.session.type === "locutor" ? <button className="createButton" onClick={() => props.setAction("create")}>Agregar</button> : null}
			</div>
      <div className="row">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Año de fundación</th>
              <th>País de origen</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => 
              <tr key={record.id}>
                <td>{record.record === "" ? "N/A" : record.record}</td>
                <td>{record.funded === null ? "N/A" : record.funded}</td>
                <td>{record.country === null ? "N/A" : record.country}</td>
                <td>
                  <button className="viewButton" onClick={() => viewRecord(record)}>Ver</button>
                  {props.session.type === "locutor" ?
                  <>
                    <button className="editButton" onClick={() => editRecord(record)}>Editar</button>
                    <button className="deleteButton" onClick={() => handleDestroy(record, index)}>Eliminar</button>
                  </> : null}
                </td>
              </tr>
            )}
          </tbody>
        </table>
			</div>
		</div>
  );
}

export default Index;