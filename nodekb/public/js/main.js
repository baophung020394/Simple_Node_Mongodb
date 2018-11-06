$(document).ready(function(){
    $('.delete-article').on('click', function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        const name = $('.title-article').text();
        $.ajax({
            type:'DELETE',
            url:'/articles/' + id,
            success: function(response) {
                alert('Deleting Article ' + name);
                window.location.href='/';
            },
            errors: function(err) {
                console.log(err);
            }
        });
    })
    
});