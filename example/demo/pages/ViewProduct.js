import React, {Component} from 'react'
import Layout from '../components/Layout'
// import axios from 'axios'
import fetch from 'isomorphic-unfetch'
import ProductList from '../components/ProductList'

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
  const res = await fetch(`http://www.smultiply.com/api/v1/product/list`)
  const productList = await res.json()

  return { productList }
}

export default ViewProduct;