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
				<p>Ver Género musical</p>
        <button className="viewButton" onClick={() => props.setAction("index")}>Index</button>
			</div>
			<div className="row">
				<div className="col">
					<span>Nombre:</span>
					<input type="text" value={(props.genre.genre !== "" ? props.genre.genre : "N/A")} disabled/>
				</div>
				<div className="col">
					<span>Descripción:</span>
					<textarea rows="8" value={props.genre.description !== null ? props.genre.description : "N/A"} disabled/>
				</div>
				<div className="col">
					<span>Bandas:</span>
					<ul>
						{props.genre.bands.length > 0 ?  props.genre.bands.map((band) =>
							<li key={band.id} onClick={() => goTo("band", band.id)}>
								<p>{band.band}</p>
							</li>
						) : "No hay bandas."}
					</ul>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<span>Artistas:</span>
					<ul>
						{props.genre.artists.length > 0 ?  props.genre.artists.map((artist) =>
							<li key={artist.id} onClick={() => goTo("artist", artist.id)}>
								<p>{artist.name}</p>
							</li>
						) : "No hay artistas."}
					</ul>
				</div>
				<div className="col">
					<span>Álbumes:</span>
					<ul>
						{props.genre.albums.length > 0 ?  props.genre.albums.map((album) =>
							<li key={album.id} onClick={() => goTo("album", album.id)}>
								<p>{album.album}</p>
							</li>
						) : "No hay álbumes."}
					</ul>
				</div>
				<div className="col">
					<span>Canciones:</span>
					<ul>
						{props.genre.songs.length > 0 ?  props.genre.songs.map((song) =>
							<li key={song.id} onClick={() => goTo("song", song.id)}>
								<p>{song.song}</p>
							</li>
						) : "No hay canciones."}
					</ul>
				</div>
			</div>
			<div className="row">
				<div className="col full">
					<button className="editButton" onClick={() => props.setAction("edit")}>Editar</button>
				</div>
			</div>
		</div>
  );
}

export default View;