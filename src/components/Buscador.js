import React from 'react';
import axios from 'axios';

function Buscador(props) {

  function search(event) {
    event.preventDefault();
		axios.get(
			"http://localhost/api/fetch.php?query=" + encodeURI(props.query),
		).then(function(response) {
      props.setCollection(response.data)
      props.setTab("search");
		}).catch(function(e) {
			console.log(e);
		});
  }

  return (
    <div className="buscador">
      <form onSubmit={(e) => search(e)}>
        <input type="text" placeholder="Buscar..." value={props.query} onChange={(e) => props.setQuery(e.target.value)}/>
        <button>✘</button>
      </form>
    </div>
  );
}

export default Buscador;