const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);

document.querySelector('.webGLContainer').appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,
        window.innerWidth/window.innerHeight,0.1,1000);

camera.position.set(0,0,50);
camera.lookAt(0,0,0);

let ringMesh;
const groupRings = new THREE.Group();
const modelLoader = new THREE.GLTFLoader();
modelLoader.load('asset/ring.glb',(glb)=>{
        
        glb.scene.traverse(child=>{
                if(child instanceof THREE.Mesh){
                        ringMesh = child;
                        ringMesh.material = new THREE.MeshNormalMaterial();
                }
        })
        for(let i=0;i<20;i++){
                const c = ringMesh.clone();
                c.rotation.x = Math.PI;
                c.scale.set(i,i,i/5);
                groupRings.add(c);
        }
        scene.add(groupRings);
});

function update(){

        let i = 0;
        while(i < groupRings.children.length){
                groupRings.children[i].rotation.x += 0.01 + i*0.0001;
                groupRings.children[i].rotation.y += 0.01 + i*0.00001;
                i++;
        }
         
        renderer.render(scene,camera);
        requestAnimationFrame(update);
}

update();

