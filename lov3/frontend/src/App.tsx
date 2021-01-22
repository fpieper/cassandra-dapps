
import { createEdSignature } from "cassandra-client";
import ComponentExample from 'lov3/src/ComponentExample';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';


// most plugins are available without further configuration needed.
const appStyle = createUseStyles({
    justABox: {
        border: '1px solid red',
        padding: '25px'
    },
    headerContainer: {

    }
})

export default () => {

    const [walletAdress, setWalletAdress] = useState('---');



    const createSig = async () => {
        const adress = await createEdSignature('blabla')

        setWalletAdress(adress)
    }

    const appStyleClasses = appStyle()

    return (
        <div>
            <header className={appStyleClasses.headerContainer}>
                Hello Cassandra!
                 
                <div>
                    Signature: {walletAdress}
                </div>

                <ComponentExample></ComponentExample>

                <button onClick={createSig}>Create New Signature</button>
            </header>
        </div>
    )
};