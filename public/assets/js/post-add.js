//向服务器发送请求，获取文章分类数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        // console.log(response);
        var html = template('selecetTpl',{data:response});
        // console.log(html);
        $('#category').html(html);
    }
});
//选择头像的时候触法事件
$('#parentBox').on('change','#feature',function(){
    var file=this.files[0];
    var formData=new FormData();
    formData.append('cover',file);
    $.ajax({
        type: "post",
        url: "/upload",
        data:formData,
        processData:false,
        contentType:false,
        success: function (response) {
            console.log(response);           
            $('#thumbnail').val(response[0].cover)
        }
    });
});

//文章表单提交的时候触发事件
$('#addForm').on('submit',function(){
    var formData=$(this).serialize();
    // console.log(formData);
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function (response) {
            // console.log(response);           
            location.href='/admin/posts.html'
        }
    });
    return false;
})
//根据是否有ID跳转编辑文章界面及渲染编辑文章界面
var id=getUrlParams('id');
if(id!=-1){
    $.ajax({
        type: "get",
        url: "/posts/"+id,
        success: function (response) {
            $.ajax({
                type: "get",
                url: "/categories",
                success: function (categories) {
                    response.categories=categories;              
                    var html=template('modifyTpl',response);
                    $('#parentBox').html(html);
                }
            });
        }
    });
}
//获取url的id值
function getUrlParams(name){
    // console.log(location.search.substr(1));
    var paramsAry=location.search.substr(1).split('&');
    for(var i=0;i<paramsAry.length;i++){
        var tmp=paramsAry[i].split('=');
        if(tmp[0]==name){
            return tmp[1];   
        }
    }
    return -1;
}


$('#parentBox').on('submit', '#modifyForm', function () {
	var formData = $(this).serialize()
	var id = $(this).attr('data-id');
	$.ajax({
		type: 'put',
		url: '/posts/' + id,
		data: formData,
		success: function () {
			location.href = '/admin/posts.html';
		}
	})
	// 阻止表单默认提交行为
	return false;
});
