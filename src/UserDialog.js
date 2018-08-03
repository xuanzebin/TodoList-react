import React,{Component} from 'react'
import {findPassWord} from './leanCloud'
import './UserDialog.css'
import SignInOrSignOut from './SignInOrSignOut'
import ResetPassWord from './ResetPassWord'
import {signUp,signIn} from './leanCloud'
export default class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state={
            selected:'signInOrSignUp',
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
    resetSwitch(e){
        e.preventDefault()
        e.persist()
        this.setState((state,props)=>({
            selected:e.target.attributes[0].value
        }))
    }
    toReset(e){
        e.persist()
        findPassWord(this.state.formDate.Email)
    }
    render(){
        return(
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selected==='toReset'?
                    <ResetPassWord onSubmit={this.toReset.bind(this)}
                    resetSwitch={this.resetSwitch.bind(this)}
                    formDate={this.state.formDate}
                    changeFormDate={this.changeFormDate.bind(this)}/>:
                    <SignInOrSignOut switch={this.switch.bind(this)}
                    selected={this.state.selected}
                    resetSwitch={this.resetSwitch.bind(this)}
                    formDate={this.state.formDate}
                    changeFormDate={this.changeFormDate.bind(this)}
                    toSignUp={this.toSignUp.bind(this)}
                    toSignIn={this.toSignIn.bind(this)} />}
                </div>
            </div>
        )
    }
}

function copyState(state){
    return JSON.parse(JSON.stringify(state))
}