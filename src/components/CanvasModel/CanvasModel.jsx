import React, { Component, PureComponent, PropTypes } from 'react'

class CanvasModel extends Component {
// class ColorBar extends (PureComponent || Component) {

	constructor(props) {
		super(props)
	}

	render() {
		// let {pointer, style, pointerStyle, direction, model} = this.props

		return (
			<div>
				<canvas/>
			</div>
		)
	}
}

export default CanvasModel