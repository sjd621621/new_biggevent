$(function () {
    //1.初始化分类
    var form = layui.form; // 导入form
    var layer = layui.layer // 导入layer
    initCate();
    //封装
    function initCate() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function (res) {
                // 校验
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 赋值渲染form
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 一定要记得调用 form.render() 方法
                form.render()
            }
        });
    }
    // 2.初始化文本编辑器
    initEditor()

    // 3.1初始化图片裁剪器
    var $image = $('#image')
    // 3.2裁剪选项
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 4为选择封面的按钮，绑定点击事件处理函数
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })
    //   5渲染文章封面
    $('#coverFile').on('change', function (e) {
        // 获取到文件的列表数组
        var files = e.target.files
        // 判断用户是否选择了文件
        if (files.length === 0) {
            return
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    // 6.设置状态
    var state = '已发布';
    $('#btnSave2').on('click', function () {
        state = '草稿';
    })
    // 7.发布文章
    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(this);
        // 添加状态
        fd.append('state', state);
        $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
        }).toBlob(function (blob) {
            // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            // 5. 将文件对象，存储到 fd 中
            fd.append('cover_img', blob);
            // 6. 发起 ajax 数据请求
            publishArticle(fd)
            console.log(...fd);
        })
    })
    // 8.封装发布文章ajax
    function publishArticle(fd) {
        $.ajax({
            method: "POST",
            url: '/my/article/add',
            data: fd,
            contentType:false,
            processData: false,
            success: function (res) {
                // 失败判断
                if(res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('恭喜您,发布文章成功!')
                // 跳转
                setTimeout(function() {
                    window.parent.document.getElementById('art_list').click();
                },1500)
            }
        });
    }





})