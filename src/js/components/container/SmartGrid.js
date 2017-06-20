/**
 * Created by hepen on 6/20/2017.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import BaseContainer from './BaseContainer';
import {Grid, Col, Row} from 'react-bootstrap';

export default class SmartGrid extends BaseContainer {
    constructor(props) {
        super(props);
        let {isCollapsed} = this.props;
        this.state = {
            isCollapsed: isCollapsed ? false : isCollapsed,
            title: ''
        };
    }

    renderChildren(column, children) {
        let width = 12 / column;
        let rows = Math.ceil(children.length / column);
        let result = [], index = 0;
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < column; j++) {
                let child = children[index];
                index++;
                row.push(<Col xs={width}>{child}</Col>);
            }
            result.push(<Row>{row}</Row>);
        }
        return result;
    }

    renderComponent(property) {
        let children = this.props.children;
        let inner = this.renderChildren(property.column, children);

        return (
            <Grid>
                {inner}
            </Grid>
        )
    }
}

SmartGrid.propTypes = Object.assign(BaseContainer.propTypes, {
    column: React.PropTypes.number
});

SmartGrid.defaultProps = {
    column: 2
};
