import React, {useEffect, useState, useRef} from 'react'
import './Home.css'
import {getCharacters} from '../../services/getCharacter'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import Button from 'react-bootstrap/Button'

function Home() {

  const [characters, setCharacters] = useState({
    results: [],
    info: {}
  })
  const refForm = useRef();
  const [requestPage, setRequestPage] = useState(1)
  const apiRequest = async (page, event) => {
    if(event) event.preventDefault()
    let params = {
      page
    }
    if(refForm.current[0].value) {
      params = {
        ...params,
        name: refForm.current[0].value
      }
    }
    const response = await getCharacters(params)
    setCharacters(response)
    setRequestPage(page)
  }

  useEffect(() => {
    apiRequest(1)
  }, [])

  

  return (
    <div className="home">
      <section className="home__heading">
      Quantos zumbis você matou?
              </section>
      <section className="home__characters">
      {requestPage === 1 && <div>O projeto tem duas telas, sendo a primeira como apresentação do sistema e a segunda para consumir API.
      Assim que clicamos em um personagem, irá ser direcionado para uma segunda tela, aonde terá as informações trazidas pela API.
      Nas informações contém a última localização conhecida, visto pela primeira vez e os episódios que cada personagem está presente. </div>}
      
       </section>
       <br/>
        <div className="home__characters__list">
          {characters.results.map((character) => (
            <CharacterCard
              id={character.id}
              name={character.name}
              image={character.image}
              status={character.status}
              location={character.location.name}
              gender={character.gender}
              species={character.species}
            />
          ))}
        </div>
      <div className="home__controls">
        <form ref={refForm} onSubmit={(e) => apiRequest(1, e)} className="home__characters__search">
          <input id="search" type='text' className="form-control"  placeholder="Pesquisar"/>
          <Button type="submit" variant="light">Buscar</Button>
        </form>
        {characters.info.prev && ( 
          <Button onClick={() => apiRequest(requestPage - 1)} variant="light">Página anterior</Button>
        )}
        {requestPage}
        {characters.info.next && ( 
          <Button onClick={() => apiRequest(requestPage + 1)} variant="light">Proxíma pagina</Button>
        )}
  
      </div>
    </div>
  )
}

export default Home