import React, { Component } from 'react'
import '../../../styles/select.scss';

import Select from './select/Select'

class Dropdown extends Component {
	constructor(props) {
		super(props)
			props.value && (this.value = props.value.toString());
	}

	componentWillReceiveProps(newProps) {
		newProps.value && (this.value = newProps.value.toString());
	}

	onChange(newValue) {
		if (this.props.onChange) {
			this.props.onChange({ value: newValue });
		}
	}

	render() {
	    let property = Object.assign({}, this.props);
	    if (property.disabled == null) {
	        property.disabled = false;
        }
        if (property.clearable == null) {
	        property.clearable = false;
        }
        if (property.searchable == null) {
	        property.searchable = false;
        }
		return (<Select {...property}/>)
	}
}

Dropdown.defaultProps = {
}

export default Dropdown
