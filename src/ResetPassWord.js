import React,{Component} from 'react'
export default class ResetPassWord extends Component{
    render(){
        return (
            <div className="forgotPassword">
                <form className="resetPassWord" onSubmit={this.props.onSubmit.bind(this)}>
                    <h3>重置密码<a value="signIn" onClick={this.props.resetSwitch.bind(this)}>返回</a></h3>
                    <div className="row">
                        <label>邮箱地址<input type="text" value={this.props.formDate.Email}
                        onChange={this.props.changeFormDate.bind(this,'Email')}/></label>
                    </div>
                    <div className="row actions">
                        <button type="submit">重置</button>
                    </div>
                </form>
            </div>
        )
    }
}