window.exports = {};

window.exports.load = function(){
	var opts = this.opts = {
		container: document.getElementById('text_container'),
		camera: null,
		group: null,
		scene:  null,
		renderer: null,
		text: {
			canvas: null
		},
		targetRotation: 0
	};

	this.setup = function(){
		opts.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
		opts.camera.position.set( 0, 150, 500 );
		opts.scene = new THREE.Scene();

	}

	this.drawTextInternal = function(text){
		var options = {
			size: 100,
			height: 60,
			hover: 40,
			curveSegments: 5,
			bevelThickness: 0.02,
			belvelSize: 0.02,
			bevelSegments: 8,
			bevelEnabled: false,
			font: "digital-7",
			weight: 'normal'
		};

		var textShapes = new THREE.FontUtils.generateShapes( text, options );

		var text3d = new THREE.ExtrudeGeometry( textShapes, options );

		text3d.computeBoundingBox();

		var centerOffset = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );

		var textMaterial =  new THREE.MeshNormalMaterial( { color: Math.random()*0xffffff } );

		text = new THREE.Mesh( text3d, textMaterial );
		opts.text.canvas = text;

		text.position.x = centerOffset;
		text.position.y = 40;
		text.position.z = 0;

		text.rotation.x = 0;
		text.rotation.y = Math.PI * 2;
		return text;
	}

	this.setupCanvas = function(){

		opts.group = new THREE.Object3D();
		opts.group.add( opts.text.canvas );

		opts.scene.add( opts.group );

		opts.renderer = new THREE.CanvasRenderer();
		opts.renderer.setSize( 800, 300 );

		opts.container.appendChild( opts.renderer.domElement );

	}


	this.bindEvents = function(){

		document.addEventListener( 'mousedown', onDocumentMouseDown, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		window.addEventListener( 'resize', onWindowResize, false );

	}
	
	this.render = function(){
		opts.group.rotation.y += ( opts.targetRotation - opts.group.rotation.y ) * 0.05;
		opts.renderer.render( opts.scene, opts.camera );
	}

	this.animate = function(){
		requestAnimationFrame( animate );
		render();
	}
   
    // actually init
   	this.setup();
   	this.drawTextInternal('hello world');
   	this.setupCanvas();
   	this.render(); 

   	window.internals = this;
}


