import { Component } from "../componentBase.js";
import { box } from "../componentTypes.js";

export class Box extends Component {

    constructor({ children, color, fill, size, border, onClick, state, rotation }) {
        super(box)
        this.color = color
        this.border = border
        this.fill = fill ?? "white"
        this.state = state ?? {}
        this.children = children
        this.size = size
        this.onClick = onClick
        this.rotation = rotation

    }

    render(ctx) {
        if(this.rotation){
            ctx.translate(this.size.left + this.size.width / 2, this.size.top + this.size.height / 2);
            ctx.rotate(this.rotation);
            ctx.translate(-(this.size.left + this.size.width / 2), -(this.size.top + this.size.height / 2));

        }
        ctx.clearRect(...this.size.rectSize)
        ctx.fillStyle = this?.fill ?? 'white'
        ctx.fillRect(...this.size.rectSize)

        ctx.strokeStyle = this?.color ?? 'blue'
        ctx.lineWidth = this?.border ?? 2
        ctx.strokeRect(...this.size.rectSize)

        ctx.resetTransform();
    }
}

export class RoundedBox extends Component {
    constructor({ children, color, fill, size, border, onClick, onHover, state }) {
        super(box)
        this.color = color
        this.border = border
        this.fill = fill ?? "white"
        this.state = state ?? {}
        this.children = children
        this.size = size
        this.onClick = onClick
    }

    render(ctx) {

        ctx.beginPath();
        ctx.roundRect(...this.size.rectSize, [10, 10, 10, 10]);

        ctx.fillStyle = this.fill
        ctx.fill();

    }
}