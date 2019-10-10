import * as React from 'react';
import { useEffect, useState } from 'react';
import uuid from 'uuid/v1';
import Film from '../film/film';
import NewFilm from '../newFilm/newFilm';
import { Loader } from '../loader';
import { Logo } from '../svg/logo';
import './scss/index.scss';

const Films: React.FC = () => {
	const [ loading, setLoading ] = useState(false);
	const [ films, setFilms ] = useState([]);
	const localFilms = JSON.parse(localStorage.getItem('films')) || [];
	useEffect(() => {
		const getFilms = async () => {
			setLoading(true);
			const result = await fetch('https://swapi.co/api/films/');
			const data = await result.json();
			setLoading(false);
			setFilms([ ...data.results.map((e) => ({ title: e.title, planets: e.planets })), ...localFilms ]);
		};
		getFilms();
	}, []);
	const addNewFilm = (film) => {
		const updatedLocalFilms = [ ...localFilms, film ];
		localStorage.setItem('films', JSON.stringify(updatedLocalFilms));
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
			<NewFilm addFilm={addNewFilm} name="Add movie" />
			<p className="copyright">COPYRIGHT © 2019 MIRUMEE SOFTWARE</p>
		</div>
	);
};

export default Films;
