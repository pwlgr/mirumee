import * as React from 'react';
import { useEffect, useState, useReducer } from 'react';
import uuid from 'uuid/v1';
import Film from '../film/film';
import NewFilm from '../newFilm/newFilm';
import { Loader } from '../loader';
import { Logo } from '../SVG/logo';
import './scss/index.scss';

const Films: React.FC = () => {
	const [ loading, setLoading ] = useState(false);
	const [ films, setFilms ] = useState([]);
	useEffect(() => {
		const getFilms = async () => {
			setLoading(true);
			const result = await fetch('https://swapi.co/api/films/');
			const data = await result.json();
			setLoading(false);
			setFilms(data.results.map((e) => ({ title: e.title, planets: e.planets })));
		};
		getFilms();
	}, []);
	const addNewFilm = (film) => {
		setFilms([ ...films, film ]);
	};
	return (
		<div className="films-container">
			<Logo />
			<div className="films-container__list">
				{loading ? (
					<Loader />
				) : (
					films.map(({ title, planets }) => <Film key={title} name={title} planets={planets} />)
				)}
			</div>
			<NewFilm addFilm={addNewFilm} />
		</div>
	);
};

export default Films;
