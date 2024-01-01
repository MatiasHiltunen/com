import { none } from "./componentTypes.js";
import { theme } from "./config.js";
import { setClickListener } from "./listeners.js";

export class Component {
    type = none
    fill = theme.fill
    color = theme.color
    border = theme.border
    
    constructor(type, onClick){
        this.type = type
        this.id = new Date().getMilliseconds() * type * Math.floor(Math.random() * 1000) 
    
        if(onClick){
        }
    }
    
    onClick(callback){   
        if(!this.size) throw new Error("Can not add click listener to a component without size")

        setClickListener(this.id, this.size, callback) 
    }

}

