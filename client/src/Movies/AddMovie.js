import React,{ useState } from 'react'
import Axios from 'axios'

export const AddMovie = (props) => {

  const movieTemplate = {
    id: Date.now(),
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
    Axios.post(`http://localhost:5000/api/movies/`, movie)
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
          Add Movie to Database
        </button>
      </form>
    </div>
  )
}

export default AddMovie