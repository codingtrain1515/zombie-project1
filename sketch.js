const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var base1;
var base2;

var bridge
var bridge_con;
var stones =[];
var zombie1;
var zombie2;

var zombie;
var zombieImg;
var btn;
var turner;

function preload(){

  zombieImg = loadImage("zombie.png");
  
  bkImg = loadImage("background.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;

  base1  = new Base(width -1890 ,height/3,300,30);
  base2  = new Base(width - 100,height/3,500,30);

  stone = new Stone(width/2 , height/9,20);      

  bridge = new Bridge(15,{x: base1 .x,y: base1.y}); 

  Matter.Composite.add(bridge.body,base2.body);

  bridge_con = new Link(bridge,base2);

  

  btn= createImg("axe.png");
  btn.position(width-80,height/2.5 -30);
  btn.size(70,70);
  btn.mouseClicked(cut)

zombie=createSprite(width/2,height-110);
zombie.addImage("walking",zombieImg);
zombie.scale = 0.1;
zombie.velocityX = 10;

turner  = createSprite(width/10,height-150,20,500)
turner2  = createSprite(width-100,height-150,20,500)

turner.visible = false;
turner2.visible = false;


  for(var i = 0;i<= 8;i++){
    var x= random(width/2 -200,width/2 +300);
   var y = random(-10,140);
 stone = new Stone(x,y,80);      
   stones.push(stone);
} 

  frameRate(1850);

}

function draw() {
  background(bkImg);

  Engine.update(engine);
  
  bridge.show();



 // stone.create()

for(var i=0; i<stones.length; i++){
  stones[i].display();
}

createEdgeSprites();
zombie.bounceOff(turner)
zombie.bounceOff(turner2)

drawSprites();
 

}

function cut()
{
  bridge.break();
  bridge_con.detach();
  bridge_con = null; 
  
}