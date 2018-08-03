import React, { Component } from 'react';
import './TodoInput.css'

export default class TodoInput extends Component{
    render(){
        return <form className="InputForm"><input className="TodoInput" type="text" value={this.props.content}
        onKeyPress={this.submit.bind(this)}
        onChange={this.changeTitle.bind(this)}/> <button onClick={this.clickSubmit.bind(this)}>提交</button></form>
    }
    submit(e){
        if (e.key==='Enter'){
            if (e.target.value.trim()!==''){
                console.log('不为空',e.target.value.trim())
                this.props.onSubmit(e)
            }
        }
    }
    clickSubmit(e){
        e.preventDefault()
        let clickE={target:{}}
        clickE.target.value=JSON.parse(JSON.stringify(this.props.content))
        this.props.onSubmit(clickE)
        
    }
    changeTitle(e){
        this.props.onChange(e)
    }
}