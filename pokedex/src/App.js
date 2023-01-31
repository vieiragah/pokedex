import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container, Title } from './styled';


function App() {
  const [list, setList] = useState([])


  useEffect(() => {
    axios
    .get('https://pokeapi.co/api/v2/pokemon')
    .then((res) => setList(res.data.results));
 
  }, []);
  
  const Pokemon = ({data}) => {
    const [details, setDetails] = useState(null)

    useEffect(() => {
      axios.get(data.url)
      .then((res) => setDetails(res.data))
    }, []);

    if(details === null){
      return <div>---</div>
    }
    return <Container>
        <img src={details.sprites.front_shiny} />
        <p><strong>{details.name}</strong> - EXP {details.base_experience}</p> 
        
    </Container>
  }

  return (
    <div>
      <Title>Pokedex</Title>
      <hr />
      {list.map((item) => (
        <Pokemon key={item.name} data={item}/>
      ))}
    </div>
  );
}

export default App;
