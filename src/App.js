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
      todoList:[
        {id:1,title:'test1'},
        {id:2,title:'test2'}
      ],
      newTodo:'test'
    }
  }
  render() {
    let todos=this.state.todoList.map((item,index)=>{
      return (
        <li>
          <TodoItem todo={item}/>
        </li>
      )
    })
    return (
      <div className="App">
         <h1>我的代办</h1>
         <div className="inputWrapper">
            <TodoInput content={this.state.newTodo}/>
         </div>
         <ol>
           {todos}
         </ol>
      </div>
    );
  }
}

export default App;
