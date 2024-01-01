import { box } from "./componentTypes.js"
import { clearListeners, setClickListener } from "./listeners.js"

import { Size, getScreenSize } from "./size.js"


function createCanvas(){
    
    const canvas = document.createElement('CANVAS')
    const {x,y} = getScreenSize()
    const dpr = window.devicePixelRatio
    canvas.style.width = x 
    canvas.style.height = y 
    canvas.width = x * dpr
    canvas.height = y * dpr
    

    const context = canvas.getContext('2d')

    context.scale(dpr,dpr)
    
    return {context, canvas}
}

const {context, canvas} = createCanvas()

export function draw({children:appComponents}){
    context.reset()
  /*   const {top, left, right, bottom} = getExtent() */

    const screenSize = getScreenSize()
    const dpr = window.devicePixelRatio
    
    canvas.width = screenSize.width * dpr
    canvas.height = screenSize.height * dpr

    context.clearRect(...screenSize.rectSize)
    context.fillRect(...screenSize.rectSize)

    const ySegmentCount = appComponents.length

    const ySegmentHeight = screenSize.height / ySegmentCount

  

    const center = screenSize.getCenter()
    appComponents.forEach((item, i) => {

        
        if(item?.type === box){

            item.size ??= new Size({width: screenSize.width, height: ySegmentHeight})

            item.size.setPosition({
                x: center.x,
                y: ((i+1) * (ySegmentHeight) ) - ySegmentHeight / 2
            })

            context.clearRect(...item.size.rectSize)
            context.fillStyle = item?.fill ?? 'white'        
            context.fillRect(...item.size.rectSize)
    
            context.strokeStyle = item?.color ?? 'blue'
            context.lineWidth = item?.border ?? 2
            context.strokeRect(...item.size.rectSize)
           

        }

    });


}

function traverseComponents(item){

    const [boxWidth, boxHeight] = item?.size ?? [0,0]

    const boxLeft =  Math.floor((right / 2) - (boxWidth / 2))
    const boxTop = Math.floor((bottom / count * (i+1)) / 2 + (boxHeight / 2))
    
    if(item.onClick != null){
        setClickListener([boxLeft, boxTop, boxLeft + boxWidth, boxTop + boxHeight], item.onClick)
    }
    context.clearRect(boxLeft, boxTop, boxWidth, boxHeight)
    context.fillStyle = item?.fill ?? 'white'        
    context.fillRect(boxLeft, boxTop, boxWidth, boxHeight)

    context.strokeStyle = item?.color ?? 'blue'
    context.lineWidth = item?.border ?? 2
    context.strokeRect(boxLeft, boxTop, boxWidth, boxHeight)
}

export default canvas