import React, { Component } from 'react'
import './App.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import './reset.css'
import UserDialog from './UserDialog'
import {getCurrentUser, signOut, TodoModel} from './leanCloud'
import IndividuaCenter from './IndividuaCenter'
import './IndividuaCenter.css'
class App extends Component {
  constructor(props){
    let getUser=getCurrentUser()
    super(props)
    this.state={
      user:getUser||{},
      todoList:[],
      newTodo:'',
      individuaCenterShow:false
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
    })
    this.state.todoList.push(options)
    this.setState((state,props)=>({
      todoList:state.todoList,
      newTodo:''
    }))
  }
  toSignOut(event){
    signOut()
    // let stateCopy=copyState(this.state)
    // stateCopy.user={}
    // stateCopy.individuaCenterShow=false
    // stateCopy.todoList=[]
    // console.log(stateCopy)
    // console.log(this.state)  
    // this.setState(stateCopy)
    this.state.user={}
    this.state.individuaCenterShow=false
    this.state.todoList=[]
    this.setState(this.state)
  }
  individuaCentershow(e){
    console.log(e.target)
    e.stopPropagation()
    this.state.individuaCenterShow=this.state.individuaCenterShow?false:true
    console.log(33)
    this.setState(this.state)
  }
  individuaCenterClose(e){
    if(this.state.individuaCenterShow){
      console.log(44)
      this.state.individuaCenterShow=false
      this.setState(this.state)
    }
  }
  aboutMe(e){
    this.state.individuaCenterShow=false
    alert('若该应用有任何问题，欢迎邮件联系小屁:xuanzebin@126.com')
    this.setState(this.state)
  }
  render() {
    console.log('更新')
    console.log(2)
    console.log(this.state)
    let todos=this.state.todoList.filter((item,index)=>{return !item.deleted}).map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDeleted={this.deleted.bind(this)}/>
        </li>
      )
    })
    return (
      <div className="App" onClick={this.individuaCenterClose.bind(this)}>
         <h2>{this.state.user.userName||'我'}的待办小白板 
         <div className="individuaCenterWrapper" onClick={this.individuaCentershow.bind(this)}>
            <div className="individuaCenter">
                {this.state.individuaCenterShow?<IndividuaCenter onSubmit={this.toSignOut.bind(this)} 
                about={this.aboutMe.bind(this)}/>:null}
            </div>
         </div></h2>
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