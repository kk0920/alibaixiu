$('#file').on('change',function(){
    console.dir(this);
    console.dir($(this))
    var file=this.files[0];
    var formData=new FormData();
    formData.append('image',file);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response);
            $('#image').val(response[0].image);
            $('#preview').attr('src',response[0].image).show();
        }
    });
})
$('#slidesForm').on('submit',function(){
    var formData=$(this).serialize();
    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    return false;
})

$.ajax({
	type: 'get',
	url: '/slides',
	success: function (response) {
		// console.log(response)
		var html = template('slidesTpl', {data: response});
		$('#slidesBox').html(html);
	}
})

$('#slidesBox').on('click','.delete',function(){
    if(confirm('您真的要进行删除操作吗')){
        var id=$(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: "/slides/"+id,
            success: function (response) {
                location.reload();
            }
        });
    }

})