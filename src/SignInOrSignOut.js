import React,{Component} from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
export default class SignInOrSignOut extends Component{
    constructor(props){
        super(props)
        this.state={
            selected:'signUp'
        }
    }
    switch(e){
        e.persist()
        this.setState((state,props)=>({
            selected:e.target.value
        }))
    }
    render(){
        return (
            <div className="signInOrSignOut">
                <nav>
                    <label><input type="radio" value="signUp" onChange={this.switch.bind(this)} checked={this.state.selected==='signUp'}/>注册</label>
                    <label><input type="radio" value="signIn" onChange={this.switch.bind(this)} checked={this.state.selected==='signIn'}/>登录</label>
                    <label><a value="toReset" onClick={this.props.resetSwitch.bind(this)}>找回密码</a></label>
                </nav>
                <div className="panes">
                    {this.state.selected==='signUp'?
                    <SignUpForm onSubmit={this.props.toSignUp}
                    changeFormDate={this.props.changeFormDate}
                    formDate={this.props.formDate} />:null}
                    {this.state.selected==='signIn'?
                    <SignInForm onSubmit={this.props.toSignIn}
                    changeFormDate={this.props.changeFormDate}
                    formDate={this.props.formDate} />:null}
                </div>
            </div>
        )
    }
}