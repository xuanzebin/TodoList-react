import AV from 'leancloud-storage'
var APP_ID = '7V1qrQMDVqIIFev68DcU5Rh6-gzGzoHsz';
var APP_KEY = 'Lv2t4Lax2ayIg0Rsmc7Gna7M';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV
export function signUp(userName,passWord,Email,successFn,errorFn){
  var user = new AV.User();
  // if (!userName) {
  //   alert('没有提供用户名，或者用户名为空')
  // } else if (!passWord) {
  //   alert('没有提供密码，或者密码为空')
  // } else {
    user.setUsername(userName);
    user.setPassword(passWord);
    user.setEmail(Email);
    user.signUp().then(function (loggedInUser) {
        let user=getUserForm(loggedInUser)
        alert('注册成功')
        successFn.call(null,user) 
    }, function (error) {
        errorFn.call(null,error)
        alert('注册失败')
    })
    return undefined
  // }
}
export function signIn(userName,passWord,successFn,errorFn){
  AV.User.logIn(userName, passWord).then(function (loggedInUser) {
    let user=getUserForm(loggedInUser)
    alert('登录成功')
    successFn.call(null,user) 
    return getUserForm(loggedInUser)
  }, function (error) {
      errorFn.call(null,error)
  });
}
export function signOut(){
  AV.User.logOut()
  return undefined
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





function getUserForm(AVUser) {
  return {
    id:AVUser.id,
    userName:AVUser.attributes.username,
    Email:AVUser.attributes.email
  }
}