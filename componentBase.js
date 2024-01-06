import { app, none } from "./componentTypes.js";
import { theme } from "./config.js";
import { setHoverListener } from "./listeners.js";
import { Size } from "./size.js";


export class Component {
    type = none
    fill = theme.fill
    color = theme.color
    border = theme.border
    size = null
    parentSize = null
    children = null
    onClick = null
    animate = null
    
    constructor(type){
        this.type = type
        this.id = new Date().getMilliseconds() * type * Math.floor(Math.random() * 1000) 
    
    }

    setParentSize(size){
        this.parentSize = size
    }

    build(){

        if(this.context.activeClickPoint){
            if(this.onClick && this.size.hasPoint(this.context.activeClickPoint)){

                // TODO: Add priority to top layer
                this.onClick()
                this.context.activeClickPoint = null
            } /* else {
                this.buildChildren()
                return
            } */
        }

        if(this.size.relative){
            this.size.updateGlobalSize(this.context.screen)
        }
        
      
        if(this.children && Array.isArray(this.children)){
            this.size.siblingCount = this.children.length 
        }
    
        
        this.size.computePosition({parentSize: this.parentSize})
        
        this.render(this.context.canvasContext)
        this.buildChildren()

       

    }

    render(){
        console.warn("Render method not implemented.")
    }

    buildChildren(){
        if(this.children && Array.isArray(this.children)){
      
            this.children.forEach((child,i)=> {
                
                child.context = this.context
                child.parentSize = this.size
                child.size.orderIndex = i

                child.build()

            })
        }
    }

   
   
}


export class App extends Component {

    constructor({ children, context={}}){
        super(app)
        this.children = children
        this.context = {...this.context, ...context}

    }

    update({size, activeClickPoint}){
        if(this.canvas){
            this.canvas.width = size.width
            this.canvas.height = size.height
        } else {
            this.canvas = new OffscreenCanvas(size.width, size.height)
        }

        if(!this.context.canvasContext){            
            this.context.canvasContext = this.canvas.getContext("2d")
        }


  

        this.context.canvasContext.imageSmoothingEnabled = false
        this.context.canvasContext.textRendering = "geometricPrecision";
        this.context.canvasContext.clearRect(...size.rectSize)
        this.context.canvasContext.fillRect(...size.rectSize)

        this.context.screen = size
        this.context.activeClickPoint = activeClickPoint
        this.size = size
        this.parentSize = new Size({width: this.size.width, height: this.size.height})
        this.build()
    }

    render(ctx){

      


    }

}