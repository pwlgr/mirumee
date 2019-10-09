import * as React from 'react';
import { useState } from 'react';
import { Autocomplete } from 'react-toolbox/lib/autocomplete';
import { Film, AddFilm } from '../../types/types';
import { object } from 'prop-types';

const NewFilm: React.FC<AddFilm> = ({ addFilm }) => {
	const [ planets, setPlanets ] = useState([]);
	const [ suggestions, setSuggestions ] = useState({});
	const [ film, setFilm ] = useState<Film>({ title: '', planets: [] });
	const getFilms = async (input) => {
		const result = await fetch(`https://swapi.co/api/planets/?search=${input}`);
		const data = await result.json();
		setSuggestions({
			...suggestions,
			...data.results.reduce((prev, next) => ({ ...prev, [next.url]: next.name }), {})
		});
	};
	const addPlanets = (planets) => {
		setPlanets(planets);
		setFilm({
			...film,
			planets
		});
	};
	const save = () => {
		addFilm(film);
		setFilm({ title: '', planets: [] });
		setPlanets([]);
		setSuggestions({});
	};
	return (
		<div>
			<input onChange={(e) => setFilm({ ...film, title: e.target.value })} value={film.title} />
			<Autocomplete onQueryChange={getFilms} source={suggestions} onChange={addPlanets} value={planets} />
			<button onClick={save}>add movie</button>
		</div>
	);
};

export default NewFilm;
