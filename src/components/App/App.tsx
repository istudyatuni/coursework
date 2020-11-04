import React, { useState, useEffect } from 'react';
import './App.css';

import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

// import useKeypress from '../../hooks/useKeypress'

function useKeypress(key: string, action: ()=>void) {
	useEffect(()=>{
		function onKeydown(e: any) {
			if(e.key === key) {
				e.preventDefault()
				action()
			}
		}
		window.addEventListener('keydown', onKeydown)
		return () => window.removeEventListener('keydown', onKeydown)
	}, []);
}

function App() {
	const [posX, setPosX] = useState(10)
	const [posY, setPosY] = useState(10)

	const [rotX, setRotX] = useState(0)
	const [rotY, setRotY] = useState(0)

	// for non-console log
	const [logMsg, writeLog] = useState('Log')
	function log(msg: string, delay: number = 1000) {
		writeLog(msg)
		setTimeout(function(){ writeLog('Log') }, delay)
	}

	// rotate
	useKeypress('ArrowUp', () => setRotX(rotX => rotX + 0.05));
	useKeypress('ArrowLeft', () => setRotY(rotY => rotY - 0.05));
	useKeypress('ArrowDown', () => setRotX(rotX => rotX - 0.05));
	useKeypress('ArrowRight', () => setRotY(rotY => rotY + 0.05));

	// move
	useKeypress('w', () => setPosY(posY => posY - 10));
	useKeypress('a', () => setPosX(posX => posX - 10));
	useKeypress('s', () => setPosY(posY => posY + 10));
	useKeypress('d', () => setPosX(posX => posX + 10));

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		let w = p5.windowWidth
		let h = p5.windowHeight
		p5.createCanvas(w, h, p5.WEBGL).parent(canvasParentRef);
	};

	const draw = (p5: p5Types) => {
		p5.background(205, 105, 94);

		// position
		p5.translate(posX, posY)

		// rotation
		p5.rotateX(rotX)
		p5.rotateY(rotY)

		p5.sphere(300);
	};

	return (
		<div className="App">
			<Sketch setup={setup} draw={draw} />
			<div className="Ruler">
				<p><i>Position:</i> <code>(w a s d)</code></p>
				<p><span onClick={()=>setPosX(0)}>reset</span><b>X: </b> {posX}</p>
				<p><span onClick={()=>setPosY(0)}>reset</span><b>Y: </b> {posY}</p>
				<p><i>Rotation:</i> <code>(↑ ↓ ← →)</code></p>
				<p><span onClick={()=>setRotX(0)}>reset</span><b>X: </b> {rotX}</p>
				<p><span onClick={()=>setRotY(0)}>reset</span><b>Y: </b> {rotY}</p>
				<br/>
				<p><span onClick={()=>{
					setPosX(0)
					setPosY(0)
					setRotX(0)
					setRotY(0)
				}}>Reset all</span></p>
			</div>
			<div className="logBox">
				<p>{logMsg}</p>
			</div>
		</div>
	);
}

export default App;
