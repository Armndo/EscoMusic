import React, { useState } from 'react';

function Buscador(props) {

  return (
    <div className="buscador">
			<input type="text" placeholder="Buscar..."/>
      <button>✘</button>
    </div>
  );
}

export default Buscador;