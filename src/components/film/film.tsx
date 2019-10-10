import * as React from 'react';
import { useState } from 'react';
import { Planet } from '../../types/types';
import { Loader } from '../loader';
import { ArrowDown } from '../svg/arrowDown';
import { ArrowUp } from '../svg/arrowUp';
import './scss/index.scss';

const parameters = {
	name: 'Planet Name',
	rotation_period: 'Rotation period',
	orbital_period: 'Orbital period',
	diameter:'Diameter',
	climate:'Climate',
	surface_water: 	'Surface water',
	population: 'Population'
};

const Film: React.FC<Planet> = ({ name, planets }) => {
	const [ planetList, setPlanetList ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ details, setDetails ] = useState(false);
	const [ sorting, setSorting ] = useState('name');
	const getPlanets = async (e) => {
		e.stopPropagation();
		setDetails(!details);
		setLoading(true);
		const fetchedPlanetsInfo = planets.map(async (film) => {
			const response = await fetch(film);
			return response.json();
		});
		const done = await Promise.all(fetchedPlanetsInfo).then((info) => info);
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
	const generateProperties = (prop, value, key) => (
		<div key={`${prop}_${value}_${key}`}>
			<span>{parameters[prop]}</span>
			<span style={sorting === prop ? {color: '#1ba1be'} : {color: '#474747'}}>{value}</span>
		</div>
	);
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
					{Object.entries(parameters).map(([param, name],i ) => (
						<span
							style={sorting === param ? {color: '#1ba1be'} : {color: '#474747'}}
							key={`tag_${i}${param}`}
							onClick={(e) => {
								e.stopPropagation();
								setSorting(param)
							}}>{name}&#8645;
						</span>)
					)}
					</div>
					<hr />
					{loading ? (
					<Loader />
				) : planetList.length ? (
					<div className="film-container__details-planet">
						{planetList.sort(sortPlanets).map((e) => (
							<div key={`param_${e.name}`} className="film-container__details__params">
								{(Object.entries(e)
									.filter(param => Object.keys(parameters).includes(param[0]))
									.map(([prop, value], i) => generateProperties(prop, value, i)))} 
							</div>) // nie wiem czy do końca mi sie to podoba i czy BigO byłoby tutaj ok przy większej ilości
						)}
					</div>
				) : <h3>Sorry, no planets...</h3>}
					</>
				}
			</div>
		</div>
	);
};

export default Film;
