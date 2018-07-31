import React,{Component} from 'react'
export default class UserDialog extends Component{
    render(){
        return(
        <div className="UserDialog-Wrapper">
            <div className="UserDialog">
                <nav>
                    <input type="radio"/>注册
                    <input type="radio"/>登录
                </nav>
                <div className="panes">
                    <form className="signUp">
                        <div className="row">
                            <label>邮箱<input type="text"/></label>
                        </div>
                        <div className="row">
                            <label>用户名<input type="text"/></label>
                        </div>
                        <div className="row">
                            <label>密码<input type="password"/></label>
                        </div>
                        <div className="row actions">
                            <button type="submit">注册</button>
                        </div>
                    </form>
                    <form className="signIn">
                        <div className="row">
                            <label>用户名<input type="text"/></label>
                        </div>
                        <div className="row">
                            <label>密码<input type="password"/></label>
                        </div>
                        <div className="row">
                            <button type="submit">登录</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}