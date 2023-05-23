
import React, { useRef } from 'react';
import { Animated, Dimensions, Pressable } from 'react-native';

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

const { 
	width: SCREEN_WIDTH, 
	height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export default function App() {
	const POSITION = useRef(new Animated.ValueXY({
		x: -SCREEN_WIDTH / 2 + 100,
		y: -SCREEN_HEIGHT / 2 + 100,
	})).current;

	const topLeft = Animated.timing(POSITION, {
		toValue: {
			x: -SCREEN_WIDTH / 2 + 100,
			y: -SCREEN_HEIGHT / 2 + 100,
		},
		useNativeDriver: false,
	});

	const bottomLeft = Animated.timing(POSITION, {
		toValue: {
			x: -SCREEN_WIDTH / 2 + 100,
			y: SCREEN_HEIGHT / 2 - 100,
		},
		useNativeDriver: false,
	});

	const bottomRight = Animated.timing(POSITION, {
		toValue: {
			x: SCREEN_WIDTH / 2 - 100,
			y: SCREEN_HEIGHT / 2 - 100,
		},
		useNativeDriver: false,
	});

	const topRight = Animated.timing(POSITION, {
		toValue: {
			x: SCREEN_WIDTH / 2 - 100,
			y: -SCREEN_HEIGHT / 2 + 100,
		},
		useNativeDriver: false,
	  });

	const mvoeUp = () => {
		Animated.loop(
			Animated.sequence([bottomLeft, bottomRight, topRight, topLeft])
		).start();
	};

	const bgColorValue = POSITION.y.interpolate({
		inputRange: [-300, 300],
		outputRange: ['rgb(255, 99, 71)', 'rgb(71, 166, 255)'],
	});

	const borderRadiusValue = POSITION.y.interpolate({
		inputRange: [-300, 300],
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
							...POSITION.getTranslateTransform(),
						],
					}}
				/>
			</Pressable>
		</Container>
	);
}
