window.exports = {};

window.exports.load = function(){
	var opts = {
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
		var text3d = new THREE.TextGeometry( text, {
			size: 120,
			height: 60,
			hover: 20,
			curveSegments: 4,
			bevelThickness: 0.02,
			belvelSize: 0.02,
			bevelSegments: 8,
			bevelEnabled: false,
			font: "blackout",
			weight: 'bold'
		});

		text3d.computeBoundingBox();
		var centerOffset = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );

		var textMaterial =  new THREE.MeshPhongMaterial( { color: Math.random()*0xffffff, shading: THREE.SmoothShading } );


		text = new THREE.Mesh( text3d, textMaterial );
		opts.text.canvas = text;

		text.position.x = centerOffset;
		text.position.y = 100;
		text.position.z = -40;

		text.rotation.x = -0.23;
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

}


