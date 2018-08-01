import React,{Component} from 'react'
import {signUp} from './leanCloud'
export default class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state={
            selected:'signUp',
            formDate:{
                userName:'',
                passWord:'',
                mail:''
            }
        }
    }
    toSignUp(e){
        e.preventDefault()
        let {userName,passWord,mail}=this.state.formDate
        let success=(user)=>{
            this.props.onSignUp.call(null,user)
        }
        let error=(error)=>{
            console.log(error)
        }
        signUp(userName,passWord,mail,success,error)
    }
    toSignIn(e){}
    changeFormDate(key,event){
        let stateCopy=JSON.parse(JSON.stringify(this.state))
        stateCopy.formDate[key]=event.target.value
        this.setState(stateCopy)
    }
    switch(e){
        e.persist()
        this.setState((state,props)=>({
            selected:e.target.value
        }))
    }
    render(){
        let signUpForm=(
            <form className="signUp" onSubmit={this.toSignUp.bind(this)}>
                <div className="row">
                    <label>邮箱<input type="text" value={this.state.formDate.mail}
                    onChange={this.changeFormDate.bind(this,'mail')}/></label>
                </div>
                <div className="row">
                    <label>用户名<input type="text" value={this.state.formDate.userName}
                    onChange={this.changeFormDate.bind(this,'userName')}/></label>
                </div>
                <div className="row">
                    <label>密码<input type="password" value={this.state.formDate.passWord}
                    onChange={this.changeFormDate.bind(this,'passWord')}/></label>
                </div>
                <div className="row actions">
                    <button type="submit">注册</button>
                </div>
            </form>
        )
        let signInForm=(
            <form className="signIn" onSubmit={this.toSignIn.bind(this)}>
                <div className="row">
                    <label>用户名<input type="text" value={this.state.formDate.userName}
                    onChange={this.changeFormDate.bind(this,'userName')}/></label>
                </div>
                <div className="row">
                    <label>密码<input type="password" value={this.state.formDate.passWord}
                    onChange={this.changeFormDate.bind(this,'passWord')}/></label>
                </div>
                <div className="row actions">
                    <button type="submit">登录</button>
                </div>
            </form>
        )
        return(
        <div className="UserDialog-Wrapper">
            <div className="UserDialog">
                <nav>
                    <label><input type="radio" value="signUp" onChange={this.switch.bind(this)} checked={this.state.selected==='signUp'}/>注册</label>
                    <label><input type="radio" value="signIn" onChange={this.switch.bind(this)} checked={this.state.selected==='signIn'}/>登录</label>
                </nav>
                <div className="panes">
                    {this.state.selected==='signUp'?signUpForm:null}
                    {this.state.selected==='signIn'?signInForm:null}
                </div>
            </div>
        </div>
        )
    }
}