import React, { Component } from 'react'

export default class IndividuaCenter extends Component{
    render(){
        return (
            <div className="center">
                  <button onClick={this.about.bind(this)}>关于</button>
                  <button onClick={this.signOut.bind(this)}>登出</button>
            </div>
        )
    }
    signOut(e){
        e.stopPropagation()
        this.props.onSubmit(e)
    }
    about(e){
        e.stopPropagation()
        this.props.about(e)
    }
}