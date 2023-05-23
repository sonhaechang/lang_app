
import React, { useRef, useState } from 'react';
import { Animated, Pressable } from 'react-native';

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

	const Y_POSITION = useRef(new Animated.Value(250)).current;

	const toggleUp = () => setUp((prev) => !prev);

	const mvoeUp = () => {
		Animated.timing(Y_POSITION, {
			toValue: up ? 250 : -250,
			duration: 1000,
			useNativeDriver: true,
		}).start(toggleUp);
	};

	const opacityValue = Y_POSITION.interpolate({
		inputRange: [-250, 0, 250],
		outputRange: [1, 0.5, 1],
	});

	const borderRadiusValue = Y_POSITION.interpolate({
		inputRange: [-250, 250],
		outputRange: [100, 0],
	});

	return (
		<Container>
			<Pressable onPress={mvoeUp} >
				<AnimatedBox 
					style={{
						opacity: opacityValue,
						borderRadius: borderRadiusValue,
						transform: [{ translateY: Y_POSITION }],
					}}
				/>
			</Pressable>
		</Container>
	);
}
