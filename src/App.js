import React, { Component } from 'react'
import './App.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import './reset.css'
import UserDialog from './UserDialog'
import {getCurrentUser, signOut, TodoModel} from './leanCloud'
class App extends Component {
  constructor(props){
    let getUser=getCurrentUser()
    super(props)
    this.state={
      user:getUser||{},
      todoList:[],
      newTodo:''
    }
    if (getUser) {
      TodoModel.FetchData(encodeUnicode(getUser['userName']),(array)=>{
        // todoList
        let stateCopy=copyState(this.state)
        stateCopy.todoList=array
        this.setState(stateCopy)
      })
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
         {this.state.user.id ? null:<UserDialog onSignUpOrOnSignIn={this.onSignUpOrOnSignIn.bind(this)}
         loadUserList={this.loadUserList.bind(this)}/>}
      </div>
    );
  }
  loadUserList(){
    let getUser=getCurrentUser()
    if (getUser) {
      console.log(encodeUnicode(getUser['userName']))
      TodoModel.FetchData(encodeUnicode(getUser['userName']),(array)=>{
        let stateCopy=copyState(this.state)
        stateCopy.todoList=array
        console.log(stateCopy.todoList)
        this.setState(stateCopy)
      })
    }
  }
  toSignOut(event){
    signOut()
    let stateCopy=copyState(this.state)
    stateCopy.user={}
    stateCopy.todoList=[]
    this.setState(stateCopy)
  }
  onSignUpOrOnSignIn(user){
    let stateCopy=copyState(this.state)
    stateCopy.user=user
    this.setState(stateCopy)
  }
  deleted(event,todo){
    let user=getCurrentUser()
    let userName=encodeUnicode(user['userName']) 
    todo.deleted=true
    this.setState(this.state)
    console.log(userName)
    console.log(todo.id)
    TodoModel.ModifyData(userName,todo.id,'deleted',true)
  }
  toggle(event,todo){
    let user=getCurrentUser()
    let userName=encodeUnicode(user['userName']) 
    todo.status=todo.status==='completed'?'':'completed'
    this.setState(this.state)
    TodoModel.ModifyData(userName,todo.objectId,'status','completed')
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
    let options={
      title:event.target.value,
      status:null,
      deleted:false
    }
    let user=getCurrentUser()
    let userName=encodeUnicode(user['userName']) 
    TodoModel.SaveData(userName,options,(id)=>{
      options.id=id
      console.log(id)
      console.log(options)
    })
    this.state.todoList.push(options)
    this.setState((state,props)=>({
      todoList:state.todoList,
      newTodo:''
    }))
  }
}

export default App;
function copyState(state){
    return JSON.parse(JSON.stringify(state))
}
function encodeUnicode(str) {
  var res = [];
  for ( var i=0; i<str.length; i++ ) {
    res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);
  }
  return 'user'+res.join("space");
}