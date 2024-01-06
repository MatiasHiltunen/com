import { Component } from "../../componentBase.js";
import { text as textType } from "../../componentTypes.js";
import { Size } from "../../size.js";

export class Text extends Component {

    constructor({ children, color, fill, font, fontSize, text, border, onClick }) {
        super(textType)
        this.color = color ?? color
        this.border = border
        this.fontSize = fontSize
        this.font = `${this.fontSize ?? 12}pt ${font ?? 'serif'}`
        this.fill = fill
        this.children = children
        this.size = new Size({width: 1, height:1})
        this.onClick = onClick
        this.text = text ?? ""

       
    }

    render(ctx){
        ctx.fillStyle = this.color
        ctx.font = this.fontSize
        const textMetrics = ctx.measureText(this.text)

        const textWidth = textMetrics.actualBoundingBoxRight + textMetrics.actualBoundingBoxLeft

        const [left, top, right, bottom] = this.parentSize.bounds

        // Center text. 
        // TODO: add other alignment options 
        ctx.fillText(
            this.text, 
            Math.floor((left + ((right - left) / 2)) - textWidth / 2), 
            Math.floor(textMetrics.fontBoundingBoxDescent + top + ((bottom - top) / 2)), 
            Math.floor(right - left)
        );

    }

}