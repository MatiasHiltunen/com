import { Component } from "../../componentBase.js";
import { box } from "../../componentTypes.js";

export class Box extends Component {

    constructor({children, color, fill, setSize, border, onClick, state}){
        super(box)
        this.color = color
        this.border = border
        this.fill = fill
        this.state = state ?? {}
        this.children = children

        if(setSize){
            this.setSize(setSize())
        }

        if(onClick){   
            this.onClick(() => onClick(this))
        }
    }

}