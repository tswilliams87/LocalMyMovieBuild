
$(document).ready(function(){
	$('.deleteUser').on('click', deleteUser)

	



});
function deleteUser(){

	var confirmation = confirm('Are you Sure?')

	if(confirmation){

		$.ajax({
			type:'DELETE',
			url:'/users/delete/' +$(this).data('id')
		}).done(function(res){
				window.location.replace('/')


		})
	}else{
		return false
	}

}