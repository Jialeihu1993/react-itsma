/**
 * Created by hepen on 6/1/2017.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import BaseContainer from './BaseContainer';

export default class CollapseSection extends BaseContainer {
    constructor(props) {
        super(props);
        let {isCollapsed} = this.props;
        this.state = {
            isCollapsed: isCollapsed ? false : isCollapsed,
            title: ''
        };
    }

    _hideHandler(event) {
        let toggleResult = true;
        if (this.props.onToggle) {
            toggleResult = this.props.onToggle(event);
        }
        if (toggleResult !== false) {
            // this.state.isCollapsed = !this.state.isCollapsed;
            this.setState({isCollapsed: !this.state.isCollapsed});
        }
    }

    _iconStatus() {
        if (!this.state.isCollapsed) return 'glyphicon glyphicon-menu-down';
        return 'glyphicon glyphicon-menu-up';
    }

    renderComponent(property) {
        return (
            <div>
                <div>
                    <span className={this._iconStatus() + ' itsma_collapseArrow'} onClick={(event) => this._hideHandler(event)}></span>
                    <span className="itsma_sectionTitle"><FormattedMessage id={this.property.title} defaultMessage={this.property.title}/></span>
                </div>
                <div>
                    <hr className="itsma_section_hr"/>
                </div>
                {this.renderChildren()}
            </div>
        )
    }

    renderChildren() {
        if (this.state.isCollapsed) {
            return null;
        }
        return <div className="itsma_collapseSection">{this.props.children}</div>
    }
}

CollapseSection.propTypes = Object.assign(BaseContainer.propTypes, {
    title: React.PropTypes.string,
    isCollapsed: React.PropTypes.bool,

    onToggle: React.PropTypes.func
});