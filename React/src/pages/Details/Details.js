import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCharacterDetails } from '../../services/getCharacterDetails'
import Spinner from 'react-bootstrap/Spinner'
import './Details.css'
import Button from 'react-bootstrap/Button'

function Details() {
  const {id} = useParams()
  const [character, setCharacter] = useState(null)
  const history = useNavigate()

  const getServerData = async () => {
    const response = await getCharacterDetails(id)
    setCharacter(response)
  }

  const getEpisodes = (episodes) => {
    episodes = episodes.map((ep) => {
      const episodeUrl = ep.split('/')
      return episodeUrl[episodeUrl.length - 1]
    })

    return episodes.join(', ')
  } 

  useEffect(() =>{
    if(id) getServerData()
  },[])

  return (
    <div className="details">
      {character ? (
        <>
          <section className="details__main">
            <img src={character.image} alt={character.name} />
            <h4>{character.name}</h4>
            <p>
                <div className={`details__main__status ${character.status === 'Dead' && 'dead'}`} />
                {character.status} - {character.species}
            </p>
          </section>
          <section className="details__table">
            <p>
            Última localização conhecida: {character.location.name}
            </p>
            <p>
            Visto pela primeira vez em: {character.origin.name}
            </p>
            <p>Visto nos episódios: {getEpisodes(character.episode)}</p>
          </section>
        </>
      ) : (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center' ,width: '100vw', height: '80vh'}}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
        </div>
      )}
      <div className="details__controls">
        <Button onClick={() => history(-1)} variant="light">Voltar</Button>
      </div>
    </div>
  )
}

export default Details