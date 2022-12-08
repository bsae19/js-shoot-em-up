import * as THREE from 'three';

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

let camera, scene, renderer,cnv,ctx;
let start=false;
let obx=0;
let oby=-15;
let rot=0;
let pointLight;
let ob=[];
let size=0;
let life=100;
let life_bar;
let mort=[];
let mort_size=0;
let text=[];

let key=[];
let key_size=0;

let ob2=[];
let size2=0;
let projectile=[];
let projectile_size=0;
let projectile2=[];

let compt2=[];
let compt2_size=0;

let compt=0;
let etoile=[];
let etoile_size=0;

let reacteur=[];
let reacteur_size=0;
let fact_react=[];

let phase=[1,2,3,2,1];
let debut=0;
let de=true;
let score=0;
let chrono=0;

let fin=0;
let stop=false;

let temp=0;

let auto=false;
let wait=50;

let dep=["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"]

	cnv = document.querySelector('#myCanvas');
	camera = new THREE.PerspectiveCamera( 450, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 20;
	// scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x232632 );
	pointLight = new THREE.PointLight( 0xffffff, 9 );
	pointLight.position.y=15+(oby*2);
	pointLight.position.z=10;
	pointLight.position.x=obx;
	camera.add( pointLight );
	let point = new THREE.PointLight( 0xffffff, 9 );
	point.position.y=15;
	point.position.x=-21;
	point.position.x=10;
	camera.add( point );
	scene.add( camera );

for(let i=0;i<50;i++){
	const geometry = new THREE.BoxGeometry( 0.3, 4, 0.3);
const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const sphere = new THREE.Mesh( geometry, material );
sphere.position.z-=10;
sphere.position.y=-35+Math.floor(Math.random() * 71);
sphere.position.x=-35+Math.floor(Math.random() * 71);
etoile.push(sphere);
etoile_size+=1;
scene.add( sphere );
}

	renderer = new THREE.WebGLRenderer({canvas: cnv,antialiasing: true});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( 800, window.innerHeight-90 );
camera.aspect = 800/(window.innerHeight-90);
camera.updateProjectionMatrix();

animate();

let startButton = document.getElementById( 'play' );
startButton.addEventListener( 'click', in1);
let demoButton = document.getElementById( 'demo' );
demoButton.addEventListener( 'click', in2);
window.addEventListener('keydown', keydown_fun, false);
window.addEventListener('keyup', keyup_fun, false);
function in1(){
	start=true;
	init(0);
}
function in2(){
	start=true;
	init(1);
}

function keydown_fun(e) {
	if(!auto){
	let test=true;
	for(let i=0;i<key_size;i++){
		if(key[i].code==e.code){
			test=false;
		}
	}
	if(test){
	key.push(e);
	key_size+=1;}
}}
function keyup_fun(e) {
	if(!auto){
	for(let i=0;i<key_size;i++){
		if(key[i].code==e.code){
	key_size-=1;
	key.splice(i, 1);
	i--;
		}
	}
		}}

function tir(){
if(compt==30){
for(let i=0;i<2;i++){
	const geometry = new THREE.CylinderGeometry( 0.2, 0.2, 2, 64 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cylinder = new THREE.Mesh( geometry, material );
cylinder.position.y=oby+1.8;
if(rot<0){
cylinder.position.x=obx-2.55-(rot/1.5)+(i*(5.05+(rot*2)));}
else{
	cylinder.position.x=obx-2.55+rot*1.2+(i*(5.05-rot*1.9));
}
projectile.push(cylinder);
projectile_size+=1;
scene.add( cylinder );
}
compt=0}
else{
	compt+=1;
}


for(let i=0;i<compt2_size;i++){
	if(compt2[i][3]==0 && !de){
	if(compt2[i][0]==100){
		for(let y=0;y<2;y++){
			const geometry = new THREE.CylinderGeometry( 0.2, 0.2, 2, 64 );
		const material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
		const cylinder = new THREE.Mesh( geometry, material );
		cylinder.position.y=ob2[i].position.y-3.5;
		if(ob2[i].position.x<0){
		cylinder.position.x=ob2[i].position.x-6.4-((ob2[i].position.x/2)/0.87)+(y*(10+((ob2[i].position.x/3)*2.5)));}
		else{
		cylinder.position.x=ob2[i].position.x-4.4+((ob2[i].position.x/1.4)/1.7)-(y*(-8+((ob2[i].position.x/0.21))/6.8));
		}
		projectile2[i].push(cylinder);
		compt2[i][1]+=1;
		scene.add( cylinder );
		}
		compt2[i][0]=0}
		else{
			compt2[i][0]+=1;
		}
}}
for(let i=0;i<compt2_size;i++){
	for(let y=0;y<compt2[i][1];y++){
		if(rot<0){
			if(Math.round(projectile2[i][y].position.y)>=Math.round(ob[0].position.y-4.5) && Math.round(projectile2[i][y].position.y)<=Math.round(ob[0].position.y+3) && projectile2[i][y].position.x>obx-6.55-(rot/1.5) &&  projectile2[i][y].position.x<obx-2.55-(rot/1.5)+9.05+(rot*4)){
				scene.remove(projectile2[i][y]);
				projectile2[i].splice(y,1);
				y--;
				compt2[i][1]-=1;
				life-=15;
			}}
			else{
			if(Math.round(projectile2[i][y].position.y)>=Math.round(ob[0].position.y-4.5) && Math.round(projectile2[i][y].position.y)<=Math.round(ob[0].position.y+3) && projectile2[i][y].position.x>obx-6.55+rot*3 &&  projectile2[i][y].position.x<obx-6.55+rot*3+12.05-rot*4.9){
				scene.remove(projectile2[i][y]);
				projectile2[i].splice(y,1);
				y--;
				compt2[i][1]-=1;
				life-=15;
			}}
}}
if(!de){
let l=0;
for(let i=0;i<projectile_size;i++){
	for(let y=0;y<size2;y++){
	if(Math.round(projectile[i].position.y)>=Math.round(ob2[y].position.y-6) && Math.round(projectile[i].position.y)<=Math.round(ob2[y].position.y+1) && projectile[i].position.x>ob2[y].position.x-4 &&  projectile[i].position.x<ob2[y].position.x+4 ){
		scene.remove(projectile[i]);
		projectile.splice(i,1);
		i-=1;
		projectile_size-=1;;
		compt2[y][2]-=15;

		break;
	}
}}

for(let i=0;i<size2;i++){
	if(compt2[i][2]<=0){
		const geometry = new THREE.PlaneGeometry( 11, 11, 1);
		
const sphere = new THREE.Mesh( geometry, text[0] );
sphere.position.z=0;
sphere.position.y=ob2[i].position.y;
sphere.position.x=ob2[i].position.x;
scene.add( sphere );
		mort.push([sphere,0]);
		mort_size+=1;
		ob2[i].position.y=25;
		compt2[i][2]=100;
		compt2[i][3]=1;
		score+=10;
var sc = document.getElementById('score').textContent = score.toString();
	}
}

for(let i=0;i<size;i++){
	if(life<=0){
		const geometry = new THREE.PlaneGeometry( 11, 11, 1);
const sphere = new THREE.Mesh( geometry, text[0] );
sphere.position.z=0;
sphere.position.y=ob[i].position.y;
sphere.position.x=ob[i].position.x;
scene.add( sphere );
		mort.push([sphere,0]);
		mort_size+=1;
		scene.remove(life_bar);
		scene.remove(ob[0]);
		stop=true;
	}
}

}}

function move(){
	for(let i=0;i<key_size;i++){
		let t;
		let h;
		let h2;
		if(!auto){t=key[i].code;
			h=15;
			h2=-16;
			}
		else{t=key[i];
			h=0;
			h2=-16;}
	switch(t) {
		case dep[0]:
			if(obx+0.3<18){
		obx += 0.3;
		rot+=0.06;}
		break;
		case dep[1]:
			if(obx-0.3>-18){
		obx -= 0.3;
		rot-=0.06;}
		break;
		case dep[2]:
			if(oby+0.3<h){
		oby += 0.3;}
		break;
		case dep[3]:
			if(oby-0.3>h2){
		oby -= 0.3;}
		break;
	}
}}


function init(e) {
	if(e==1){
		auto=true;
	}
	startButton.remove();
		demoButton.remove();
		let ti=document.getElementById( 'titre' );
		ti.remove();
	
let res=0;
for(let i=1;i<13;i++){
	let texture = new THREE.TextureLoader().load("./vaisseaux/exp"+i+".png");
let material = new THREE.MeshBasicMaterial({ map: texture,opacity: 0.8, transparent: true});
text.push(material);
}
for(let i=0;i<3;i++){
	var tex = new THREE.TextureLoader();
	let loader = new OBJLoader();
	loader.load( './vaisseaux/vaisseau.obj', function ( obj ) {
		obj.traverse(function (node) {
		if (node.isMesh)
		    for (let i = 1; i < 7; i++) {
	        node.material = new THREE.MeshPhongMaterial ({ map: tex.load('./vaisseaux/tex' + i + '.jpg') })
	    	}});
		obj.scale.set(0.005,0.005,0.005);
		obj.rotation.x=-Math.PI/2;
		obj.rotation.y=Math.PI;
		if(res<phase[debut]){
		compt2.push([0,0,100,0,0.3]);}
		else{
			compt2.push([0,0,100,1,0.3]);}
			obj.position.x=0;
			obj.position.y=25;
		res+=1;
		obj.rotation.z=0;
		ob2.push(obj);
		size2+=1;
		compt2_size+=1;
		projectile2.push([]);
		scene.add(obj);
	});}

	var mtlLoader = new MTLLoader();
	mtlLoader.setPath( './vaisseaux/' );
	var url = "./ship.mtl";
	mtlLoader.load( url, function( materials ) {
	
		materials.preload();
	
		var objLoader = new OBJLoader();
		objLoader.setMaterials( materials );
		objLoader.setPath( './vaisseaux/' );
		objLoader.load( 'ship.obj', function ( object ) {
			object.scale.set(0.4,0.4,0.4);
		object.rotation.x=Math.PI/2;
		object.rotation.y=Math.PI/2;
		object.position.x=obx;
		object.position.y=oby;
		ob.push(object);
		size+=1;
			scene.add( object );
	
		});
	
	});




	document.getElementById('score').textContent = score.toString();
	let geometry = new THREE.PlaneGeometry( 10, 1.5 );
let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
let plane = new THREE.Mesh( geometry, material );
plane.position.x=-19;
plane.position.y=18;
plane.position.z=0;
scene.add( plane );
let geometry1 = new THREE.PlaneGeometry( life/10, 1.5 );
let material1 = new THREE.MeshBasicMaterial( {color: 0xff0000} );
life_bar = new THREE.Mesh( geometry1, material1 );
life_bar.position.x=-19-((10-(life/10))/2);
life_bar.position.y=18;
life_bar.position.z=0;
scene.add( life_bar );



for(let i=0;i<10;i++){
	let v=1+Math.random() * 2;
	const geometry = new THREE.BoxGeometry( 0.05, v, 0.05 );
const material = new THREE.MeshBasicMaterial( {color: 0x00b2ff} );
const cube = new THREE.Mesh( geometry, material );
cube.position.y=oby-3+((2-v)/2);
cube.position.x=-0.3+Math.random() * 0.7;
fact_react.push([cube.position.x,v]);
cube.position.z=1.5;
reacteur.push(cube);
reacteur_size+=1;
scene.add( cube );
}

//musique url "https://www.youtube.com/watch?v=cJ-UWUfWeJk"

const listener = new THREE.AudioListener();
camera.add( listener );
const sound = new THREE.Audio( listener );
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'son/ambient.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});

	renderer = new THREE.WebGLRenderer({canvas: cnv,antialiasing: true});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( 800, window.innerHeight-90 );
camera.aspect = 800/(window.innerHeight-90);
camera.updateProjectionMatrix();

}

function onWindowResize() {
camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
}

function etl(){
	for(let i=0;i<etoile_size;i++){
		etoile[i].position.y-=0.5;
	}
	for(let i=0;i<etoile_size;i++){
		if(etoile[i].position.y==-30){
			etoile[i].position.y=30;
			etoile[i].position.x=-35+Math.floor(Math.random() * 71);
	}}
}
function move2(){
	for(let i=0;i<compt2_size;i++){
		if(compt2[i][3]==0){
			ob2[i].position.x+=compt2[i][4];
			if(ob2[i].position.x>=((36/phase[debut])*(i+1)-18)){
				compt2[i][4]*=-1;
			}
			if(ob2[i].position.x<=((36/phase[debut])*i-18)){
				compt2[i][4]*=-1;
			}
		}
	}
}

function calcul(){
	switch(key_size) {
		case 0:
			key.push(dep[Math.floor(Math.random() * 4)]);
		key_size+=1;
		break;
		case 1:
			let p=Math.random()*3;
			if(p!=2){
			switch(key[0]) {
				case dep[0]:
					key.push(dep[2+Math.floor(Math.random() * 2)]);
				break;
				case dep[1]:
					key.push(dep[2+Math.floor(Math.random() * 2)]);
				break;
				case dep[2]:
					key.push(dep[Math.floor(Math.random() * 2)]);
				break;
				case dep[3]:
					key.push(dep[Math.floor(Math.random() * 2)]);
				break;
			}key_size+=1;}
			break;
}
if(temp==20){
	for(let i=0;i<key_size;i++){
		key_size-=1;
		key.splice(i, 1);
		i--;
	}
	temp=0;
}
else{
temp+=1;}

}
function apare(){
	if(wait==0){
	for(let i=0;i<compt2_size;i++){
		if(compt2[i][3]==0){
			ob2[i].position.y-=0.25;
			if(ob2[i].position.y==10){
				de=false;
			}
		}
	}}
	else{
		wait-=1;
	}

}
function mo(){
	for(let i=0;i<mort_size;i++){
		if(mort[i][1]%10==0){
			mort[i][0].material=text[mort[i][1]/10];
			mort[i][0].material.needsUpdate = true;
		}
		if(mort[i][1]==119){
			scene.remove(mort[i][0]);
			mort.splice(i,1);
			mort_size-=1;
			i--
	
		}
		else{
			mort[i][1]+=1;
		}
	}
}

function proj(){
	
	for(let i=0;i<compt2_size;i++){
		for(let y=0;y<compt2[i][1];y++){
		if(projectile2[i][y].position.y<=-18){
			scene.remove(projectile2[i][y]);
			projectile2[i].splice(y,1);
			y--;
			compt2[i][1]-=1;
		}
	}}
	for(let i=0;i<compt2_size;i++){
		for(let y=0;y<compt2[i][1];y++){
			projectile2[i][y].position.y-=1;
		}
	}

	for(let i=0;i<projectile_size;i++){
		if(projectile[i].position.y>=22){
			scene.remove(projectile[i]);
			projectile.splice(i,1);
			i--;
			projectile_size-=1;
		}
	}
	for(let i=0;i<projectile_size;i++){
		projectile[i].position.y+=1;
	}
}

function verif(){
	let v=true;
	for(let i=0;i<compt2_size;i++){
		if(compt2[i][3]==0){
			v=false;
			}
		}
		if(v){
			chrono+=1;
		}
		if(chrono==80){
			de=true;
			debut+=1
			chrono=0;
			for(let i=0;i<compt2_size;i++){
			if(i<phase[debut]){
				ob2[i].position.x=((36/phase[debut])*i)+((36/phase[debut])/2)-18;
				compt2[i][3]=0;}}
		}
		if(debut==5){
			fin=1;
		}
}

function animate() {
	if(start){
	renderer.render( scene, camera );
	if(fin==0 && !stop){
	if(!de){move2();}
	else{apare()}
	if(debut==0 && !de ||debut!=0){tir();
		if(auto){
			calcul();
		}
		move();}
	proj();
	verif();
	etl();
	life_bar.scale.set( life/100, 1, 1 );
	life_bar.position.x=-19-((10-(life/10))/2);
	pointLight.position.y=15+(2*oby);
	pointLight.position.x=obx;
	for(let i=0;i<size;i++){
	ob[i].position.x=obx;
	ob[i].position.y=oby;
	ob[i].rotation.z=Math.PI/2;
	ob[i].rotation.y=Math.PI/2+rot/3;
	ob[i].rotation.x=0;}

	for(let i=0;i<reacteur_size;i++){
	let v=1+Math.random() * 2;
	reacteur[i].geometry=new THREE.BoxGeometry( 0.05, v, 0.05 );
	reacteur[i].position.x=obx+fact_react[i][0];
	reacteur[i].position.y=oby-3+((2-v)/2);
	}
	for(let i=0;i<size2;i++){
		if(i<phase[debut]){
		ob2[i].rotation.z=Math.PI-((ob2[i].position.x/18));
	}}}
	else if(stop){
		var newDiv = document.createElement("div");
		newDiv.setAttribute('id', 'perdu');
		newDiv.setAttribute('style','position: absolute; top: 140px; left: 140px; border-radius: 10px; font-size: 150px; font-weight: 900; color: yellow;');
		var currentDiv = document.getElementById('myCanvas');
		document.body.insertBefore(newDiv, currentDiv);
		document.getElementById('perdu').textContent = "PERDU";
	}
	else{
		var newDiv = document.createElement("div");
		newDiv.setAttribute('id', 'victoire');
		newDiv.setAttribute('style','position: absolute; top: 140px; left: 40px; border-radius: 10px; font-size: 150px; font-weight: 900; color: yellow;');
		var currentDiv = document.getElementById('myCanvas');
		document.body.insertBefore(newDiv, currentDiv);
		document.getElementById('victoire').textContent = "VICTOIRE";
	}

	mo();
	requestAnimationFrame( animate );}
	else{
		renderer.render( scene, camera );
		etl();
		requestAnimationFrame( animate );
	}
}