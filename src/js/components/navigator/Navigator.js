/**
 * Created by hepen on 6/28/2017.
 */
import React from 'react';
import { Link, browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Col, Collapse } from 'react-bootstrap';
import BaseComponent from '../BaseComponent';
import '../../../styles/navigator.scss';

export default class Navigator extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            'openFolder': {
            }
        };
        this.flatNodeTree = [];
        this.idIndex = 0;
        this.parameters = Array.from(this.props.parameters);
        this.pathname = browserHistory.getCurrentLocation().pathname;
        this.currentNode;
    }

    componentWillMount() {
        this.initNodeTree(0);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        this.navigatorUpdate();
    }

    initNodeTree(level, parameters, parentNode) {
        if (!parameters) parameters = this.parameters;
        parameters.forEach(param => {
            let nodeId = level + '-' + this.idIndex++;
            param.nodeId = nodeId;
            if (parentNode) param.parentNodeId = parentNode.nodeId;
            this.flatNodeTree.push(param);
            this.state.openFolder[nodeId] = (param.isCollapsed !== true);
            let children = param.children;
            if (children && children.length) {
                this.initNodeTree(level + 1, children, param);
            }
        });
    }

    onClickHandler(name) {
        let openState = this.state.openFolder;
        openState[name] = !openState[name];

        this.setState({ openFolder: openState });
    }

    onClickTitleHandler(name) {
        let openState = this.state.openFolder;
        openState[name] = !openState[name];
        this.setState({ openFolder: openState });
    }


    _returnWideMode() {
        this.props.dispatch(changeNavMode({
            propName: 'navMode',
            value: 2
        }));
    }

    _currentNavUpdate(name) {
        this.props.dispatch(changeCurrentNav({
            propName: 'currentNav',
            value: name
        }));
    }

    onClickLinkHandler(name) {
        this.currentNode = name;
        this.setState({});
    }

    renderComponent(property) {
        return this.renderNav(property);
    }

    renderNav(property) {
        let treeNode = this.renderNavigateTree(0);
        return (
            <Col style={{ minWidth: property.navigatorWidth }} className="colFull newNav">
                {treeNode}
            </Col>
        )
    }

    renderMenu(level, className, label, subNode, param){
        let isOpen = param.parentNodeId ? this.state.openFolder[param.parentNodeId] : true;
        let iconClass = this.state.openFolder[param.nodeId] ? 'glyphicon glyphicon-triangle-bottom icon': 'glyphicon glyphicon-triangle-right icon';
        if (level === 0){
            return (
                <Collapse in={isOpen}>
                <div>
                <Col xs={12} className={className}>
                    <Col xs={2}><span className={iconClass} onClick={() => {this.onClickTitleHandler(param.nodeId)}} ></span></Col>
                    <Col xs={10} className="colFull"><span className="title" onClick={() => {this.onClickTitleHandler(param.nodeId)}} >
                        {this.formatMessage({id: param.label})}
                    </span></Col>
                </Col>
            {subNode}
                </div>
                </Collapse>
            )
        }
        if (param.nodeId === '2-4') debugger;
        return (
            <Collapse in={isOpen}>
                <div>
                    <Col xs={12} className={className}>
                        <Col xs={3}>
                            {param.children && param.children.length ? <span className={iconClass} onClick={() => {this.onClickHandler(param.nodeId)}}></span> : null}
                        </Col>
                        {label}
                    </Col>
                    {subNode}
                </div>
            </Collapse>
        )
    }

    getNodeByParentNodeId(nodeId){
        return this.flatNodeTree.find(node => node.parentNodeId === nodeId);
    }

    renderNavigateTree(level, parameters) {
        if (!parameters) parameters = this.parameters;
        let result = [];
        parameters.forEach(param => {

            let children = param.children;
            let subNode = [];
            if (children && children.length) {
                subNode = this.renderNavigateTree(level + 1, children);
            }
            let className = '';
            if (level ===0 ) {
                className = 'mainTitle';
            } else if (level === 1) {
                className = 'itemTitle';
            } else if (level === 2) {
                className = 'subItemTitle';
            }
            let label;
            if (param.link) {
                className = 'colFull ' + className;
                let style = {textDecoration: 'none'};
                if (this.currentNode === param.nodeId) {
                    style.color = '#01A982';
                }

                label = (
                    <Col xs={9} className="colFull">
                    <Link style={style} to={param.link} ref={param.nodeId} onClick={() => this.onClickLinkHandler(param.nodeId)}>
                        <span>
                            {this.formatMessage({id: param.label})}
                        </span>
                    </Link>
                    </Col>
                )
            } else {
                label = (
                    <Col xs={9} className="colFull">
                    <span className="subTitle" onClick={() => this.onClickHandler(param.nodeId)}>
                        {this.formatMessage({id: param.label})}
                    </span>
                    </Col>
                )
            }
            let navDom = this.renderMenu(level, className, label, subNode, param);
            result.push(navDom);
        });
        return result;
    }

    renderNarrowMode() {
        return (
            <div className="NarrowMode">
                <Col style={{ maxWidth: this.props.navigatorWidth }} className="colFull newNav">
                    <Col xs={12} className="colFull navCol navForward">
                        <span></span><span onClick={() => this._returnWideMode()}></span>
                    </Col>
                    <Col xsOffset={1} xs={10} className="seperator cusMarginBottom">
                    </Col>
                    <Col xs={12}>
                        <span className="vertical"> <FormattedMessage id='menu' defaultMessage='Menu' /> </span>
                    </Col>
                </Col>
            </div>
        );
    }

    /*render() {
        const navMode = this.props.nav.navMode;
        return (
            navMode == 2 ? this.renderNav() : this.renderNarrowMode()
        );
    }*/
}

Navigator.propTypes = Object.assign(BaseComponent.propTypes, {
    parameters: React.PropTypes.array,
    navigatorWidth: React.PropTypes.number
});

Navigator.defaultProps = {
};