import React, {Component} from 'react'
import Layout from '../components/Layout'
import ModelList from '../components/ModelList'

class ViewModel extends Component {

  // constructor(props) {
  //     super(props);
  //     // 可以使用 props了
  // }

  componentDidMount() {
  }

  render() {
		const { info } = this.props;
    return (
			<Layout>
				<ModelList threeShot={info.threeShot} />
				<style jsx>{`
				`}</style>
			</Layout>
    );
  }
}

ViewModel.getInitialProps = async function (context) {
  const { id } = context.query
  // const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
	// const show = await res.json()
	const info = {
		'mainImage': '/static/image/image1.jpg',
		'threeShot': [{
			'id': 1,
			'name': 'Left Side',
			'img': '/static/image/image1.jpg',
			'object': ''
		}, {
			'id': 2,
			'name': 'Right Side',
			'img': '/static/image/image1.jpg',
			'object': ''
		}]
	}

  return { info }
}

export default ViewModel;