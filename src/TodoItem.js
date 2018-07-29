import React,{Component} from 'react'
import './TodoItem.css'
export default class TodoItem extends Component {
    render(){
        return (<div className="TodoItem">
            <input type="checkbox" checked={this.props.todo.status==='completed'} 
            onChange={this.toggle.bind(this)}/>
            <span className="title">{this.props.todo.title}</span>
            <button onClick={this.deleted.bind(this)}>删除</button>  
        </div>)
    }
    toggle(e){
        this.props.onToggle(e,this.props.todo)
    }
    deleted(e){
        this.props.onDeleted(e,this.props.todo)
    }
}