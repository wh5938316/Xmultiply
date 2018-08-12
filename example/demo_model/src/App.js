import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
let THREE = require('three');
let OBJLoader = require('three-obj-loader');
// 绑定loader
OBJLoader(THREE);
const PIXEL = 750;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'threeRenderer': false,
      'scene': false,
      'camera': false,
      'object': false,
      'texture': false
    };
  }

  componentWillMount() {
    // 设置透明背景
    let threeRenderer = new THREE.WebGLRenderer( { alpha: true } );
    threeRenderer.setPixelRatio( window.devicePixelRatio );
    threeRenderer.setSize( PIXEL, PIXEL );

    // 创建场景
    let scene = new THREE.Scene();
    // 创建相机
    let camera = new THREE.PerspectiveCamera( 50, 1, 0.1, 3000 );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 100;
    // 环境光
    let ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
    scene.add( ambientLight );
    // 点源光 暂时弃用
    // let pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    // camera.add( pointLight );
    scene.add( camera );
    
    camera.lookAt( scene.position );

    var object = false;
    var loader = new THREE.OBJLoader();
    var _this = this;
    loader.load('/three/shoes.obj', function(obj) {
      object = obj;

      _this.setState({
        'threeRenderer': threeRenderer,
        'scene': scene,
        'camera': camera,
        'object': object
      });
    });

  }

  changeTexture(ev, design, _this) {
      var cvs = document.createElement('canvas');
      cvs.width = PIXEL * 2;
      cvs.height = PIXEL * 2;
      var ctx = cvs.getContext("2d");
      var img = _this.refs.img1;

      ctx.drawImage(img, 0, 0, PIXEL * 2, PIXEL * 2);
      var object = _this.state.object;
      var scene = _this.state.scene;
      var threeRenderer = _this.state.threeRenderer;
      object.traverse( function ( child ) {

        if ( child instanceof THREE.Mesh ) {

            var texture = new THREE.CanvasTexture( cvs );
            child.material.map = texture;

        }

      } );
      object.position.x = 0;
      object.position.y = 0;
      object.position.z = 0;
      scene.add( object );
      threeRenderer.render( scene, _this.state.camera );
      var three = threeRenderer.domElement;
      
      var result = document.createElement('canvas');
      result.width = PIXEL;
      result.height = PIXEL;
      var resultx = result.getContext("2d");
      resultx.drawImage(three, 0, 0, PIXEL, PIXEL);
      resultx.drawImage(_this.refs.frame, 0, 0, PIXEL, PIXEL);

      var target = _this.refs.show;
      target.src = result.toDataURL("image/png");
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <img src="/three/texture.jpg" width="200" height="200" ref="img1"
            onClick={(ev, design, _this) => {this.changeTexture(ev, 'img1', this)}}
          />
          <img ref="frame" width="750" height="750" src="/three/shoes.png" style={{display:'none'}} />
          <img ref="origin" width="750" height="750" src="/three/shoes.jpg" style={{display:'none'}} />
          
          <img id="show" ref="show" width="750" height="750" src="" />
        </p>
      </div>
    );
  }
}

export default App;
