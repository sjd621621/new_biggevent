// $(function () {
//     // 获取用户信息，并渲染用户名和头像
//     getUserInfo();

//     //退出
//     var layer =layui.layer;
//     $('#btnLogout').on('click',function () {
//         //询问框
//         layer.confirm('是否确认退出？',{icon:3, title: '提示'},function (index) {
//             //1.清空询问框
//             localStorage.removeItem('token');
//             //2页面跳转
//             location.href = '/login.html';
//             //3.关闭询问框
//             layer.close(index)
//         } )
//       })
// })


// // 封装到入口函数的外面，获取信息
// // 原因：后面其他函数调用
// function getUserInfo() {
//     // 发送ajax
//     $.ajax({
//         method:'GET',
//         url: "/my/userinfo",
//         // headers: {
//         //     Authorization:localStorage.getItem('token') || ''
//         // },
//         success: function (res) {
//             console.log(res);
//             if(res.msg !== 0) {
//                 return layui.layer.msg(res.message);
//             }
//             // 请求成功，渲染头像
//             renderAvatar(res.data);
            
//         }
//     });
// }

// // function renderAvatar (user) {
// //     // 1.渲染名称（nickname优先，如果没有，就用username）
// //     var name = user.nickname || user.username;
// //     $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
// //     // 2.渲染头像
// //     if(user.user_pic !== null) {
// //         // 有头像
// //         $('.layui-nav-img').show().attr('src',user.user_pic);
// //         $('.text-avatar').hide();
// //     } else {
// //         // 没有头像
// //         $('.layui-nav-img').hide();
// //         var text = name[0].toUpperCase();
// //         $('.text-avatar').show().html(text);
// //     }
// //   }



// // 渲染用户的头像
// function renderAvatar(user) {
//     // 1. 获取用户的名称
//     var name = user.nickname || user.username
//     // 2. 设置欢迎的文本
//     $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
//     // 3. 按需渲染用户的头像
//     if (user.user_pic !== null) {
//       // 3.1 渲染图片头像
//       $('.layui-nav-img')
//         .attr('src', user.user_pic)
//         .show()
//       $('.text-avatar').hide()
//     } else {
//       // 3.2 渲染文本头像
//       $('.layui-nav-img').hide()
//       var first = name[0].toUpperCase()
//       $('.text-avatar')
//         .html(first)
//         .show()
//     }
//   }

$(function() {
  // 调用 getUserInfo 获取用户基本信息
  getUserInfo()

  var layer = layui.layer

  // 点击按钮，实现退出功能
  $('#btnLogout').on('click', function() {
    // 提示用户是否确认退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
      //do something
      // 1. 清空本地存储中的 token
      localStorage.removeItem('token')
      // 2. 重新跳转到登录页面
      location.href = '/login.html'

      // 关闭 confirm 询问框
      layer.close(index)
    })
  })
})

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function(res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data)
    }
    // 不论成功还是失败，最终都会调用 complete 回调函数
    // complete: function(res) {
    //   // console.log('执行了 complete 回调：')
    //   // console.log(res)
    //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 1. 强制清空 token
    //     localStorage.removeItem('token')
    //     // 2. 强制跳转到登录页面
    //     location.href = '/login.html'
    //   }
    // }
  })
}

// 渲染用户的头像
function renderAvatar(user) {
  // 1. 获取用户的名称
  var name = user.nickname || user.username
  // 2. 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 3. 按需渲染用户的头像
  if (user.user_pic !== null) {
    // 3.1 渲染图片头像
    $('.layui-nav-img')
      .attr('src', user.user_pic)
      .show()
    $('.text-avatar').hide()
  } else {
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar')
      .html(first)
      .show()
  }
}

  