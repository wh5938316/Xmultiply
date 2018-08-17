import React, { Component } from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

let counter = 0;
function createData(img, name) {
  counter += 1;
  return { id: counter, img, name };
}

class ProductList extends Component {

  constructor(props) {
		super(props);
		// 可以使用 props了
		this.state = {
			data: props.productList,
			selected: []
		}
  }

  componentDidMount() {

	}
	
	
  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
	};
	
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
		const { data } = this.state;
    return (
      <div className="container">
				<div className="wrap">
					<Paper>
						<Table>
							<TableBody>
								{data
									.map(n => {
										const isSelected = this.isSelected(n.id);
										return (
											<TableRow
												hover
												role="checkbox"
												aria-checked={isSelected}
												tabIndex={-1}
												key={n.id}
												selected={isSelected}
											>
												<TableCell padding="checkbox">
													<Checkbox
														checked={isSelected}
														onClick={event => this.handleClick(event, n.id)}
													/>
												</TableCell>
												<TableCell component="th" scope="row" padding="default">
													<img src={n.img} alt={n.name} width={80} height={80} />
												</TableCell>
												<TableCell component="th" scope="row" padding="default">
													<Typography variant="headline" component="h3">
														{n.name}
													</Typography>
												</TableCell>
												<TableCell component="th" scope="row" padding="default">
													<Link href={`/product/${n.id}`}>
														<Button variant="contained" color="secondary" aria-label="Delete">
															详情
														</Button>
													</Link>
												</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</Paper>
				</div>
				<style jsx>{`
					.container {

					}
					.wrap {
						max-width: 1000px;
						margin-left: auto;
						margin-right: auto;
					}
				`}</style>
			</div>
    );
  }
}

export default ProductList;
