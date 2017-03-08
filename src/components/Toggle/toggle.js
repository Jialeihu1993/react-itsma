import React, { Component } from 'react';
import './toggle.css';

class Toggle extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: props.isToggleOn};
    }

    handleToggle = () => {
        const toggleValue = !this.state.isToggleOn;
        this.setState({isToggleOn: toggleValue});
        if(this.props.onToggle){
            this.props.onToggle(toggleValue);
        }
    }

    render() {
        return (
            <div onClick={this.handleToggle}>
                {this.state.isToggleOn?
                <input id="toggle_input" type="checkbox" className="toggle_input" checked/>:
                <input id="toggle_input" type="checkbox" className="toggle_input" />
                }
                <label id="toggle_label" for="toggle_input"></label>
            </div>
        );
    }
}

Toggle.defaultProps = {
    isToggleOn: false
}

Toggle.propTypes = {
    onToggle: React.PropTypes.func,
    isToggleOn: React.PropTypes.bool,
}

export default Toggle;
