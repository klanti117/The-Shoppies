$(document).ready(function(){
    var apiKey="19ae373a"
    $("#movieForm").submit(function(event){
        event.preventDefault()

        var movie=$("#movie").val()
        var result=""
        var url="http://www.omdbapi.com/?apikey="+apiKey+"&type=movie"
// type=movie is hard coded into the url, as the requirements only asks for movies in the return result            
        $.ajax({
            type: 'GET',
            url: url + "&s=" + movie,
            dataType: "JSON",
            data: JSON.stringify({}),
            success: function (data) {
                console.log(data)
                let movies = data.Search; //this puts the array of objs into the variable
                $.each(movies, (index, movie) => {
                    result += `
                        <li>${movie.Title} (${movie.Year})
                            <button class="nominateBtn">Nominate</button>
                        </li>
                    `;
                });
                $('.result_ul').html(result);
            }
        });
    })        
})
//check off specific todos by clicking
$(".result_ul").on("click",".nominateBtn",function(event){
//grabbing movie data
    var movieData= $(this).parent().text();
    $(this).attr("disabled", true);
//li count 
    var nomination_length=$(".nomination_ul li").length;
    if(nomination_length<6){
//append it to nominate's ul
        $(".nomination_ul").append('<li class="nomination_li">'+movieData+'<button class="removeBtn" >Remove</button></li>')
    }else{
        alert("can not add to nomination list anymore")
    }
    event.stopPropagation();
});
$(".nomination_ul").on("click", ".removeBtn", function(event){
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    })
    event.stopPropagation();
});