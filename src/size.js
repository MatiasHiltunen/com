
export const alignCenter = 1
export const alignStart = 2
export const alignSpaceBetween = 3
export const alignEnd = 4

export const row = 1
export const column = 2

export class Size {


    constructor({ width, height, x = 0, y = 0, alingOnAxisX, alingOnAxisY, direction }) {
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

    get computedHeight() {
        if(this.siblingCount > 0){
            return Math.floor(this.height / this.siblingCount)
        }
    
        return this.height
    }

    get computedWidth() {
        if(this.siblingCount > 0){
            return Math.floor(this.width / this.siblingCount)
        }
    
        return this.width
    }

    get rectSize() {
        return [this.left, this.top, this.width, this.height]
    }

    get bounds() {
        return [this.left, this.top, this.right, this.bottom]
    }

    computeAlingCenterY({parentSize,parentCenter,childSegmentWidth,childSegmentHeight}){



        if(parentSize.direction === row){
            this.setPosition({
                x: (((this.orderIndex + 1) * (childSegmentWidth)) - (childSegmentWidth / 2)) + parentSize.left,
                y: parentCenter.y + parentSize.top 
            })
        } else {
            this.setPosition({
                x: parentCenter.x + parentSize.left,
                y: (((this.orderIndex  + 1) * (childSegmentHeight)) - (childSegmentHeight / 2)) + parentSize.top 
            })
        }

    }

    computeAlignStartY({parentSize,childSegmentWidth,childSegmentHeight}){

   

        if(parentSize.direction === row){
          
            this.setPosition({
                x: center.x + parentSize.left,
                y: ((childSegmentWidth) * this.orderIndex) + parentSize.top 
            })
        } else {
            
            this.setPosition({
                x: (childSegmentHeight * this.orderIndex) + parentSize.left,
                y: center.y + parentSize.top 
            })
        }
          
     
    }

    computePosition({parentSize}){
        const parentCenter = parentSize.getCenter()
        const childSegmentWidth = parentSize.computedWidth
        const childSegmentHeight = parentSize.computedHeight
        const params = {parentSize,parentCenter,childSegmentWidth,childSegmentHeight}

        if(this.alingOnAxisY === alignCenter) this.computeAlingCenterY(params)
        if(this.alingOnAxisY === alignStart) this.computeAlignStartY(params)
    }

    setPosition({ x, y }) {
        this.left = Math.floor(x - (this.width / 2))
        this.top = Math.floor(y - (this.height / 2))
        this.right = Math.floor(this.left + this.width)
        this.bottom = Math.floor(this.top + this.height)
    }


    getCenter() {
        return {
            x: Math.floor((this.right - this.left) / 2),
            y: Math.floor((this.bottom - this.top) / 2)
        }
    }

    hasPoint([x, y]) {
        return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom
    }

    update({ width, height, alingOnAxisX, alingOnAxisY, direction }) {

        if (alingOnAxisX) this.alingOnAxisX = alingOnAxisX
        if (alingOnAxisY) this.alingOnAxisY = alingOnAxisY
        if (direction) this.direction = direction
        if (width) this.width = width
        if (height) this.height = height

    }
}

export class RelativeSize extends Size {

    relative = true



    constructor(relativeWidth, relativeHeight, options = {}) {

        super({ width: 0, height: 0, ...options })
        this.relativeHeight = relativeHeight
        this.relativeWidth = relativeWidth
        this.height = Math.floor(relativeHeight * 1000)
        this.width = Math.floor(relativeWidth * 1000)
    }


    update(relativeWidth, relativeHeight, options = {}) {

        if (options?.alingOnAxisX) this.alingOnAxisX = options.alingOnAxisX
        if (options?.alingOnAxisY) this.alingOnAxisY = options.alingOnAxisY
        if (options?.direction) this.direction = options.direction
        if (width) this.relativeWidth = relativeWidth
        if (height) this.relativeHeight = relativeHeight

    }

    updateGlobalSize({ width, height }) {
        this.width = Math.floor(this.relativeWidth * width)
        this.height = Math.floor(this.relativeHeight * height)
    }
}


export function getScreenSize() {



    return new Size({
        width: window.innerWidth,
        height: window.innerHeight,
        x: 0,
        y: 0
    })
}

export function getExtent() {
    const { x, y } = getScreenSize()
    return {
        left: 0,
        top: 0,
        right: x,
        bottom: y
    }
}