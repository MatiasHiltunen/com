import { none } from "./componentTypes.js";
import { theme } from "./config.js";
import { getClickListeners, setClickListener } from "./listeners.js";

export class Component {
    type = none
    fill = theme.fill
    color = theme.color
    border = theme.border
    size = null
    
    constructor(type, onClick){
        this.type = type
        this.id = new Date().getMilliseconds() * type * Math.floor(Math.random() * 1000) 
    
        if(onClick){
        }
    }
    
    setSize(size){
        this.size = size
        const listeners = getClickListeners()

        if(listeners[this.id]){
            setClickListener(this.id, this.size, listeners[this.id][1])
        }
    }

    onClick(callback){   
        if(!this.size) throw new Error("Can not add click listener to a component without size")

        setClickListener(this.id, this.size, callback) 
    }

}


