import * as React from 'react';

import PageInterface from '../PageInterface';

class App extends React.Component<PageInterface, {}> {
	render() {
		return (
			<div>
				<h1>test {this.props.text}</h1>
			</div>
		);
	}
}

export default App;
