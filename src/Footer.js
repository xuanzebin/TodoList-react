import React, { Component } from 'react'
import './Footer.css'
export default class Footer extends Component {
    constructor(){
        super()
    }
    render(){
        return (
            <div className="footer">
                <div className="footerButton" onClick={this.props.clearTodoList}>删除所有代办</div>
                <div className="footerButton" onClick={this.props.toggleAll}>全选</div>
            </div>
        )
    }
}