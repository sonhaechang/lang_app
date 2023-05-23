
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

	const POSITION = useRef(new Animated.ValueXY({x: 0, y: 250})).current;

	const toggleUp = () => setUp((prev) => !prev);

	const mvoeUp = () => {
		Animated.timing(POSITION, {
			toValue: up ? 250 : -250,
			duration: 1000,
			useNativeDriver: false,
		}).start(toggleUp);
	};

	const bgColorValue = POSITION.y.interpolate({
		inputRange: [-250, 250],
		outputRange: ['rgb(255, 99, 71)', 'rgb(71, 166, 255)'],
	});

	const rotationValue = POSITION.y.interpolate({
		inputRange: [-250, 250],
		outputRange: ['-360deg', '360deg'],
	});

	const borderRadiusValue = POSITION.y.interpolate({
		inputRange: [-250, 250],
		outputRange: [100, 0],
	});

	return (
		<Container>
			<Pressable onPress={mvoeUp} >
				<AnimatedBox 
					style={{
						backgroundColor: bgColorValue,
						borderRadius: borderRadiusValue,
						transform: [
							{ rotateY: rotationValue },
							{ translateY: POSITION.y }
						],
					}}
				/>
			</Pressable>
		</Container>
	);
}
