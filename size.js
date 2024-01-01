
export class Size {
    

    constructor({width, height, x = 0, y = 0}){
        this.left = x 
        this.top = y
        this.right = width
        this.bottom = height

        this.width = width
        this.height = height
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