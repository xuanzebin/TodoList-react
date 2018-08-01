import AV from 'leancloud-storage'
var APP_ID = '7V1qrQMDVqIIFev68DcU5Rh6-gzGzoHsz';
var APP_KEY = 'Lv2t4Lax2ayIg0Rsmc7Gna7M';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV
export function signUp(userName,passWord,mail,successFn,errorFn){
  var user = new AV.User();
  // 设置用户名
  user.setUsername(userName);
  // 设置密码
  user.setPassword(passWord);
  // 设置邮箱
  user.setEmail(mail);
  user.signUp().then(function (loggedInUser) {
      let user=getUserForm(loggedInUser)
      alert('注册成功')
      successFn.call(null,user) 
  }, function (error) {
    alert('注册失败')
      errorFn.call(null,error)
  });
}
function getUserForm(AVUser) {
  return {
    id:AVUser.id,
    userName:AVUser.attributes.username,
    Email:AVUser.attributes.email
  }
}
export function getCurrentUser(){
  var currentUser = AV.User.current();
  if (currentUser) {
     return getUserForm(currentUser)
  }
  else {
    return null;
  }
}
export function signOut(){
  AV.User.logOut()
  return undefined
}
export function signIn(userName,passWord,successFn,errorFn){
  AV.User.logIn(userName, passWord).then(function (loggedInUser) {
    let user=getUserForm(loggedInUser)
    alert('登录成功')
    successFn.call(null,user) 
    return getUserForm(loggedInUser)
    console.log(loggedInUser);
  }, function (error) {
      alert('登录失败')
      errorFn.call(null,error)
  });
}