
import React, { useRef, useState } from 'react';
import { Animated, Easing, TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';


const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const Box = styled.View`
	background-color: tomato;
	width: 200px;
	height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
	const [up, setUp] = useState(false);

	const Y = useRef(new Animated.Value(0)).current;

	const toggleUp = () => setUp((prev) => !prev);

	const mvoeUp = () => {
		Animated.timing(Y, {
			toValue: up ? 200 : -200,
			easing: Easing.cubic,
			useNativeDriver: true,
		}).start(toggleUp);
	};

	Y.addListener(() => console.log(Y));

	return (
		<Container>
			<TouchableOpacity onPress={mvoeUp} >
				<AnimatedBox 
					style={{
						transform: [{ translateY: Y }],
					}}
				/>
			</TouchableOpacity>
		</Container>
	);
}
