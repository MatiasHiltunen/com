import { box, text } from "../componentTypes.js"
import { logger } from "../log.js"
import { Size } from "../size.js"
import { Button } from "./components/button.js"

export const app = {
    children: [
        new Button({
            state: {
                count: 0
            },
            border: 3,
            color: 'red',
            fill: 'grey',
            size: new Size({
                width: 100,
                height: 40
            }),
            onClick(current) {
                current.state.count++
                current.color = 'blue'
                current.size = new Size({ width: 200, height: 50 })
                logger(current.state.count)
            },
            children: [
                {
                    type: text,
                    text: 'test',
                    fontSize: 12
                }
            ]
        }),
        new Button({
            state: {
                count: 0
            },
            border: 3,
            color: 'red',
            fill: 'grey',
            size: new Size({
                width: 100,
                height: 40
            }),
            onClick(current) {
                current.state.count++
                current.color = 'blue'
                current.size = new Size({ width: 200, height: 50 })
                logger(current.state.count)
            },
            children: [
                {
                    type: text,
                    text: 'eka nappi!',
                    fontSize: 12
                }
            ]
        }),
        new Button({
            border: 3,
            color: 'red',
            fill: 'grey',
            size: new Size({
                width: 100,
                height: 40
            }),
            onClick(current) {

                current.color = 'white'
                current.size = new Size({ width: 200, height: 50 })
                current.fill = 'black'
            },
            children: [
                {
                    type: text,
                    text: 'toka nappi!',
                    fontSize: 12
                }
            ]
        }),
        /* {
            type: box,
            fill: 'white',
            color: 'red',
            border: 1,
            state: {
                clickCount: 0
            },
            size: new Size({ width: 100, height: 50 }),
            onClick() {

                if (app.children[1].state.clickCount % 2 === 0) {


                    app.children[1].color = 'blue'
                    app.children[1].fill = 'black'
                } else {
                    app.children[1].color = 'red'
                    app.children[1].fill = 'white'

                }
                app.children[1].state.clickCount++

                logger("CLICCCK", app.children[1].state.clickCount)
            },
            children: [
                {
                    type: text,
                    text: 'eka nappi!'
                }
            ]
        } */
    ]
}

