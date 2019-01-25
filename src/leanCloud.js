import AV from 'leancloud-storage'
var APP_ID = '7V1qrQMDVqIIFev68DcU5Rh6-gzGzoHsz';
var APP_KEY = 'Lv2t4Lax2ayIg0Rsmc7Gna7M';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV
export function signUp(userName,passWord,Email,successFn,errorFn){
  let user = new AV.User()
  if (!userName) {
    alert('没有提供用户名，或者用户名为空')
  } else if (!passWord) {
    alert('没有提供密码，或者密码为空')
  } else {
    user.setUsername(userName)
    user.setPassword(passWord)
    user.setEmail(Email)
    user.signUp().then(function (loggedInUser) {
        let user=getUserForm(loggedInUser)
        successFn.call(null,user) 
    },function (error) {
        errorFn.call(null,error)
    })
    return undefined
  }
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
  let currentUser = AV.User.current();
  if (currentUser) {
     return getUserForm(currentUser)
  }
  else {
    return null;
  }
}

export function findPassWord(Email,errorFn){
  AV.User.requestPasswordReset(Email).then(function (success) {
    alert('已发送重置密码的邮件至邮箱，请查收！~')
  }, function (error) {
    errorFn.call(null,error)
  });
}

export const TodoModel={
  SaveData(userList,{title,status,deleted},successFn){
    let TodoFolder = AV.Object.extend(userList);
    let todoFolder = new TodoFolder();
    todoFolder.set('title',title);
    todoFolder.set('status',status);
    todoFolder.set('deleted',deleted);
    todoFolder.save().then(function (todo) {
      successFn.call(null,todo.id)
      console.log('保存成功')
    }, function (error) {
      console.log('保存失败')
      console.log(error)
    });
  },
  ModifyData(userList,id,key,value){
    let todo = AV.Object.createWithoutData(userList, id);
    todo.set(key, value);
    todo.save();
  },
  FetchData(userName,successFn){ 
    let query = new AV.Query(userName);
    query.find().then(function (todo) {
      let toggleAll=true
      let array=todo.map((item)=>{
        if (item.attributes.status==='completed') {
          toggleAll=false
        }
        return {
          id:item.id,
          status:item.attributes.status,
          deleted:item.attributes.deleted,
          title:item.attributes.title
        }
      })
      successFn.call(null,array,toggleAll)
    }, function (error) {
      console.log(error)
    });
  },
  clearList(userName,successFn){
    let query = new AV.Query(userName);
    query.find().then(function (todo) {
      AV.Object.destroyAll(todo).then(function () {
        // 成功
        successFn()
        console.log('清空成功')
      }, function (error) {
        // 异常处理
      });
    }, function (error) {
      console.log(error)
    });
  }
}
function getUserForm(AVUser) {
  return {
    id:AVUser.id,
    userName:AVUser.attributes.username,
    Email:AVUser.attributes.email
  }
}