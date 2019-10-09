import * as React from 'react';
import { useState, useEffect } from 'react';
import { Planet } from '../../types/types';
import { Loader } from '../loader';
import { ArrowDown } from '../svg/arrowDown';
import { ArrowUp } from '../svg/arrowUp';
import './scss/index.scss';

const params = [
	{ tag: 'Planet Name', data: 'name' },
	{ tag: 'Rotation period', data: 'rotation_period' },
	{ tag: 'Orbital period', data: 'orbital_period' },
	{ tag: 'Diameter', data: 'diameter' },
	{ tag: 'Climate', data: 'climate' },
	{ tag: 'Surface water', data: 'surface_water' },
	{ tag: 'Population', data: 'population' }
];


const Film: React.FC<Planet> = ({ name, planets }) => {
	const [ planetList, setPlanetList ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ details, setDetails ] = useState(false);
	const [sorting, setSorting] = useState('name');
	const getPlanets = async (e) => {
		e.stopPropagation();
		setDetails(!details);
		setLoading(true);
		const fetchedPlanetsInfo = planets.map(async (film) => {
			const response = await fetch(film);
			return response.json();
		});
		const done = await Promise.all(fetchedPlanetsInfo).then((asd) => {
			return asd;
		});
			setPlanetList(done);
			setLoading(false);
	};
	const sortPlanets = (a,b) => {
		if ( a[sorting] < b[sorting]){
			return -1;
		  }
		  if ( a[sorting] > b[sorting] ){
			return 1;
		  }
		  return 0;
	}
	return (
		<div className="film-container">
			<div className="film-container__collapser" onClick={(e) =>{
				if(!details){
					getPlanets(e)
					setDetails(true);
				} else {
					setDetails(false)
				}
			}}>
				<p>{name}</p>
				{!details ? <ArrowDown /> : <ArrowUp />}
			</div>
			<div className="film-container__details">
				{details && <>
					<div className="film-container__details__tags">
						{params.map(({ tag, data }, i) => <span
							key={`tag_${i}${name}`}
							onClick={(e) => {
								e.stopPropagation();
								setSorting(data);
							}}>{tag}&#8645;</span>)}
					</div>
					<hr />
					{loading ? (
					<Loader />
				) : planetList.length ? (
					<div>
					{planetList.sort(sortPlanets).map(({ name, rotation_period, orbital_period, diameter, climate, surface_water, population }) => <div key={`param_${name}`} className="film-container__details__tags">
						<span>{name}</span>
						<span>{rotation_period}</span>
						<span>{orbital_period}</span>
						<span>{diameter}</span>
						<span>{climate}</span>
						<span>{surface_water}</span>
						<span>{population}</span>
					</div>)}
					</div>
				) : <h3>Sorry, no planets...</h3>}
					</>
				}

			</div>
		</div>
	);
};

export default Film;
