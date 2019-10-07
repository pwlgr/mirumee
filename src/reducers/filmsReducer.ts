import * as React from 'react';

type Film = {
	title: string;
	planets: Array<string>;
};
type Films = {
	films: Array<Film>;
};

type ActionType = {
	type: 'GET_FILMS' | 'ADD_MOVIE';
};

interface IState {
	films?: Array<Film>;
}

interface IAction {
	type: string;
	films: Array<Film>;
}

export const initialState: IState = { films: [] };

export const reducer: React.Reducer<IState, IAction> = (state, action) => {
	switch (action.type) {
		case 'GET_FILMS':
			return {
				...state,
				films: action.films
			};
		default:
			throw new Error();
	}
};
