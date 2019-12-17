$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html=template('categoryListTpl',{data:response});
        $('#categoryBox').html(html)
    }
});

$('#addCategory').on('submit',function(){
    var formData=$(this).serialize();
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    return false;
});

// 为编辑按钮添加点击事件
$('#categoryBox').on('click','.edit',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        type: "get",
        url: "/categories/"+id,
        success: function (response) {
            var html =template('modifyCategoryTpl',response);
            $('#fromBox').html(html);
        }
    });
})

// 当修改分类数据表单发生提交行为的时候
$('#fromBox').on('submit','#modifyCategory',function(){
    var formData=$(this).serialize();
    var id=$(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/categories/"+id,
        data:formData,
        success: function (response) {
            location.reload();
        }
    });
    return false;
})


$('#categoryBox').on('click','.del',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        type: "delete",
        url: "/categories/"+id,
        success: function (response) {
            location.reload();
        }
    });
})

function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}