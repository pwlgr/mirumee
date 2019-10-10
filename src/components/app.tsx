import * as React from 'react';
import '../globalStyles/index.scss';
import Films from './films/films';

class App extends React.Component<{}, {}> {
	render() {
		return (
			<div>
				<Films />
			</div>
		);
	}
}

export default App;
