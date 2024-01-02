import { box, text } from "../componentTypes.js"
import { logger } from "../log.js"
import { Size, alignCenter, alignStart, row } from "../size.js"
import { Box } from "./components/button.js"


export const app = {
    children: [
        new Box({
            setSize: () => new Size({
                width: 500,
                height: 500,
                alingOnAxisY: alignCenter,
                direction: row
            }),
            children: [
                new Box({
                    state: {
                        count: 0
                    },
                    border: 3,
                    color: 'red',
                    fill: 'grey',
                    setSize: () => new Size({
                        width: 100,
                        height: 40
                    }),
                    onClick(current) {
                        current.state.count++
                        current.children[0].text = 'count: ' + current.state.count
                        current.fill = current.state.count % 2 === 0 ? 'blue' : 'green'
                    },
                    children: [
                        {
                            type: text,
                            text: 'count',
                            fontSize: 12
                        }
                    ]
                }),
                new Box({
                    state: {
                        count: 0
                    },
                    border: 3,
                    color: 'red',
                    fill: 'grey',
                    setSize: () => new Size({
                        width: 100,
                        height: 40
                    }),
                    onClick(current) {
                        current.state.count++
                        current.fill = 'blue'
                        logger(current.state.count)
                    },
                    children: [
                        {
                            type: text,
                            text: 'Nappi',
                            fontSize: 12
                        }
                    ]
                }),
                new Box({
                    border: 3,
                    color: 'red',
                    fill: 'grey',
                    setSize: () => new Size({
                        width: 100,
                        height: 40,
                    }),
                    onClick(current) {
                        
                        alert("Hello")
                    },
                    children: [
                        {
                            type: text,
                            text: 'alert',
                            fontSize: 12
                        }
                    ]
                }),
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

