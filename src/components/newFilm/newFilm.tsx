import * as React from 'react';
import { useState } from 'react';
import { Autocomplete } from 'react-toolbox/lib/autocomplete';
import { Input } from 'react-toolbox/lib/input';
import { Film, AddFilm } from '../../types/types';
import { ArrowDown } from '../svg/arrowDown';
import { ArrowUp } from '../svg/arrowUp';
import { Search } from '../svg/search';
import '../film/scss/index.scss';

const NewFilm: React.FC<AddFilm> = ({ addFilm, name }) => {
	const [ planets, setPlanets ] = useState([]);
	const [ suggestions, setSuggestions ] = useState({});
	const [ details, showDetails ] = useState(false);
	const [ film, setFilm ] = useState<Film>({ title: '', planets: [] });
	const getFilms = async (input) => {
		const result = await fetch(`https://swapi.co/api/planets/?search=${input}`);
		const data = await result.json();
		setSuggestions({
			...suggestions,
			...data.results.reduce((prev, next) => ({ ...prev, [next.url]: next.name }), {})
		}); //TODO: debouncing
	};
	const addPlanets = (planets) => {
		setPlanets(planets);
		setFilm({
			...film,
			planets
		});
	};
	const { title } = film;
	const disabled = title.length < 3;
	const saveFilm = () => {
		if(!disabled){
			addFilm(film);
			setFilm({ title: '', planets: [] });
			setPlanets([]);
			setSuggestions({});
		}
	};
	return (
		<div className="film-container">
			<div className="film-container__collapser" onClick={() => showDetails(!details)}>
				<p>{name}</p>
				{!details ? <ArrowDown /> : <ArrowUp />}
			</div>
			<div className="film-container__details new">
				{details ? <> 
						<Input
							className="film-container__details__input"
							label="Movie title"
							error={disabled && 'Title must have at least 3 characters.'}
							value={title}
							onChange={(e) => setFilm({ ...film, title: capitalizeTitle(e) })} />
						<div className="film-container__details__input-search">
							<Autocomplete
								label="Add planet"
								onQueryChange={getFilms}
								source={suggestions}
								onChange={addPlanets}
								value={planets}
								keepFocusOnChange={false} />
							<Search />
						</div>
						<div 
							className={`film-container__details__button ${!disabled ? 'enabled': 'disabled'}`}
							onClick={saveFilm}>add movie
						</div>
					</>
				: null }
			</div>
		</div>
	);
};

const capitalizeTitle = (title) => title.charAt(0).toUpperCase() + title.slice(1);

export default NewFilm;
