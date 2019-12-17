//添加用户
$('#userForm').on('submit', function () {
    //serialize()方法是获取from所有数据并且转换键值对形式
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function (response) {
            console.log(1);
            location.reload();
        },
        error: function (err) {
            var res = JSON.parse(err.responseText)
            alert(res.message);
        }
    });
    return false;
})

//头像上传
$('#modifyBox').on('change', '#avatar', function () {
    var formData = new FormData();
    //formData增加一个avatar属性，属性值是文件的信息
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);
            //attr更改图片的src属性
            $('#preview').attr('src', response[0].avatar);
            //将avatar的值放在隐藏域中
            $('#hiddenAvatar').val(response[0].avatar);
        }
    });
})

$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        var html = template('userTpl', { data: response });
        $('#userBox').html(html);
    }
});
//用户列表展示
$('#userBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: "get",
        url: "/users/" + id,
        success: function (response) {
            console.log(response);
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    });
})
//修改用户
$('#modifyBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
})
//删除用户
$('#userBox').on('click', '.del', function () {
    if (confirm('真的要删除吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success: function (response) {
                console.log(response);
                location.reload();
            }
        });
    }
})
//批量删除
//获取全选按钮
var selectAll=$('#selectAll');
var deleteMany=$('#deleteMany')
selectAll.on('change',function(){
    var status=$(this).prop('checked');
    if(status){
        deleteMany.show();
    }else{
        deleteMany.hide();
    }
    $('#userBox').find('input').prop('checked',status);
});

$('#userBox').on('change','.userStatus',function(){
    var inputs=$('#userBox').find('input');
    if(inputs.length==inputs.filter(':checked').length){
        selectAll.prop('checked',true);
    }else {
        selectAll.prop('checked',false);
    }
    if(inputs.filter(':checked').length>0){
        deleteMany.show();
    }else{
        deleteMany.hide();
    }
});

deleteMany.on('click', function () {
	var ids = [];
	// 获取选中的用户
	var checkedUser = $('#userBox').find('input').filter(':checked');
	// 循环复选框 从复选框元素的身上获取data-id属性的值
	checkedUser.each(function (index, element) {
		ids.push($(element).attr('data-id'));
	});
    console.log(ids);
    
	if (confirm('您真要确定要进行批量删除操作吗')) {
		$.ajax({
			type: 'delete',
			url: '/users/' + ids.join('-'),
			success: function () {
				location.reload();
			}
		})
	}
});
