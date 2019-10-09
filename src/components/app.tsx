import * as React from 'react';
import '../globalStyles/index.scss';
import PageInterface from '../PageInterface';
import Films from './films/films';

class App extends React.Component<PageInterface, {}> {
	render() {
		return (
			<div>
				<Films />
			</div>
		);
	}
}

export default App;
