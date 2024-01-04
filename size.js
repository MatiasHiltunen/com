
export const alignCenter = 1
export const alignStart = 2
export const alignSpaceBetween = 3
export const alignEnd = 4

export const row = 1
export const column = 2

export class Size {
    

    constructor({width, height, x = 0, y = 0, alingOnAxisX, alingOnAxisY, direction}){
        this.left = Math.floor(x)
        this.top = Math.floor(y)
        this.width = Math.floor(width)
        this.height = Math.floor(height)
        
        this.right = this.left + this.width
        this.bottom = this.top + this.height
        this.offset = 0
        this.siblingCount = 0
        this.orderIndex = 0
     
        this.alingOnAxisX = alingOnAxisX ?? alignCenter
        this.alingOnAxisY = alingOnAxisY ?? alignCenter
        this.direction = direction ?? column
    }

    get rectSize(){
        return [this.left, this.top, this.width, this.height].map(value => Math.floor(value))
    }

    get bounds(){
        return [this.left, this.top, this.right, this.bottom].map(value => Math.floor(value))
    }

    setPosition({x,y}) {
        this.left = x - (this.width / 2)
        this.top = y - (this.height / 2)
        this.right = this.left + this.width
        this.bottom = this.top + this.height
    }


    getCenter(){
        return {
            x: Math.floor((this.right - this.left) / 2),
            y: Math.floor((this.bottom - this.top) / 2)
        }
    }

    hasPoint({x,y}){
        return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom
    }
}

export class RelativeSize extends Size {

    relative = true



    constructor(relativeWidth, relativeHeight,  options={}){
       
     

        super({width:0, height:0, ...options})
        this.relativeHeight = relativeHeight
        this.relativeWidth = relativeWidth
        this.height = Math.floor(relativeHeight * window.innerHeight)
        this.width = Math.floor(relativeWidth * window.innerWidth)
    }


    update(context){


        this.height = Math.floor(this.relativeHeight * context.screen.height)
        this.width = Math.floor(this.relativeWidth * context.screen.width)
    }
}


export function getScreenSize(){



    return new Size({
        width: window.innerWidth,
        height: window.innerHeight,
        x: 0,
        y: 0
    })
}

export function getExtent(){
    const {x,y} = getScreenSize()
    return {
        left: 0,
        top: 0,
        right: x,
        bottom: y
    }
}