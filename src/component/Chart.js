import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import '../index.scss';


const sample = [
        {language:'JAVA', user: 810},
        {language:'C', user: 451},
        {language:'C++', user: 499},
        {language:'PYTHON', user: 854},
        {language:'JAVASCRIPT', user: 524},
        {language:'MATLAB', user: 104},
        {language:'RUBY', user: 50},
        {language:'REACT', user: 350},
        {language:'NODE', user: 750},
        {language:'ANGULAR', user: 300},
        {language:'VUE', user: 150}
]


const Chart = () => {

	const d3Chart = useRef() 
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	})
	const update = useRef(false)

	useEffect(()=>{
		window.addEventListener('resize', ()=>{
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight
			})

			if(update.current){
				d3.selectAll('g').remove()
			} else {update.current = true}
		})

		DrawChart(sample,dimensions)

	},[dimensions])

	const margin = {top: 50, right:30, bottom: 30, left:60}

	function DrawChart(data, dimensions){


		const chartwidth = parseInt(d3.select('#d3demo').style('width')) - (5*margin.left) - (5*margin.right);
		const chartheight = parseInt(d3.select('#d3demo').style('height')) - margin.top - margin.bottom


		const svg = d3.select(d3Chart.current)
						.attr('width', chartwidth + margin.left + margin.right)
						.attr('height', chartheight + margin.top + margin.bottom)

		// x scale
		const x = d3.scaleBand()
					.domain(d3.range(data.length))
					.range([margin.left, chartwidth - margin.right])
					.padding(0.2)

		svg.append('g')
			.attr('transform', 'translate(0,'+ chartheight + ')')
			.call(d3.axisBottom(x).tickFormat(i=>data[i].language).tickSizeOuter(0))

		const max = d3.max(data, function(d){return d.user})

		// y scale
		const y = d3.scaleLinear()
					.domain([0, max])
					.range([chartheight, margin.top])

		svg.append('g')
			.attr('transform', 'translate(' + margin.left + ',0)')
			.call(d3.axisLeft(y))

		svg.append('g')
			.attr('fill','#ff0000')
			.selectAll('rect')
			.data(data)
			.join('rect')
				.attr('x', (d,i) => x(i))
				.attr('y', d => y(d.user))
				.attr('height', d=>y(0)-y(d.user))
				.attr('width', x.bandwidth())
	}

	return (
		<div id='d3demo'>
		  <svg ref={d3Chart}></svg>
		</div>
	)
}

export default Chart