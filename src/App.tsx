import * as React from 'react';
import './style.css';

export default function App() {
  let [getChampions, setChampions] = React.useState([]);
  let [champion, setChampion] = React.useState(-1);
  let [searchedChampionName, setSearchedChampionName] = React.useState('');
  let [searchedChampionInfo, setSearchedChampionInfo] = React.useState([]);
  let championSkins = [];

  let [contadorSkin, setContadorSkin] = React.useState(0);
  let [skinId, setSkinId] = React.useState(0);

  React.useEffect(() => {
    fetch(
      'https://ddragon.leagueoflegends.com/cdn/13.11.1/data/pt_BR/champion.json'
    )
      .then((response) => response.json())
      .then(function (response) {
        let champions = Object.keys(response.data).map((key) => [
          response.data[key],
        ]);
        setChampions(champions);
      });
  }, []);

  function fetchChampion() {
    let championIndex = -1;
    getChampions.map(function (element, index) {
      element[0]['name'] == searchedChampionName ? (championIndex = index) : '';
    });
    setChampion(championIndex);
    try {
      fetch(
        `https://ddragon.leagueoflegends.com/cdn/13.11.1/data/pt_BR/champion/${getChampions[championIndex][0]['name']}.json`
      ).then((response) =>
        response.json().then((response) => {
          console.log(response.data["Ahri"]);
          setSearchedChampionInfo(response);
        })
      );
    } catch {
      console.log('Não encontrado');
    }
  }

  function changeSkin() {
    console.log(championSkins);
  }

  function handleChange(event) {
    setSearchedChampionName(event.target.value);
  }

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <button onClick={fetchChampion}>SEARCH</button>
      <h1>{champion != -1 ? getChampions[champion][0]['name'] : ''}</h1>
      {champion == 1000 ? (
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${getChampions[champion][0]['name']}_${skinId}.jpg`}
        />
      ) : (
        ''
      )}
      <button onClick={changeSkin}>{'<'}</button>
      <button>{'>'}</button>
    </div>
  );
}
