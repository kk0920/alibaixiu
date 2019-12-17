$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        var html=template('postsTpl',response);
        $('#postsBox').html(html);
        var page=template('pageTpl',response)
        $('#page').html(page);
    }
});

function formateDate(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
//分页
function changePage(page){
    $.ajax({
        type: "get",
        url: "/posts",
        data:{
            page:page
        },
        success: function (response) {
            var html=template('postsTpl',response);
            $('#postsBox').html(html);
            var page=template('pageTpl',response)
            $('#page').html(page);
        }
    }); 
}

$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html=template('categoryTpl',{data:response})
        
        $('#categoryBox').html(html);
    }
});

$('#filterForm').on('submit',function(){
    // alert(123)
    var formData=$(this).serialize();
    $.ajax({
        type: "get",
        url: "/posts",
        data:formData,
        success: function (response) {
            var html=template('postsTpl',response);
            $('#postsBox').html(html);
            var page=template('pageTpl',response)
            $('#page').html(page);
        }
    });
    return false;
})

//删除文章
$('#postsBox').on('click','.del',function(){
    if(confirm('您真的要进行删除操作吗')){
        var id=$(this).attr('data-id');
        // console.log($(this));
        $.ajax({
            type: "delete",
            url: "/posts/"+id,
            success: function (response) {
                location.reload();
            }
        });
    }

})

//修改文章

