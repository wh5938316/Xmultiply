import React, {Component} from 'react'
import {ThreeShot, LayerMerge} from 'xmultiply'

class XmultiplyCanvas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      texture: null
    }
  }

  componentDidMount() {
    this.draw();
  }
  
  componentWillReceiveProps () {
    // this.draw();
  }
  
  draw() {
		const { object, origin, frame, texture } = this.props;
		if(!object || !origin || !frame || !texture) {
			this.drawError();
		} else {
      this.drawResult();
    }
  }

	drawError() {
		var target = this.refs.canvas;
		var targetx = target.getContext('2d');

		targetx.font="30px Georgia";
		// 创建渐变
		var gradient = targetx.createLinearGradient(0,0,target.width,0);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");
		// 用渐变填色
		targetx.fillStyle = gradient;
		targetx.textAlign = 'center';
		targetx.fillText("参数不完整", this.props.pixel / 2, 190);
		targetx.fillText("上传全部文件及参数，生成最终效果图", this.props.pixel / 2, 290);
	}

	drawResult() {
		const { pixel, object, origin, frame, texture } = this.props;
		var instance = new ThreeShot({
      pixel: pixel
    });
    instance.setCamera({
      'fov': this.props.fov,
      'pos_x': this.props.cameraPosX,
      'pos_y': this.props.cameraPosY,
      'pos_z': this.props.cameraPosZ,
      'rot_x': this.props.cameraRotX,
      'rot_y': this.props.cameraRotY,
      'rot_z': this.props.cameraRotZ,
    });
    var _this = this;
    var textureLoad = function(cvs) {
      instance.addObject({
        'id': 2,
        'url': object,
        'imgs': [cvs ? cvs : _this.state.texture],
        'pos_x': _this.props.objectPosX,
        'pos_y': _this.props.objectPosY,
        'pos_z': _this.props.objectPosZ,
        'rot_x': _this.props.objectRotX,
        'rot_y': _this.props.objectRotY,
        'rot_z': _this.props.objectRotZ,
        'finish': function() {
          instance.setMaterial(2, [cvs ? cvs : _this.state.texture]);
          var result = instance.shot(pixel);
          // var target = _this.refs.show;
          var img2 = new Image();
          img2.src = origin;
          img2.onload = function() {
            var result2 = LayerMerge({
              'design': result,
              'origin': img2,
              'pixel': 1000
						}, 'SOM');
						var target = _this.refs.canvas;
						var targetx = target.getContext('2d');
						targetx.drawImage(result2, 0, 0, pixel, pixel);
            // target.src = result2.toDataURL("image/png");
            var img3 = new Image();
            img3.src = frame;
            img3.onload = function() {
							targetx.drawImage(img3, 0, 0, pixel, pixel);
            }
          }
        }, 'error': function(xhr) {
          console.log('loading error');
        }
      });
    }
    if(!_this.state.texture) {
      var img = new Image();
      img.src = texture;
      img.crossOrigin = "Anonymous";
      img.onload = function() {
        if(!_this.state.texture) {
          var cvs = document.createElement('canvas');
          cvs.width = pixel * 2;
          cvs.height = pixel * 2;
          var ctx = cvs.getContext("2d");
          ctx.drawImage(img, 0, 0, pixel * 2, pixel * 2);
          _this.setState({
            texture: cvs
          });
        }
        textureLoad(cvs);
      }
    } else {
      textureLoad();
    }
	}

  render() {
    return (
			<canvas ref="canvas" width={this.props.pixel} height={this.props.pixel} />
    );
  }
}

export default XmultiplyCanvas;