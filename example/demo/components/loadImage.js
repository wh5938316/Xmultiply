import React, {Component} from 'react'

const defaultWidth = '100px';
const defaulHeight = '100px';

class LoadImage extends Component {

  // constructor(props) {
  //     super(props);
  //     // 可以使用 props了
  // }

  componentDidMount() {
  }

  render() {
		const { src, landscape, width, height } = this.props;
    return (
		<div style={
			{
				width: width ? width : defaultWidth,
				height: height ? height : defaulHeight,
				// background: `url(${landscape})`
			}
		}>
			<img src={ src } alt="image" width={width ? width : defaultWidth} height={height ? height : defaulHeight} />
		</div>
    );
  }
}

export default LoadImage;
