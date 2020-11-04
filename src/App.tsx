import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Sketch from "react-p5";
import p5Types, { WEBGL } from "p5"; //Import this for typechecking and intellisense

function App() {
	const [x, setX] = useState(10)
	const [y, setY] = useState(10)

	function normalize(a: number): number {
		if(a < 0) {
			return 0
		}
		return a
	}

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		let w = p5.windowWidth
		let h = p5.windowHeight
		let c = p5.createCanvas(w, h, p5.WEBGL).parent(canvasParentRef);
	};

	const draw = (p5: p5Types) => {
		p5.background(205, 105, 94);
		p5.rotateX(p5.millis() / 10000)
		p5.rotateY(p5.millis() / 1000)
		p5.ellipsoid(300, 400, 400, x, y);
	};

	return (
		<div className="App">
			<Sketch setup={setup} draw={draw} />
			<div className="Ruler">
				<p>Max: 24</p>
				<p><b>X: </b>
					<span onClick={()=>setX(normalize(x-1))}>decrease</span> {x} <span onClick={()=>setX(x+1)}>increase</span>
				</p>
				<p><b>Y: </b>
					<span onClick={()=>setY(normalize(y-1))}>decrease</span> {y} <span onClick={()=>setY(y+1)}>increase</span>
				</p>
			</div>
		</div>
	);
}

export default App;
