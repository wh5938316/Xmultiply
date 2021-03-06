import { isNum, radianFromAngle, angleFromRadian } from './func.js';
let THREE = require('three');
let OBJLoader = require('three-obj-loader');
// 绑定loader
OBJLoader(THREE);

const ThreeShot = function(props) {

    const {pixel} = props;
    let loadingModels = 0;
    let isReady = false;
    let objects = [];
    
    // 设置透明背景
    const threeRenderer = new THREE.WebGLRenderer( { alpha: true } );
    threeRenderer.setPixelRatio( window.devicePixelRatio );
    threeRenderer.setSize( pixel, pixel );

    // 创建场景
    const scene = new THREE.Scene();
    
    // 环境光
    const ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
    scene.add( ambientLight );
    // 点源光 暂时弃用
    // const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    // scene.add( pointLight );
    
    // 创建相机
    let camera = new THREE.PerspectiveCamera( 50, 1, 0.1, 3000 );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 100;
    scene.add( camera );

    // 准备完毕
    isReady = true;

    ThreeShot.prototype.isReady = function() {
        return isReady;
    }

    ThreeShot.prototype.getPixel = function() {
        return this.pixel;
    }
    
    ThreeShot.prototype.setPixel = function(newPixel) {
        newPixel = parseInt(newPixel);
        if(newPixel && newPixel > 0) this.pixel = newPixel;
    }
    
    ThreeShot.prototype.getCamera = function() {
        return {
            '_camera': camera,
            'fov': camera.fov,
            'pos_x': camera.position.x,
            'pos_y': camera.position.y,
            'pos_z': camera.position.z,
            'rot_x': angleFromRadian(camera.rotation.x),
            'rot_y': angleFromRadian(camera.rotation.y),
            'rot_z': angleFromRadian(camera.rotation.y),
        }
    }
    
    ThreeShot.prototype.setCamera = function(props) {
        const {fov, pos_x, pos_y, pos_z, rot_x, rot_y, rot_z} = props;
        camera.fov = isNum(fov) ? fov : camera.position.x;
        camera.position.x = isNum(pos_x) ?  pos_x : camera.position.x;
        camera.position.y = isNum(pos_y) ?  pos_y : camera.position.y;
        camera.position.z = isNum(pos_z) ?  pos_z : camera.position.z;
        camera.rotation.x = isNum(rot_x) ?  radianFromAngle(rot_x) : camera.rotation.x;
        camera.rotation.y = isNum(rot_y) ?  radianFromAngle(rot_y) : camera.rotation.y;
        camera.rotation.z = isNum(rot_z) ?  radianFromAngle(rot_z) : camera.rotation.y;
    }

    ThreeShot.prototype.findObject = function(id) {
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            if(object.id === id) {
                return object;
            }
        }
        return false;
    }

    ThreeShot.prototype.addObject = function(props) {
        const {id, url, pos_x, pos_y, pos_z, rot_x, rot_y, rot_z, loaded, error, finish} = props;

        if(this.findObject(id)) return false;
        
        let loader = new THREE.OBJLoader();
        
        loadingModels++;
        isReady = false;

        let defaultLoaded = function() {
            console.log('default loaded');
        }

        let defaultError = function() {
            console.log('default error');
        }

        let defaultFinish = function() {
            console.log('default finish');
        }

        var onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete, 2) + '% downloaded' );
            }
        };

        var onError = function ( xhr ) {
            error ? error(xhr) : defaultError(xhr);
            loadingModels--;
            if(loadingModels === 0) {
                isReady = true;
                finish ? finish() : defaultFinish();
            }
        };
        
        loader.load(url, function(obj) {
            loadingModels--;
            obj.position.x = pos_x ? pos_x : 0;
            obj.position.y = pos_y ? pos_y: 0;
            obj.position.z = pos_z ? pos_z : 0;
            obj.rotation.x = rot_x ? radianFromAngle(rot_x) : 0;
            obj.rotation.y = rot_y ? radianFromAngle(rot_y): 0;
            obj.rotation.z = rot_z ? radianFromAngle(rot_z) : 0;
            objects.push({
                'id': id,
                'object': obj
            });
            loaded ? loaded('loadModel: ' + id) : defaultLoaded();
            if(loadingModels === 0) {
                isReady = true;
                finish ? finish() : defaultFinish();
            }
        }, onProgress, onError);
    }

    ThreeShot.prototype.setMaterial = function(id, imgs) {

        var object = this.findObject(id);
        if(!object) return false;

        object.object.traverse(function(child) {
            if(child instanceof THREE.Mesh) {
                var texture = new THREE.CanvasTexture(imgs[0]);
                child.material.map = texture;
            }
        });
    }

    ThreeShot.prototype.shot = function(resultPixel) {
        var cvs = document.createElement('canvas');
        cvs.width = resultPixel ? resultPixel : pixel;
        cvs.height = resultPixel ? resultPixel : pixel;
        var ctx = cvs.getContext("2d");
        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];
            scene.add( object.object );
        }
        threeRenderer.render( scene, camera );
        let dom = threeRenderer.domElement;
        ctx.drawImage(dom, 0, 0, pixel, pixel);

        return cvs;
    }
}

export default ThreeShot
// export {ThreeShot}