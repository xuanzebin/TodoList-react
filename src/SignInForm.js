import React,{Component} from 'react'
export default class SignInForm extends Component{
    render(){
        return  (
            <form className="signIn" onSubmit={this.props.onSubmit.bind(this)}>
                <div className="row">
                    <label>用户名<input type="text" value={this.props.formDate.userName}
                    onChange={this.props.changeFormDate.bind(this,'userName')}/></label>
                </div>
                <div className="row">
                    <label>密码<input type="password" value={this.props.formDate.passWord}
                    onChange={this.props.changeFormDate.bind(this,'passWord')}/></label>
                </div>
                <div className="row actions">
                    <button type="submit">登录</button>
                </div>
            </form>
        )
    }
}
