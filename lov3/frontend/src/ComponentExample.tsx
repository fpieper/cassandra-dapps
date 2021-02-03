// Create your Styles. Remember, since React-JSS uses the default preset,
import React from 'react'
import { createUseStyles } from "react-jss"

const styles = createUseStyles({
    blabla: {
        color: 'green',
        margin: {
            
            top: 5, // jss-plugin-default-unit makes this 5px
            right: 0,
            bottom: 0,
            left: '1rem'
        },
        '& span': {
            // jss-plugin-nested applies this to a child span
            fontWeight: 'bold' // jss-plugin-camel-case turns this into 'font-weight'
        }
    }
})

// Define the component using these styles and pass it the 'classes' prop.
// Use this to assign scoped class names.
export default ({  }) => {
    const classes = styles()
    return (
        <div className={classes.blabla}>
            just a component, which does nothing ATM
        </div>
    )
}
