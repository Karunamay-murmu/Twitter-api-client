import React from "react";

function WithInput(WrappedComponent, errorObj) {
    function NewComponent(props) {
        return <WrappedComponent />
    }
    return NewComponent;
}

export default WithInput;