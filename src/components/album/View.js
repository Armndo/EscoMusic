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
				<p>Ver Álbum</p>
        <button className="viewButton" onClick={() => props.setAction("index")}>Index</button>
			</div>
			<div className="row">
				<div className="col">
					<span>Nombre:</span>
					<input type="text" value={(props.album.album !== "" ? props.album.album : "N/A")} disabled/>
				</div>
				<div className="col">
					<span>Fecha de lanzamiento:</span>
					<input type="text" value={props.album.released !== null ? props.album.released : "N/A"} disabled/>
				</div>
				<div className="col">
					<span>Año de grabación:</span>
					<input type="text" value={props.album.recorded !== null ? props.album.recorded : "N/A"} disabled/>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<span>Duración:</span>
					<input type="text" value={props.album.length !== null ? props.album.length : "N/A"} disabled/>
				</div>
				<div className="col">
					<span>Géneros musicales:</span>
					<ul>
						{props.album.genres.length > 0 ? props.album.genres.map((genre) =>
							<li key={genre.id} onClick={() => goTo("genre", genre.id)}>
								<p>{genre.genre}</p>
							</li>
						) : "No hay géneros musicales."}
					</ul>
				</div>
				<div className="col">
					<span>Disqueras:</span>
					<ul>
						{props.album.records.length > 0 ? props.album.records.map((record) =>
							<li key={record.id} onClick={() => goTo("record", record.id)}>
								<p>{record.record}</p>
							</li>
						) : "No hay disqueras."}
					</ul>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<span>Autores:</span>
					<ul>
						{props.album.artists.length > 0 ? props.album.artists.map((artist) =>
							<li key={artist.id} onClick={() => goTo("artist", artist.id)}>
								<p>{artist.name}</p>
							</li>
						) : "No hay autores."}
					</ul>
				</div>
				<div className="col">
					<span>Bandas:</span>
					<ul>
						{props.album.bands.length > 0 ?  props.album.bands.map((band) =>
							<li key={band.id} onClick={() => goTo("band", band.id)}>
								<p>{band.band}</p>
							</li>
						) : "No hay bandas."}
					</ul>
				</div>
				<div className="col">
					<span>Canciones:</span>
					<ul>
						{props.album.songs.length > 0 ?  props.album.songs.map((song) =>
							<li key={song.id} onClick={() => goTo("song", song.id)}>
								<p>{song.song}</p>
							</li>
						) : "No hay canciones."}
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