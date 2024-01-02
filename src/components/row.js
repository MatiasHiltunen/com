import { row } from "../../componentTypes"

export class Row extends Component {

    constructor({children, color, fill, size, border, onClick, state}){
        super(row)
        this.color = color
        this.border = border
        this.size = size
        this.fill = fill
        this.state = state ?? {}
        this.children = children

        this.onClick(() => onClick(this))
    }


}