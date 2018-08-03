import React, { Component } from 'react';
import './TodoInput.css'

export default class TodoInput extends Component{
    render(){
        return <input className="TodoInput" type="text" value={this.props.content}
        onKeyPress={this.submit.bind(this)}
        onChange={this.changeTitle.bind(this)}/>
    }
    submit(e){
        if (e.key==='Enter'){
            if (e.target.value.trim()!==''){
                console.log('不为空',e.target.value.trim())
                this.props.onSubmit(e)
            }
        }
    }
    changeTitle(e){
        this.props.onChange(e)
    }
}