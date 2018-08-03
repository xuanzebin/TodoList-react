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
        let stateCopy=copyState(this.state)
        stateCopy.todoList=array
        this.setState(stateCopy)
      })
    }
  }
  loadUserList(){
    let getUser=getCurrentUser()
    if (getUser) {
      console.log(encodeUnicode(getUser['userName']))
      TodoModel.FetchData(encodeUnicode(getUser['userName']),(array)=>{
        let stateCopy=copyState(this.state)
        stateCopy.todoList=array
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
    TodoModel.ModifyData(userName,todo.id,'deleted',true)
  }
  toggle(event,todo){
    let user=getCurrentUser()
    let userName=encodeUnicode(user['userName']) 
    todo.status=todo.status==='completed'?'':'completed'
    this.setState(this.state)
    TodoModel.ModifyData(userName,todo.id,'status',todo.status)
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
      status:'',
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
         <h2>{this.state.user.userName||'我'}的待办小白板 {this.state.user?
         <button onClick={this.toSignOut.bind(this)}><div className="individuaCenter"></div></button>:null}</h2>
         <div className="inputWrapper">
            <TodoInput content={this.state.newTodo} 
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)} />
         </div>
         <div className="foreWord">LET'S GET SHIT DONE!</div>
         <ol className="todoList">
           {todos}
         </ol>
         {this.state.user.id ? null:<UserDialog onSignUpOrOnSignIn={this.onSignUpOrOnSignIn.bind(this)}
         loadUserList={this.loadUserList.bind(this)}/>}
      </div>
    );
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