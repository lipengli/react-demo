import React from 'react';
import {connect} from 'react-redux';
import Header from './comps/Header';
import InvoiceInput from './InvoiceInput';

const Component = React.createClass({
    componentDidMount () {
        this.props.init()
    },

    componentDidUpdate () {
    },

    render () {
        return (
            <div>
                <InvoiceInput callBack={(data) => {
                    console.log(data, '进行普票提交')
                }}/>
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: () => {
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
