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
  // console.log('Props: ', props)
  const { id } = useParams()

  const [movie, setMovie] = useState(movieTemplate)
  const [cast, setCast] = useState('')


  useEffect(() => {
    const movieBeingUpdated = props.movies.find(movie => `${movie.id}` === id)
    // console.log('Updating: ',movieBeingUpdated);
    if (movieBeingUpdated){
      setMovie(movieBeingUpdated)
      // console.log("after update: ", movie)
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

//TODO: This should work as intended, however until I can get the list to display properly, better to leave it out

  const updateCastList = (ev, value) => {

  //   console.log(ev.target.checked)

  //   if (ev.target.checked) {
  //     setCast(cast.filter(function(val) {return val !== value})
      // }
  }



  const updateMovie = ev => {
    ev.preventDefault()
    // console.log(movie)
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
      <div>
        <form>
          {
            // TODO: can't get this one to work. It shows the number of checkboxes needed, but can't populate the label.

            movie.stars.map(cast=> {
              console.log("Checking Array: ", movie.stars)
              return (

                  <input
                  key={movie}
                  value={cast}
                  name="castList"
                  type="checkbox"
                  label={cast}
                  onClick={updateCastList}
                  />

              )
            })
          }
          <button type="sumbit">Remove CastMember</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateMovie