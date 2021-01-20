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
				<p>Ver Banda</p>
        <button className="viewButton" onClick={() => props.setAction("index")}>Index</button>
			</div>
			<div className="row">
				<div className="col">
					<span>Nombre:</span>
					<input type="text" value={(props.band.band !== "" ? props.band.band : "N/A")} disabled/>
				</div>
				<div className="col">
					<span>Año de creación:</span>
					<input type="text" value={props.band.created !== null ? props.band.created : "N/A"} disabled/>
				</div>
				<div className="col">
					<span>País de origen:</span>
					<input type="text" value={props.band.country !== null ? props.band.country : "N/A"} disabled/>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<span>Periodo de actividad:</span>
					<input type="text" value={props.band.years_active !== null ? props.band.years_active : "N/A"} disabled/>	
				</div>
				<div className="col">
					<span>Géneros musicales:</span>
					<ul>
						{props.band.genres.length > 0 ? props.band.genres.map((genre) =>
							<li key={genre.id} onClick={() => goTo("genre", genre.id)}>
								<p>{genre.genre}</p>
							</li>
						) : "No hay géneros musicales."}
					</ul>
				</div>
				<div className="col">
					<span>Miembros:</span>
					<ul>
						{props.band.artists.length > 0 ? props.band.artists.map((artist) =>
							<li key={artist.id} onClick={() => goTo("artist", artist.id)}>
								<p>{artist.name}</p>
							</li>
						) : "No hay miembros en la banda."}
					</ul>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<span>Links:</span>
					<ul>
						{props.band.medias.length > 0 ?  props.band.medias.map((media) =>
							<li key={media.id}>
								<a href={media.link.includes("//") ? media.link : "//" + media.link} target="_blank" rel="noreferrer">{media.media}</a>
							</li>
						) : "No hay links."}
					</ul>
				</div>
				<div className="col">
					<span>Álbumes:</span>
					<ul>
						{props.band.albums.length > 0 ?  props.band.albums.map((album) =>
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