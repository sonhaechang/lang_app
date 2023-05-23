
import React, { useEffect, useState } from 'react';

import styled from 'styled-components/native';


const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const Box = styled.TouchableOpacity`
	background-color: tomato;
	width: 200px;
	height: 200px;
`;

export default function App() {
	const [y, setY] = useState(0);
	const [intervalId, setIntervalId] = useState(null);

	const mvoeUp = () => {
		const id = setInterval(() => setY(prev => prev+1), 1);
		setIntervalId(id)
	}

	useEffect(() => {
		if (y === 200) { clearImmediate(intervalId); }
	}, [y, intervalId]);

	return (
		<Container>
			<Box 
				onPress={mvoeUp} 
				style={{
					transform: [{ translateY: y }],
				}}
			/>
		</Container>
	);
}
