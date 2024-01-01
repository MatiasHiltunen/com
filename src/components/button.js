import { Component } from "../../componentBase.js";
import { box } from "../../componentTypes.js";

export class Button extends Component {

    constructor({children, color, fill, size, border, onClick}){
        super(box)
        this.color = color
        this.border = border
        this.size = size
        this.fill = fill
        this.children = children

        this.onClick(() => onClick(this))
    }

}