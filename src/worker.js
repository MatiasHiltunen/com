//import { draw } from "./canvas.js";
import { Size } from "./size.js";

import appInstance from "./app.js";

let size = null
let activeClickPoint = null

function animate() {


    if(size){
        appInstance.update({
            size,
            activeClickPoint:  activeClickPoint,
        })

        activeClickPoint = null
        
        const bitmap = appInstance.canvas.transferToImageBitmap()

        self.postMessage(bitmap, [bitmap]);
    }        

    requestAnimationFrame(animate)

}


onmessage = (e) => {

    if(e.data.screenSize){
        size = new Size(e.data.screenSize)  
    }

    if(e.data.cursor){
        activeClickPoint = e.data.cursor
    }
}

animate()