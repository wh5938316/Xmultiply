import React, {Component} from 'react'
import fetch from 'isomorphic-unfetch'

class UploadFile extends Component {

  // constructor(props) {
  //     super(props);
  //     // 可以使用 props了
  // }

  componentDidMount() {
	}
	
	handleClick(event, _this) {
		_this.fileInput.click()
	}

	handleChange(event, _this) {
		_this.handleUpload(event);
	}

	handleUpload(event) {
		const _this = this;
		const { url, name, uploadSuccessParam } = this.props;
		let filedata = new FormData();
		let file = event.target.files[0];
    filedata.append('file', file, file.name);
    // filedata.append('chunk', '0');
		fetch(url, {
			method: 'POST',
			// headers: {
			// 	// 'Content-Type': 'multipart/form-data',
			// 	'Content-Type': 'application/x-www-form-urlencoded'
			// },
			mode: "cors",
			// redentials: 'include',
			body: filedata
		}).then( r => {
			return r.json();
		}).then(function(json) {
			_this.props.uploadSuccess(json.data.url, name, ...uploadSuccessParam);
		}).catch(function(ex) {
			console.log('parsing failed', ex);
		})
	}

  render() {
    return (
			<div
				onClick = {event => this.handleClick(event, this)}
				>
				<input 
					ref={(input)=>{this.fileInput = input}}
					type="file"
					onChange = {event => this.handleChange(event, this)}
					style={{
						'display': 'none'
					}} />
				{this.props.children}
			</div>
    );
  }
}

export default UploadFile;
