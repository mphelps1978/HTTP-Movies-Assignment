import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

const UpdateMovie = (props) => {
  const { id }= useParams()
  console.log(id);

  const movieTemplate = {
    id: id,
    title: '',
    director: '',
    metascore: '',
    stars: []
  };

  const [movie, setMovie] = useState(movieTemplate)
  const [cast, setCast] = useState('')

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

  const addMovie = ev => {
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
      <form onSubmit={addMovie}>
        <input
          type="text"
          name="title"
          value={movie.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          value={movie.director}
          placeholder="Director"
          onChange={handleChange}
        />
        <input
          type="number"
          name="metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
        <input
            type="text"
            name="stars"
            placeholder="Actors (comma separated)"
            value={cast}
            onChange={handleCast}
        />
        <button
          onClick={addCast}
        >
        Add Actor
        </button>
        <button>
          Add Movie to the Database
        </button>
      </form>
    </div>
  )
}

export default UpdateMovie