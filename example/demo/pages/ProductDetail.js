import React, {Component} from 'react'
import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'
import ModelList from '../components/ModelList'

const domain = process.env.NODE_ENV !== 'development' ? 'http://www.smultiply.com/' : 'http://118.24.102.96:80/';

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
				<ModelList objects={info.objects} />
				<style jsx>{`
				`}</style>
			</Layout>
    );
  }
}

ViewModel.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`${domain}api/v1/products/${id}/objects`)
  const resData = await res.json()
  let info = [];
  if(!resData.errors) {
    info = resData.data;
  }
	// const info = {
	// 	'mainImage': '/static/image/image1.jpg',
	// 	'threeShot': [{
	// 		'id': 1,
	// 		'name': 'Left Side',
	// 		'img': '/static/image/image1.jpg',
	// 		'object': ''
	// 	}, {
	// 		'id': 2,
	// 		'name': 'Right Side',
	// 		'img': '/static/image/image1.jpg',
	// 		'object': ''
	// 	}]
	// }

  return { info }
}

export default ViewModel;