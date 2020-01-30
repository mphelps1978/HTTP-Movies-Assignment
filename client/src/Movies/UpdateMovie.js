import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

import './movieapp.css'

import { Card, TextField, Button } from '@material-ui/core';

  const movieTemplate = {
    title: '',
    director: '',
    metascore: '',
    stars: []
  };



const UpdateMovie = (props) => {
  console.log('Props: ', props)
  const { id } = useParams()

  const [movie, setMovie] = useState(movieTemplate)
  const [cast, setCast] = useState('')


  useEffect(() => {
    const movieBeingUpdated = props.movies.find(movie => `${movie.id}` === id)
    // console.log('Updating: ',movieBeingUpdated);
    if (movieBeingUpdated){
      setMovie(movieBeingUpdated)
    }
  }, [props.movies, id])

  const handleChange = ev => {
    ev.persist()
    let value = ev.target.value

    if (ev.target.name === 'metascore') {
      value=parseInt(value, 10)
    }
    setMovie({
      ...movie,
      [ev.target.name]: value
    })
  }

  const handleCast = ev => {
    ev.persist()
    let value = ev.target.value

    setCast(value)
  }

  const addCast = ev => {
    ev.preventDefault()
    setMovie({
      ...movie,
      stars:[
        ...movie.stars,
        cast
      ]
    })
  }

  const updateMovie = ev => {
    ev.preventDefault()
    console.log(movie)
    Axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
    .then(res => {
      // console.log(res)
      props.history.push('/')
    })
    .catch(err => console.log(err));

  }

  return(
    <div>
    <h1 style={{textAlign: 'center'}}>Update Title</h1>
    <div className="addFormContainer">
    <Card>
      <form onSubmit={updateMovie} className='formStyling'>
        <TextField
          type="text"
          name="title"
          value={movie.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <TextField
          type="text"
          name="director"
          value={movie.director}
          placeholder="Director"
          onChange={handleChange}
        />
        <TextField
          type="number"
          name="metascore"
          placeholder="Metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
        <TextField
            type="text"
            name="stars"
            placeholder="Cast (One at a time)"
            value={cast}
            onChange={handleCast}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={addCast}
        >
        Add CastMember
        </Button>
        <Button
        type="submit"
        variant="contained"
        color="primary"
        >
          Update database
        </Button>
      </form>
      </Card>
      </div>
    </div>
  )
}

export default UpdateMovie