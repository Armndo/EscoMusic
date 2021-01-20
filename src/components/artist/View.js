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
				<p>Ver Artista</p>
        <button className="viewButton" onClick={() => props.setAction("index")}>Index</button>
			</div>
			<div className="row">
				<div className="col">
					<span>Nombre:</span>
					<input type="text" value={(props.artist.name !== "" ? props.artist.name : "N/A")} disabled/>
				</div>
				<div className="col">
					<span>Fecha de nacimiento:</span>
					<input type="text" value={props.artist.birthday !== null ? props.artist.birthday : "N/A"} disabled/>
				</div>
				<div className="col">
					<span>Género:</span>
					<input type="text" value={props.artist.gender !== null ? props.artist.gender : "N/A"} disabled/>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<span>País de origen:</span>
					<input type="text" value={props.artist.country !== null ? props.artist.country : "N/A"} disabled/>
				</div>
				<div className="col">
					<span>Periodo de actividad:</span>
					<input type="text" value={props.artist.years_active !== null ? props.artist.years_active : "N/A"} disabled/>	
				</div>
				<div className="col">
					<span>Géneros musicales:</span>
					<ul>
						{props.artist.genres.length > 0 ? props.artist.genres.map((genre) =>
							<li key={genre.id} onClick={() => goTo("genre", genre.id)}>
								<p>{genre.genre}</p>
							</li>
						) : "No hay géneros musicales."}
					</ul>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<span>Instrumentos musicales:</span>
					<ul>
						{props.artist.instruments.length > 0 ? props.artist.instruments.map((instrument) =>
							<li key={instrument.id} onClick={() => goTo("instrument", instrument.id)}>
								<p>{instrument.instrument}</p>
							</li>
						) : "No hay instrumentos."}
					</ul>
				</div>
				<div className="col">
					<span>Links:</span>
					<ul>
						{props.artist.medias.length > 0 ?  props.artist.medias.map((media) =>
							<li key={media.id}>
								<a href={media.link.includes("//") ? media.link : "//" + media.link} target="_blank" rel="noreferrer">{media.media}</a>
							</li>
						) : "No hay links."}
					</ul>
				</div>
				<div className="col">
					<span>Bandas:</span>
					<ul>
						{props.artist.bands.length > 0 ?  props.artist.bands.map((band) =>
							<li key={band.id} onClick={() => goTo("band", band.id)}>
								<p>{band.band}</p>
							</li>
						) : "No hay links."}
					</ul>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<span>Álbumes:</span>
					<ul>
						{props.artist.albums.length > 0 ?  props.artist.albums.map((album) =>
							<li key={album.id} onClick={() => goTo("album", album.id)}>
								<p>{album.album}</p>
							</li>
						) : "No hay álbumes."}
					</ul>
				</div>
				<div className="col">
					<span>Canciones escritas:</span>
					<ul>
						{props.artist.songs.length > 0 ?  props.artist.songs.map((song) =>
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