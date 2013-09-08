
function ThreeDTexter(){

	var opts = this.opts = {
		container: document.getElementById('text_container'),
		camera: null,
		group: null,
		scene:  null,
		renderer: null,
		text: {
			canvas: null,
			options: {
				size: 90,
				height: 60,
				hover: 40,
				curveSegments: 5,
				bevelThickness: 4,
				belvelSize: 1,
				bevelEnabled: true,
				font: "digital-7",
				weight: 'normal'
			}
		},
		targetRotation: 0
	};

	var exports = {};

	this.setup = function(){
		opts.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
		opts.camera.position.set( 0, 150, 500 );
		opts.scene = new THREE.Scene();

	}

	this.drawTextInternal = function(text, text_options){

		for (var opt in text_options){
			opts.text.options[opt] = text_options[opt];
		}

		var textShapes = new THREE.FontUtils.generateShapes( text, opts.text.options );

		var text3d = new THREE.ExtrudeGeometry( textShapes, opts.text.options );

		text3d.computeBoundingBox();

		var centerOffset = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );

		text = new THREE.Mesh( text3d, this.getMaterial() );
		opts.text.canvas = text;

		text.position.x = centerOffset;
		text.position.y = 40;
		text.position.z = 0;

		text.rotation.x = 0;
		text.rotation.y = Math.PI * 2;
		return text;
	}


	this.getMaterial = function(){
		if (!opts.text.options.material){
			opts.text.options.material = new THREE.MeshNormalMaterial( { color: Math.random()*0xffffff } );
		}		
		return opts.text.options.material;
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

   	this.api = {version: 0.1};

   	var self = this;

   	this.api.setText = function(text, options){
   		opts.group.remove(opts.text.canvas);

   		if (text != null && text.length > 0) {
   			self.drawTextInternal(text, options);
   			opts.group.add(opts.text.canvas);
   		}
   		self.render();
   	}
   	this.api.setTextOption = function(option, value){
   		self.opts.text.options[option] = value;
   	}
   	this.api.getTextOption = function(option){
   		return self.opts.text.options[option];
   	}
   	this.api.getTextOptions = function(){
   		return self.opts.text.options;
   	}

   	return self;
}
