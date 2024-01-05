import { app, none, row, text } from "./componentTypes.js";
import { theme } from "./config.js";
import { getClickListeners, setClickListener, setHoverListener } from "./listeners.js";
import { Size, alignCenter, alignStart } from "./size.js";



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

        
        if(this.onClick && this.context.activeClickPoint && this.size.hasPoint(this.context.activeClickPoint)){
            // TODO: Add priority to top layer
            this.onClick()
            this.context.activeClickPoint = null
        }

        if(this.size.relative){
            this.size.updateGlobalSize(this.context.screen)
        }
        
      
        if(this.children && Array.isArray(this.children)){
            this.size.siblingCount = this.children.length 
        }
        
        const center = this.parentSize.getCenter()

        let childSegmentHeight = this.parentSize.direction === row ? this.parentSize.width : this.parentSize.height

        if(this.parentSize.siblingCount > 0){
            childSegmentHeight = childSegmentHeight / this.parentSize.siblingCount
        }

        
        
        if(this.parentSize.alingOnAxisY === alignCenter){
                
                const pos = this.parentSize.direction === row ?
                {
                    x: (((this.size.orderIndex + 1) * (childSegmentHeight)) - (childSegmentHeight / 2)) + this.parentSize.left,
                    y: center.y + this.parentSize.top 
                }
                : {
                    x: center.x + this.parentSize.left,
                    y: (((this.size.orderIndex  + 1) * (childSegmentHeight)) -( childSegmentHeight / 2)) + this.parentSize.top 
                }

                this.size.setPosition(pos)
     
        } else if(this.parentSize.alingOnAxisY === alignStart){
                
          
                
                const pos = this.parentSize.direction === row ?
                {
                    x: (childSegmentHeight * this.size.orderIndex) + this.parentSize.left,
                    y: center.y + this.parentSize.top 
                } 
                
                : {
                    x: center.x + this.parentSize.left,
                    y: ((childSegmentHeight) * this.size.orderIndex) + this.parentSize.top 
                }
  
                this.size.setPosition(pos)    
        }

        if(this.children && Array.isArray(this.children)){
      

            this.children.forEach((child,i)=> {
                if(typeof child === 'function'){

                    let component = child(this.context)

                    
                    const properties = {...component}
                    
                    component = new Component(component.type)
                    
                    for(const key in properties){
                        component[key] = properties[key]
                    }
                    
                    component.size = new Size({width: this.size.width, height: this.size.height})
                    
                    component.context = this.context
                    component.parentSize = this.size
                    component.size.orderIndex = i
                    
               
                    component.build()

                    return
                    
                }
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