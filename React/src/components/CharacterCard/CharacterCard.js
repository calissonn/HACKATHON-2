import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom'

function CharacterCard(props) {
  const history = useNavigate()  

  return (
    <Card style={{ width: '18rem', marginBottom: 20 }}>
    <Card.Img variant="top" src={props.image} onClick={() => history('/details/' + props.id)}/>
  </Card>

  )
}

export default CharacterCard