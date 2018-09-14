import React, {Component} from 'react'
import Layout from '../components/Layout'
import XmultiplyCanvas from '../components/XmultiplyCanvas'
import Button from '@material-ui/core/Button';
import LoadImage from '../components/loadImage'
import UploadFile from '../components/uploadFile'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch'
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const PIXEL = 600;
// const domain = process.env.NODE_ENV === 'development' ? 'http://www.smultiply.com/' : 'http://118.24.102.96:80/';
const domain = process.env.NODE_ENV === 'development' ? 'http://118.24.102.96:80/' : 'http://118.24.102.96:80/';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class ModelDetail extends Component {

  constructor(props) {
    super(props);
    // 可以使用 props了
    // this.state = props.info;
    this.state = Object.assign(props.info, {
      'beforeValue': null,
      'successOpen': false,
    });;
    this.updateChange = this.updateChange.bind(this);
  }

  componentDidMount() {
    //
  }
  
  handleClose = () => {
    this.setState({ successOpen: false });
  };

	handleChange = (name, value) => {
    this.setState({
      [name]: value,
    }, function() {
      this.refs.canvas.draw();
    });
  };

  // imgHtml = (name) => {

  //   return (
  //     <div>
  //       {
  //         this.state[name] ?
  //         <Grid item xs={3} sm={3}>
  //           <div className="paramTitle">原图</div>
  //           <LoadImage src={this.state[name]} landscape="/static/landscape.svg" />
  //         </Grid> :
  //         <Grid item xs={3} sm={3}>
  //           <div className="paramTitle">原图</div>
  //           <div　className="">
  //             <UploadFile
  //               url = "http://www.smultiply.com/api/v1/file/upload"
  //               uploadSuccess = { this.updateChange }
  //               uploadSuccessParam = { [ this.state.id ] }
  //               name = {name}
  //               >
  //               <Button variant="contained" color="default" className={classes.button}>
  //                 Upload
  //                 <CloudUploadIcon className={classes.rightIcon} />
  //               </Button>
  //             </UploadFile>
  //           </div>
  //         </Grid>
  //       }
  //     </div>
  //   );
  // }

  handleFocus = (name, _this) => {
    // console.log('1');
    // console.log(_this.state[name]);

    _this.setState({
      beforeValue: _this.state[name]
    });
    // console.log(_this.state.beforeValue);
  }

  handleBlur = (name, _this) => {
    if(_this.state[name] !== _this.state.beforeValue) {
      if(_this.state[name] === '') {
        _this.state[name] = 0;
        _this.setState({
          [name]: 0
        });
      }
      _this.updateChange(_this.state[name], name);
    }
  }

  // updateChange() {
    
  // }

  updateChange(value, name) {
    const _this = this;
    let post = {
      value: value,
      name: name
    };
    fetch(`${domain}api/v1/object/${this.state.id}`, {
			method: 'PUT',
			mode: "cors",
			body: JSON.stringify(post)
		}).then( r => {
			return r.json();
		}).then(function(json) {
      const data = json.data;
      _this.handleChange(data.name, data.value);
      _this.setState({ successOpen: true });
		}).catch(function(ex) {
			console.log('parsing failed', ex);
		})
  }

  render() {
    const { classes } = this.props;
    const PIXEL = 600;
    return (
      <Layout>
        <div className="container">
          <Grid container spacing={16}>
            <Grid item xs={5} sm={5}>
              <div className="canvasWrap">
                <h2>{this.state.name}</h2>
                <Paper>
                  <XmultiplyCanvas
                    ref="canvas"
                    pixel={PIXEL}
                    origin={this.state.origin}
                    frame={this.state.frame}
                    object={this.state.object}
                    texture={this.state.texture}
                    fov={this.state.fov}
                    objectPosX={this.state.objectPosX}
                    objectPosY={this.state.objectPosY}
                    objectPosZ={this.state.objectPosZ}
                    objectPosX={this.state.objectPosX}
                    objectRotX={this.state.objectRotX}
                    objectRotY={this.state.objectRotY}
                    objectRotZ={this.state.objectRotZ}
                    cameraPosX={this.state.cameraPosX}
                    cameraPosY={this.state.cameraPosY}
                    cameraPosZ={this.state.cameraPosZ}
                    cameraRotX={this.state.cameraRotX}
                    cameraRotY={this.state.cameraRotY}
                    cameraRotZ={this.state.cameraRotZ}
                  />
                </Paper>
              </div>
            </Grid>
            <Grid item xs={7} sm={7}>
              <h2>参数</h2>
              <TextField
                id="name"
                label="Name"
                value={this.state.name}
                onChange={event => this.handleChange('name', event.target.value)}
                margin="normal"
                onFocus={(name, _this) => this.handleFocus('name', this)}
                onBlur={(name, _this) => this.handleBlur('name', this)}
              />
              <Grid container spacing={8}>
                {
                  this.state.origin ?
                  <Grid item xs={3} sm={3}>
                    <div className="paramTitle">原图</div>
                    <LoadImage src={this.state.origin} landscape="/static/landscape.svg" />
                  </Grid> :
                  <Grid item xs={3} sm={3}>
                    <div className="paramTitle">原图</div>
                    <div　className="">
                      <UploadFile
                        url = {domain + "api/v1/file/upload"}
                        uploadSuccess = { this.updateChange }
                        uploadSuccessParam = { [ this.state.id ] }
                        name = "origin"
                        >
                        <Button variant="contained" color="default" className={classes.button}>
                          Upload
                          <CloudUploadIcon className={classes.rightIcon} />
                        </Button>
                      </UploadFile>
                    </div>
                  </Grid>
                }
                {
                  this.state.frame ?
                  <Grid item xs={3} sm={3}>
                    <div className="paramTitle">遮罩</div>
                    <LoadImage src={this.state.frame} landscape="/static/landscape.svg" />
                  </Grid> :
                  <Grid item xs={3} sm={3}>
                    <div className="paramTitle">遮罩</div>
                    <div　className="">
                      <UploadFile
                        url = {domain + "api/v1/file/upload"}
                        uploadSuccess = { this.updateChange }
                        uploadSuccessParam = { [ this.state.id ] }
                        name = "frame"
                        >
                        <Button variant="contained" color="default" className={classes.button}>
                          Upload
                          <CloudUploadIcon className={classes.rightIcon} />
                        </Button>
                      </UploadFile>
                    </div>
                  </Grid>
                }
              </Grid>
              <Grid container spacing={8}>
                {
                  this.state.texture ?
                  <Grid item xs={3} sm={3}>
                    <div className="paramTitle">贴图</div>
                  </Grid> :
                  <Grid item xs={3} sm={3}>
                    <div className="paramTitle">贴图</div>
                    <div　className="">
                      <UploadFile
                        url = {domain + "api/v1/file/upload"}
                        uploadSuccess = { this.updateChange }
                        uploadSuccessParam = { [ this.state.id ] }
                        name = "texture"
                        >
                        <Button variant="contained" color="default" className={classes.button}>
                          Upload
                          <CloudUploadIcon className={classes.rightIcon} />
                        </Button>
                      </UploadFile>
                    </div>
                  </Grid>
                }
                {
                  this.state.object ?
                  <Grid item xs={3} sm={3}>
                    <div className="paramTitle">模型</div>
                    <a href="">下载</a>
                  </Grid> :
                  <Grid item xs={3} sm={3}>
                    <div className="paramTitle">模型</div>
                    <div　className="">
                      <UploadFile
                        url = {domain + "api/v1/file/upload"}
                        uploadSuccess = { this.updateChange }
                        uploadSuccessParam = { [ this.state.id ] }
                        name = "object"
                        >
                        <Button variant="contained" color="default" className={classes.button}>
                          Upload
                          <CloudUploadIcon className={classes.rightIcon} />
                        </Button>
                      </UploadFile>
                    </div>
                  </Grid>
                }
              </Grid>
              <Grid container spacing={8}>
                <Grid item xs={12} sm={12}>
                  <h4 className="paramTitle" style={{
                    margin: '5px 0px'
                  }}>Camera Position</h4>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="fov"
                    label="Camera fov"
                    value={this.state.fov}
                    onChange={event => this.handleChange('fov', event.target.value)}
                    margin="normal"
                    onFocus={(name, _this) => this.handleFocus('fov', this)}
                    onBlur={(name, _this) => this.handleBlur('fov', this)}
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    id="cameraPosX"
                    label="Camera Posisiton X"
                    value={this.state.cameraPosX}
                    onChange={event => this.handleChange('cameraPosX', event.target.value)}
                    margin="normal"
                    onFocus={(name, _this) => this.handleFocus('cameraPosX', this)}
                    onBlur={(name, _this) => this.handleBlur('cameraPosX', this)}
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    id="cameraPosY"
                    label="Camera Posisiton Y"
                    value={this.state.cameraPosY}
                    onChange={event => this.handleChange('cameraPosY', event.target.value)}
                    margin="normal"
                    onFocus={(name, _this) => this.handleFocus('cameraPosY', this)}
                    onBlur={(name, _this) => this.handleBlur('cameraPosY', this)}
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    id="cameraPosZ"
                    label="Camera Posisiton Z"
                    value={this.state.cameraPosZ}
                    onChange={event => this.handleChange('cameraPosZ', event.target.value)}
                    margin="normal"
                    onFocus={(name, _this) => this.handleFocus('cameraPosZ', this)}
                    onBlur={(name, _this) => this.handleBlur('cameraPosZ', this)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item xs={12} sm={12}>
                  <h4 className="paramTitle" style={{
                    margin: '5px 0px'
                  }}>Camera Rorate</h4>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    id="cameraRotX"
                    label="Camera Rorate X"
                    value={this.state.cameraRotX}
                    onChange={event => this.handleChange('cameraRotX', event.target.value)}
                    margin="normal"
                    onFocus={(name, _this) => this.handleFocus('cameraRotX', this)}
                    onBlur={(name, _this) => this.handleBlur('cameraRotX', this)}
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    id="cameraRotY"
                    label="Camera Rorate Y"
                    value={this.state.cameraRotY}
                    onChange={event => this.handleChange('cameraRotY', event.target.value)}
                    margin="normal"
                    onFocus={(name, _this) => this.handleFocus('cameraRotY', this)}
                    onBlur={(name, _this) => this.handleBlur('cameraRotY', this)}
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    id="cameraRotZ"
                    label="Camera Rorate Z"
                    value={this.state.cameraRotZ}
                    onChange={event => this.handleChange('cameraRotZ', event.target.value)}
                    margin="normal"
                    onFocus={(name, _this) => this.handleFocus('cameraRotZ', this)}
                    onBlur={(name, _this) => this.handleBlur('cameraRotZ', this)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item xs={12} sm={12}>
                  <h4 className="paramTitle" style={{
                    margin: '5px 0px'
                  }}>Object position</h4>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    id="objectRotX"
                    label="Object Position X"
                    value={this.state.objectPosX}
                    onChange={event => this.handleChange('objectPosX', event.target.value)}
                    margin="normal"
                    onFocus={(name, _this) => this.handleFocus('objectPosX', this)}
                    onBlur={(name, _this) => this.handleBlur('objectPosX', this)}
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    id="objectPosY"
                    label="Object Position Y"
                    value={this.state.objectPosY}
                    onChange={event => this.handleChange('objectPosY', event.target.value)}
                    margin="normal"
                    onFocus={(name, _this) => this.handleFocus('objectPosY', this)}
                    onBlur={(name, _this) => this.handleBlur('objectPosY', this)}
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    id="objectPosZ"
                    label="Object Position Z"
                    value={this.state.objectPosZ}
                    onChange={event => this.handleChange('objectPosZ', event.target.value)}
                    margin="normal"
                    onFocus={(name, _this) => this.handleFocus('objectPosZ', this)}
                    onBlur={(name, _this) => this.handleBlur('objectPosZ', this)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={8}>
                <Grid item xs={12} sm={12}>
                  <h4 className="paramTitle" style={{
                    margin: '5px 0px'
                  }}>Object rorate</h4>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    id="objectPosX"
                    label="Object Position X"
                    value={this.state.objectPosX}
                    onChange={event => this.handleChange('objectPosX', event.target.value)}
                    margin="normal"
                    onFocus={(name, _this) => this.handleFocus('objectPosX', this)}
                    onBlur={(name, _this) => this.handleBlur('objectPosX', this)}
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    id="objectPosY"
                    label="Object Position Y"
                    value={this.state.objectPosY}
                    onChange={event => this.handleChange('objectPosY', event.target.value)}
                    margin="normal"
                    onFocus={(name, _this) => this.handleFocus('objectPosY', this)}
                    onBlur={(name, _this) => this.handleBlur('objectPosY', this)}
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    id="objectPosZ"
                    label="Object Position Z"
                    value={this.state.objectPosZ}
                    onChange={event => this.handleChange('objectPosZ', event.target.value)}
                    margin="normal"
                    onFocus={(name, _this) => this.handleFocus('objectPosZ', this)}
                    onBlur={(name, _this) => this.handleBlur('objectPosZ', this)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.successOpen}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            aria-describedby="client-snackbar"
            style={{
              backgroundColor: green[600],
            }}
            message={
              <span id="client-snackbar" style={{
                display: 'flex',
                alignItems: 'center',
              }}>
                <CheckCircleIcon style={{
                  fontSize: 20,
                  opacity: 0.9,
                  marginRight: '8px',
                }} />
                Update Success
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon style={{
                  fontSize: 20
                }} />
              </IconButton>,
            ]}
          />
        </Snackbar>
        <style jsx>{`
          .container {
            padding: 10px 30px;
          }
          .canvasWrap {
            width: ${PIXEL}px;
            height: ${PIXEL}px;
          }
          .paramTitle {
            color: rgba(0, 0, 0, 0.54);
            padding: 0;
            font-size: 1rem;
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
            line-height: 1;
          }
        `}</style>
      </Layout>
    );
  }
}

ModelDetail.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`${domain}api/v1/object/${id}`)
  const resData = await res.json()
  let info = [];
  if(!resData.errors) {
    info = resData.data;
  }
	// const info = {
	// 	'name': 'Left Shoes',
	// 	'frame': '/static/three/shoes.png',
	// 	'origin': '/static/three/shoes.jpg',
  //   'object': '/static/three/shoes.obj',
  //   'texture': '/static/three/texture.jpg',
  //   'objectPosX': 0,
  //   'objectPosY': 0,
  //   'objectPosZ': 0,
  //   'objectRotX': 0,
  //   'objectRotY': 0,
  //   'objectRotZ': 0,
  //   'fov': 100,
  //   'cameraPosX': 0,
  //   'cameraPosY': 0,
  //   'cameraPosZ': 0,
  //   'cameraRotX': 0,
  //   'cameraRotY': 0,
  //   'cameraRotZ': 0,
  // }

  return { info }
}

// export default ModelDetail;
export default withStyles(styles)(ModelDetail);
