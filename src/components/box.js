import { Component } from "../../componentBase.js";
import { box } from "../../componentTypes.js";

export class Box extends Component {

    constructor({ children, color, fill, size, border, onClick, onHover, state }) {
        super(box)
        this.color = color
        this.border = border
        this.fill = fill
        this.state = state ?? {}
        this.children = children
        this.size = size

        if (onClick) {
            this.onClick(() => onClick(this))
        }

        if (onHover) {
            this.onHover((status) => onHover(status, this))
        }
    }

}