$(function () {
    //1.文章类别列表展示
    initArtCateList();
    //封装函数
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                console.log(res);
                var str = template('tpl-table', res);
                $('tbody').html(str)
            }
        });
    }
    // 显示添加区域
    var layer = layui.layer
    $('#btnAddCate').on('click', function () {
        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })
    // 3.提交文章分类添加（事件委托）
    var indexAdd = null;
    $('body').on('submit', "#form-add", function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.atatus !== 0) {
                    return layer.msg(res.message)
                }
                // 添加成功，重新渲染页面数据
                initArtCateList();
                layer.msg('恭喜您，文章类别添加成功！');
                layer.close(indexAdd)

            }
        });
    })
    //4.显示修改form表单
    var indexEdit = null;
    var form=layui. form 
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        //4.2 获取ID ，发送ajax获取数据渲染
        var Id = $(this).attr('data-id');
        //alert(Id);
        $.ajax({
            method: "GET",
            url: '/my/article/cates/' + Id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        });
    })
    // 4.修改——提交
    $('body').on('submit','#form-edit',function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('res.message')
        }
        layer.msg('恭喜您，文章类别更新成功！')
        layer.close(indexEdit)
        initArtCateList()
      }
        });
    })
    // 通过代理的形式，为删除按钮绑定点击事件
  $('tbody').on('click', '.btn-delete', function() {
    var Id = $(this).attr('data-id')
    // 提示用户是否要删除
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + Id,
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('res.message')
          }
          layer.msg('恭喜您，文章类别删除成功！')
          layer.close(index)
          initArtCateList()
        }
      })
    })
  })


})