import React from 'react';
import axios from 'axios';

function View(props) {

	function goTo(tab, id) {
		axios.get(
			"http://localhost/api/fetch.php?params[]=" + tab + "&" + tab + "_id=" + id,
		).then(function(response) {
			props.setTarget(response.data[tab])
			props.setAction("view");
			props.setTab(tab);
		}).catch(function(e) {
			console.log(e);
		});
	}

  return (
		<div className="form">
			<div className="title">
				<p>Ver Disquera</p>
        <button className="viewButton" onClick={() => props.setAction("index")}>Index</button>
			</div>
			<div className="row">
				<div className="col">
					<span>Nombre:</span>
					<input type="text" value={(props.record.record !== "" ? props.record.record : "N/A")} disabled/>
				</div>
				<div className="col">
					<span>Año de fundación:</span>
					<input type="text" value={props.record.funded !== null ? props.record.funded : "N/A"} disabled/>
				</div>
				<div className="col">
					<span>País de origen:</span>
					<input type="text" value={props.record.country !== null ? props.record.country : "N/A"} disabled/>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<span>Fundador:</span>
					<input type="text" value={props.record.founder !== null ? props.record.founder : "N/A"} disabled/>
				</div>
				<div className="col">
					<span>Álbumes:</span>
					<ul>
						{props.record.albums.length > 0 ?  props.record.albums.map((album) =>
							<li key={album.id} onClick={() => goTo("album", album.id)}>
								<p>{album.album}</p>
							</li>
						) : "No hay álbumes."}
					</ul>
				</div>
			</div>
			{props.session.type === "locutor" ?
			<div className="row">
				<div className="col full">
					<button className="editButton" onClick={() => props.setAction("edit")}>Editar</button>
				</div>
			</div> : null}
		</div>
  );
}

export default View;