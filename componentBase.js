import { app, none, row, text } from "./componentTypes.js";
import { theme } from "./config.js";
import { getClickListeners, setClickListener, setHoverListener } from "./listeners.js";
import { Size, alignCenter, alignStart } from "./size.js";


function calculateChildSizeForDirection({widthOrHeight, siblingCount}){
            
    if(siblingCount > 0){
        return Math.floor(widthOrHeight / siblingCount)
    }

    return widthOrHeight
}

function calculateChildHeight({parentSize}){
            
    let childSegmentHeight = parentSize.height

    if(parentSize.siblingCount > 0){
        childSegmentHeight = childSegmentHeight / parentSize.siblingCount
    }

    return childSegmentHeight
}

export class Component {
    type = none
    fill = theme.fill
    color = theme.color
    border = theme.border
    size = null
    parentSize = null
    children = null
    context = {
        activeClickPoint:null
    }
    onClick = null
    
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
            } else {
                this.buildChildren()
                return
            }
        }

        if(this.size.relative){
            this.size.updateGlobalSize(this.context.screen)
        }
        
      
        if(this.children && Array.isArray(this.children)){
            this.size.siblingCount = this.children.length 
        }
    
        
        this.size.computePosition({parentSize: this.parentSize})

        
        this.buildChildren()
       

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

    onHover(callback){
        if(!this.size) throw new Error("Can not add hover listener to a component without size")

        setHoverListener(this.id, this.size, callback)
    }
}


export class App extends Component {

    constructor({ children, context={}}){
        super(app)
        this.children = children
        this.context = {...this.context, ...context}
    }

    update({size, activeClickPoint}){
        this.context.screen = size
        this.context.activeClickPoint = activeClickPoint
        this.size = size
        this.parentSize = size
        this.build()
    }

}