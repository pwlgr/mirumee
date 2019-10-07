import * as React  from 'react';
import { useEffect, useState, useReducer } from 'react';
import uuid from 'uuid/v1'
import {reducer, initialState} from '../../reducers/filmsReducer';
import Film from '../film/film';



const Films:React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false)
    const action = (films: any) => ({ type: 'GET_FILMS', films }) 
    useEffect(()=> {
        const getFilms = async () => {
            setLoading(true)
            const result = await fetch(
                "https://swapi.co/api/films/",
              );
            const data = await result.json();
            dispatch(action(data.results.map(e => ({ title: e.title, planets: e.planets }))));
            setLoading(false)
        }
        getFilms();
      }, []);
    const { films } = state;
    return <>
      <div>{loading && 'loading...'}</div>
      {films.map(({ title, planets }) => <Film key={title} name={title} planets={planets} /> )}
    </>
  }

  export default Films;