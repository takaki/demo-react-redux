import  React from 'react';
import  ReactDOM from 'react-dom';

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
    getInitialState: function() {
        return {
            num: 0
        }
    },
    render: function() {
        return (
            <div>
                <div>
                    <button onClick={() => this.props.onClick(this.state.num)}>plus {this.state.num}</button>
                    <input type="text" onChange={(ev)=>this.setState({num: parseInt(ev.target.value)||0})}/>
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
    getInitialState: function() {
        return {
            count: 0
        }
    },
    addCounter: function(n) {
        this.setState({count: this.state.count + n})
    },
    render: function() {
        return (
            <div>
                <Counter count={this.state.count}/>
                <Plus1  onClick={() => this.addCounter(1)}/>
                <PlusForm onClick={(n) => this.addCounter(n)}/>
                <Reset onClick={() => this.setState({count: 0})}/>
            </div>
        )
    }
})

ReactDOM.render(
    <App/>,
    document.getElementById('content')
);
