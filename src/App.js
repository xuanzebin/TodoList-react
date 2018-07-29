import React, { Component } from 'react'
import './App.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import './reset.css'
import 'normalize.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      todoList:[],
      newTodo:''
    }
  }
  render() {
    let todos=this.state.todoList.filter((item,index)=>{return !item.deleted}).
    map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDeleted={this.deleted.bind(this)}/>
        </li>
      )
    })
    console.log(this.state.todoList)
    return (
      <div className="App">
         <h1>我的代办</h1>
         <div className="inputWrapper">
            <TodoInput content={this.state.newTodo} 
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)} />
         </div>
         <ol>
           {todos}
         </ol>
      </div>
    );
  }
  deleted(event,todo){
    todo.deleted=true
    this.setState(this.state)
  }
  toggle(event,todo){
    todo.status=todo.status==='completed'?'':'completed'
    this.setState(this.state)
  }
  changeTitle(event) {
    event.persist()
    this.setState((state,props)=>(
      {
      newTodo:event.target.value,
      todoList:state.todoList
    }))
  }
  addTodo(event){
    this.state.todoList.push({
      id:idMaker(),
      title:event.target.value,
      status:null,
      deleted:false
    })
    this.setState((state,props)=>({
      todoList:state.todoList,
      newTodo:''
    }))
  }

}

export default App;
let id=0
function idMaker(){
  id+=1
  return id
}