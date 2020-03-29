import React from 'react';

const FirebaseContext = React.createContext(null);

console.log(FirebaseContext.Consumer.getCurrentValue);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);



export default FirebaseContext;

