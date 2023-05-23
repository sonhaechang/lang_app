
import React, { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

import styled from 'styled-components/native';


const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: #fff;
`;

const Box = styled.View`
	background-color: tomato;
	width: 200px;
	height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
	const POSITION = useRef(new Animated.ValueXY({
		x: 0,
		y: 0,
	})).current;

	const bgColorValue = POSITION.y.interpolate({
		inputRange: [-300, 300],
		outputRange: ['rgb(255, 99, 71)', 'rgb(71, 166, 255)'],
	});

	const borderRadiusValue = POSITION.y.interpolate({
		inputRange: [-300, 300],
		outputRange: [100, 0],
	});

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderGrant: () => {
				POSITION.setOffset({
					x: POSITION.x._value,
					y: POSITION.y._value,
				});
			},
			onPanResponderMove: (_, {dx, dy}) => {
				POSITION.setValue({
					x: dx, 
					y: dy,
				});
			},
			onPanResponderRelease: () => {
				POSITION.flattenOffset();
			},
		})
	).current;

	return (
		<Container>
			<AnimatedBox 
				{...panResponder.panHandlers}
				style={{
					backgroundColor: bgColorValue,
					borderRadius: borderRadiusValue,
					transform: [
						...POSITION.getTranslateTransform(),
					],
				}}
			/>
		</Container>
	);
}
