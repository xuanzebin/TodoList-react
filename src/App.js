import React, { Component } from 'react'
import './App.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import './reset.css'
import UserDialog from './UserDialog'
import {getCurrentUser,signOut} from './leanCloud'
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      user:getCurrentUser()||{},
      todoList:[{
        id:0,
        title:'吃饭',
        status:null,
        deleted:false
      },
      {
        id:2,
        title:'洗脸',
        status:null,
        deleted:false
      },
      {
        id:3,
        title:'睡觉',
        status:null,
        deleted:false
      }],
      newTodo:''
    }
  }
  render() {
    let todos=this.state.todoList.filter((item,index)=>{return !item.deleted}).map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDeleted={this.deleted.bind(this)}/>
        </li>
      )
    })
    console.log(this.state.todoList)
    console.log(this.state)
    return (
      <div className="App">
         <h1>{this.state.user.userName||'阿屁'}一天要做的事情 {this.state.user?<button onClick={this.toSignOut.bind(this)}>登出</button>:null}</h1>
         
         <div className="inputWrapper">
            <TodoInput content={this.state.newTodo} 
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)} />
         </div>
         <ol className="todoList">
           {todos}
         </ol>
         {this.state.user.id ? null:<UserDialog onSignUpOrOnSignIn={this.onSignUpOrOnSignIn.bind(this)}/>}
      </div>
    );
  }
  toSignOut(event){
    signOut()
    let stateCopy=copyState(this.state)
    stateCopy.user={}
    this.setState(stateCopy)
  }
  onSignUpOrOnSignIn(user){
    let stateCopy=copyState(this.state)
    stateCopy.user=user
    this.setState(stateCopy)
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
let id=2
function idMaker(){
  id+=1
  return id
}
function copyState(state){
    return JSON.parse(JSON.stringify(state))
}