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
				<p>Ver Canción</p>
        <button className="viewButton" onClick={() => props.setAction("index")}>Index</button>
			</div>
			<div className="row">
				<div className="col">
					<span>Nombre:</span>
					<input type="text" value={(props.song.song !== "" ? props.song.song : "N/A")} disabled/>
				</div>
				<div className="col">
					<span>Fecha de lanzamiento:</span>
					<input type="text" value={props.song.released !== null ? props.song.released : "N/A"} disabled/>
				</div>
				<div className="col">
					<span>Año de grabación:</span>
					<input type="text" value={props.song.recorded !== null ? props.song.recorded : "N/A"} disabled/>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<span>Duración:</span>
					<input type="text" value={props.song.length !== null ? props.song.length : "N/A"} disabled/>
				</div>
				<div className="col">
					<span>Álbum:</span>
					<p className="link" onClick={() => goTo("album", props.song.album.id)}>{props.song.album !== null ? props.song.album.album : "N/A"}</p>
				</div>
				<div className="col">
					<span>Géneros musicales:</span>
					<ul>
						{props.song.genres.length > 0 ? props.song.genres.map((genre) =>
							<li key={genre.id} onClick={() => goTo("genre", genre.id)}>
								<p>{genre.genre}</p>
							</li>
						) : "No hay géneros musicales."}
					</ul>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<span>Escrita por:</span>
					<ul>
						{props.song.artists.length > 0 ? props.song.artists.map((artist) =>
							<li key={artist.id} onClick={() => goTo("artist", artist.id)}>
								<p>{artist.name}</p>
							</li>
						) : "No hay autores."}
					</ul>
				</div>
				<div className="col">
					<span>Links:</span>
					<ul>
						{props.song.medias.length > 0 ?  props.song.medias.map((media) =>
							<li key={media.id}>
								<a href={media.link.includes("//") ? media.link : "//" + media.link} target="_blank" rel="noreferrer">{media.media}</a>
							</li>
						) : "No hay links."}
					</ul>
				</div>
				<div className="col">
					<span>Letra:</span>
					<textarea rows="8" disabled value={props.song.lyrics}/>
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