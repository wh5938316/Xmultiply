import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {ThreeShot, LayerMerge} from './xmultiply';
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
    // // 设置透明背景
    // let threeRenderer = new THREE.WebGLRenderer( { alpha: true } );
    // threeRenderer.setPixelRatio( window.devicePixelRatio );
    // threeRenderer.setSize( PIXEL, PIXEL );

    // // 创建场景
    // let scene = new THREE.Scene();

    // // 环境光
    // let ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
    // scene.add( ambientLight );
    // // 点源光 暂时弃用
    // // let pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    // // camera.add( pointLight );

    // // 创建相机
    // let camera = new THREE.PerspectiveCamera( 50, 1, 0.1, 3000 );
    // camera.position.x = 0;
    // camera.position.y = 0;
    // camera.position.z = 100;
    // scene.add( camera );
    
    // camera.lookAt( scene.position );

    // var object = false;
    // var loader = new THREE.OBJLoader();
    // var _this = this;
    // loader.load('/three/shoes.obj', function(obj) {
    //   object = obj;

    //   _this.setState({
    //     'threeRenderer': threeRenderer,
    //     'scene': scene,
    //     'camera': camera,
    //     'object': object
    //   });
    // });
  }

  // changeTexture(ev, design, _this) {
  //     var cvs = document.createElement('canvas');
  //     cvs.width = PIXEL * 2;
  //     cvs.height = PIXEL * 2;
  //     var ctx = cvs.getContext("2d");
  //     var img = _this.refs.img1;

  //     ctx.drawImage(img, 0, 0, PIXEL * 2, PIXEL * 2);
  //     var object = _this.state.object;
  //     var scene = _this.state.scene;
  //     var threeRenderer = _this.state.threeRenderer;
  //     object.traverse( function ( child ) {

  //       if ( child instanceof THREE.Mesh ) {

  //           var texture = new THREE.CanvasTexture( cvs );
  //           child.material.map = texture;

  //       }

  //     } );
  //     object.position.x = 0;
  //     object.position.y = 0;
  //     object.position.z = 0;
  //     scene.add( object );
  //     threeRenderer.render( scene, _this.state.camera );
  //     var three = threeRenderer.domElement;
      
  //     var result = document.createElement('canvas');
  //     result.width = PIXEL;
  //     result.height = PIXEL;
  //     var resultx = result.getContext("2d");
  //     resultx.drawImage(three, 0, 0, PIXEL, PIXEL);
  //     resultx.drawImage(_this.refs.frame, 0, 0, PIXEL, PIXEL);

  //     var target = _this.refs.show;
  //     target.src = result.toDataURL("image/png");
  // }

  render() {

    var instance = new ThreeShot({
      pixel: 750
    });
    var _this = this;
    var img = new Image();
    img.src = "/three/texture.jpg";
    img.onload = function() {
      var cvs = document.createElement('canvas');
      cvs.width = PIXEL * 2;
      cvs.height = PIXEL * 2;
      var ctx = cvs.getContext("2d");
      ctx.drawImage(img, 0, 0, PIXEL * 2, PIXEL * 2);
      instance.addObject({
        'id': 2,
        'url': '/three/shoes.obj',
        'imgs': [cvs],
        'finish': function() {
          instance.setMaterial(2, [cvs]);
          var result = instance.shot(750);
          var target = _this.refs.show;
          var img2 = new Image();
          img2.src = "/three/shoes.jpg";
          img2.onload = function() {
            var result2 = LayerMerge({
              'design': result,
              'origin': img2,
              'pixel': 1000
            }, 'SOM');
            target.src = result2.toDataURL("image/png");
            // var img3 = new Image();
            // img3.src = "/three/shoes.png";
            // img3.onload = function() {

            // }
          }
        }, 'error': function(xhr) {
          console.log('loading error');
        }
      });
    }
    console.log(instance.getCamera());

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <div style={{
                width: '750px'}}>
            <img ref="frame" width="750" height="750" src="/three/shoes.png" alt="frame"
              style={{
                "zIndex": '1',
                position: 'absolute'}} />
            
            <img id="show" ref="show" width="750" height="750" src=""  alt="result"
              style={{
                position: 'absolute'}}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
