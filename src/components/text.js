import { Component } from "../../componentBase.js";
import { text as textType } from "../../componentTypes.js";
import { Size } from "../../size.js";

export class Text extends Component {

    constructor({ children, color, fill, text, border, onClick, onHover, state }) {
        super(textType)
        this.color = color
        this.border = border
        this.fill = fill
        this.state = state ?? {}
        this.children = children
        this.size = new Size({width: 1, height:1})
        this.onClick = onClick
        this.text = text

        if (onHover) {
            this.onHover((status) => onHover(status, this))
        }
    }

}