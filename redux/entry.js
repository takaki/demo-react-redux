import  React from 'react';
import  ReactDOM from 'react-dom';

import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'

var Counter = React.createClass({
    render: function(){
        return (
            <h1>Count = {this.props.count}</h1>
        )
    }
})

var Plus1 = React.createClass({
    render: function() {
        return(<button onClick={() => this.props.onClick(1)}>plus 1</button>)
    }
})

var PlusForm = React.createClass({
    render: function() {
        return (
            <div>
                <div>
                    <button onClick={() => this.props.onClick(this.props.button)}>plus {this.props.button}</button>
                    <input type="text" onChange={(ev)=> this.props.onChange(parseInt(ev.target.value)||0)}/>
                </div>

            </div>
        )

    }
})

var Reset = React.createClass({
    render: function() {
        return (
            <div><button onClick={this.props.onClick}>Reset</button></div>
        )
    }

})

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Counter count={this.props.count}/>
                <Plus1 onClick={this.props.addCounter}/>
                <PlusForm button={this.props.button}
                     onClick={this.props.addCounter}
                     onChange={this.props.setButton}/>
                <Reset onClick={this.props.resetCounter} />
            </div>
        )
    }
})


function addCounter(num) {
    return {
        type: 'ADD_COUNTER',
        payload: num
    }
}

function resetCounter(num) {
    return {
        type: 'RESET_COUNTER',
    }
}

function setButton(num) {
    return {
        type: 'SET_BUTTON',
        payload: num
    }
}

const initialState =  {
    count: 0,
    button: 0,
}

const reducer = function(state = initialState, action) {
    switch(action.type) {
        case "ADD_COUNTER":
            return Object.assign({}, state, {
                count: state.count + action.payload
            })
        case "RESET_COUNTER":
            return Object.assign({}, state, {
                count: 0
            })
        case 'SET_BUTTON':
            return Object.assign({}, state, {
                button: action.payload,
            })
        default:
            return state;
    }
}

const store = createStore(reducer);

function mapStateToProps(state, props) {
    return state
}

function mapDispatchToProps(dispatch, props) {
    return {
        addCounter: function(n) {
            dispatch(addCounter(n));
        },
        resetCounter: function() {
            dispatch(resetCounter());
        },
        setButton: function(n) {
            dispatch(setButton(n));
        }
    }

}
App = connect(mapStateToProps,mapDispatchToProps)(App)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('content')
);
