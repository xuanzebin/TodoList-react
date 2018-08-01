import React,{Component} from 'react'
import {signUp,signIn} from './leanCloud'
import './UserDialog.css'
export default class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state={
            selected:'signUp',
            formDate:{
                userName:'',
                passWord:'',
                Email:''
            }
        }
    }
    toSignUp(e){
        e.preventDefault()
        let {userName,passWord,Email}=this.state.formDate
        let success=(user)=>{
            this.props.onSignUpOrOnSignIn.call(null,user)
        }
        let error=(error)=>{ 
            switch(error.code){
                case 202:
                alert('用户名已被占用')
                break
                case 125:
                alert('请输入正确的邮箱地址')
                break
                case 200:
                alert('没有提供用户名，或者用户名为空')
                break
                default:
                alert(error)
                alert(error.code)
                break
            }
        }
        signUp(userName,passWord,Email,success,error)
    }
    toSignIn(e){
        e.preventDefault()
        let {userName,passWord}=this.state.formDate
        let success=(user)=>{
            this.props.onSignUpOrOnSignIn.call(null,user)
        }
        let error=(error)=>{
            switch(error.code){
                case 502:
                alert('服务器维护中')
                break
                case 210:
                alert('用户名与密码不匹配')
                break
                case 211:
                alert('该用户名未注册')
                break 
                default:
                alert(error)
                alert(error.code)
                break
            }
        }
        signIn(userName,passWord,success,error)
    }
    changeFormDate(key,event){
        let stateCopy=copyState(this.state)
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
                    onChange={this.changeFormDate.bind(this,'Email')}/></label>
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

function copyState(state){
    return JSON.parse(JSON.stringify(state))
}