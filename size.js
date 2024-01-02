
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

        // TODO: Remove these
        this.right = Math.floor(width)
        this.bottom = Math.floor(height)
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

    getBounds(){
        return {
            left: this.left,
            top: this.top,
            right: this.right,
            bottom: this.bottom
        }
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

export function getScreenSize(){

    return new Size({
        width: window.innerWidth,
        height: window.innerHeight
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