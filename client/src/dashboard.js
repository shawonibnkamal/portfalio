import React, { useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [potatoList, setPotatoList] = useState(["potato","potato","potato"]);

  const potatoAdd = (s) => {
    setPotatoList(potatoList.concat(["more potato"]));
  }

  return (
    <div className="col">
      <h1> Dashboard </h1>

      <button onClick={potatoAdd}>add potato</button> <br/>

      {potatoList.map((a) => <button>{a}</button>)}

    </div>
  );
}

export default Dashboard;