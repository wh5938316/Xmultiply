import React, {Component} from 'react'
import Layout from '../components/Layout'
// import axios from 'axios'
import fetch from 'isomorphic-unfetch'
import ProductList from '../components/ProductList'

// const domain = process.env.NODE_ENV === 'development' ? 'http://www.smultiply.com/' : 'http://118.24.102.96:80/';
const domain = process.env.NODE_ENV === 'development' ? 'http://118.24.102.96:80/' : 'http://118.24.102.96:80/';

class ViewProduct extends Component {

  constructor(props) {
      super(props);
      // 可以使用 props了
      this.state = {
        productList: this.props.productList ? this.props.productList : []
      }
  }

  componentDidMount() {
  }

  render() {
    console.log(this.props);
    return (
			<Layout>
        <ProductList productList={this.state.productList} />
				<style jsx>{`
				`}</style>
			</Layout>
    );
  }
}

ViewProduct.getInitialProps = async function (context) {
  const res = await fetch(`${domain}api/v1/products`)
  const productList = await res.json()

  return { productList }
}

export default ViewProduct;