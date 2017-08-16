import React from 'react';
import ReactDom from 'react-dom';

class Portal extends React.Component {
    componentDidMount() {
        this.renderPortal();
    }

    componentWillReceiveProps(nextProps) {
        this.renderPortal(nextProps);
    }

    componentWillUnmount() {
        ReactDom.unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
    }

    renderPortal(props = this.props) {
        const { children } = props;

        if (!this.node) {
            this.node = document.createElement('div');
            this.node.style.zIndex = 1000;
            document.body.appendChild(this.node);
        }

        ReactDom.unstable_renderSubtreeIntoContainer(
            this,
            children,
            this.node,
        );
    }

    render() {
        return null;
    }
}

export default Portal;
