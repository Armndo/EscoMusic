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
				<p>Ver Instrumento</p>
        <button className="viewButton" onClick={() => props.setAction("index")}>Index</button>
			</div>
			<div className="row">
				<div className="col">
					<span>Nombre:</span>
					<input type="text" value={(props.instrument.instrument !== "" ? props.instrument.instrument : "N/A")} disabled/>
				</div>
				<div className="col">
					<span>Descripción:</span>
					<textarea rows="8" value={props.instrument.description !== null ? props.instrument.description : "N/A"} disabled/>
				</div>
				<div className="col">
					<span>Artistas:</span>
					<ul>
						{props.instrument.artists.length > 0 ?  props.instrument.artists.map((artist) =>
							<li key={artist.id} onClick={() => goTo("artist", artist.id)}>
								<p>{artist.name}</p>
							</li>
						) : "No hay artistas."}
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