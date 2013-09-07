window.exports = {};
window.exports.load = function(){};

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

	function setup(){
		opts.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
		opts.camera.position.set( 0, 150, 500 );
		opts.scene = new THREE.Scene();

	}

	function drawTextInternal(text){
		var text3d = new THREE.TextGeometry( text, {
			size: 80,
			height: 20,
			curveSegments: 2,
			font: "blackout",
			weight: 'bold'
		});

		text3d.computeBoundingBox();
		var centerOffset = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );

		var textMaterial = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: true } );

		text = new THREE.Mesh( text3d, textMaterial );
		opts.text.canvas = text;

		text.position.x = centerOffset;
		text.position.y = 100;
		text.position.z = 0;

		text.rotation.x = 0;
		text.rotation.y = Math.PI * 2;
		return text;
	}

	function setupCanvas(){

		opts.group = new THREE.Object3D();
		opts.group.add( opts.text.canvas );

		opts.scene.add( opts.group );

		opts.renderer = new THREE.CanvasRenderer();
		opts.renderer.setSize( 500, 300 );

		opts.container.appendChild( opts.renderer.domElement );

	}


	function bindEvents(){

		document.addEventListener( 'mousedown', onDocumentMouseDown, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		window.addEventListener( 'resize', onWindowResize, false );

	}

	function render(){
		
		opts.group.rotation.y += ( opts.targetRotation - opts.group.rotation.y ) * 0.05;
		opts.renderer.render( opts.scene, opts.camera );
	}

	function animate(){
		requestAnimationFrame( animate );
		render();
	}
   
    // actually init
   	setup();
   	drawTextInternal('hello world');
   	setupCanvas();
   	render(); 


