import Head from './head'
import Nav from './nav'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div>
    <Head title="Home" />
    <Nav />
		<div>
			{props.children}
		</div>
    <style jsx>{`
    `}</style>
  </div>
)

export default Layout
