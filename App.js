
import React from 'react';
import { Animated } from 'react-native';

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

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
	const Y = new Animated.value(0);

	const mvoeUp = () => {};

	return (
		<Container>
			<AnimatedBox 
				onPress={mvoeUp} 
				style={{
					transform: [{ translateY: Y }],
				}}
			/>
		</Container>
	);
}
