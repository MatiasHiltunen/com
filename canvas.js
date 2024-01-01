import { clearListeners, setClickListener } from "./listeners.js"
import { logger } from "./log.js"
import { Size, getExtent, getScreenSize } from "./size.js"


function createCanvas(){
    
    const canvas = document.createElement('CANVAS')
    const {x,y} = getScreenSize()
    canvas.style.width = x
    canvas.style.height = y
    canvas.width = x
    canvas.height = y
    

    const context = canvas.getContext('2d')
    
    return {context, canvas}
}

const {context, canvas} = createCanvas()

export function draw({children:appComponents}){
    context.reset()
  /*   const {top, left, right, bottom} = getExtent() */

    const screenSize = getScreenSize()
    
    canvas.width = screenSize.width
    canvas.height = screenSize.height

    context.clearRect(...screenSize.rectSize)
    context.fillRect(...screenSize.rectSize)

    const count = appComponents.length

    clearListeners()

    const center = screenSize.getCenter()
    appComponents.forEach((item, i) => {

        
        if(item?.type === 'box'){

            console.log(item.size)

            item.size ??= new Size({width: 10, height: 10})

            item.size.setPosition({
                x: center.x,
                y: (center.y / count) * (i+1)
            })

            console.log(item.size)
            
            if(item.onClick != null){
                setClickListener(item.size, item.onClick)
            }
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