const movie=document.getElementById("movie");
var searchMovie=""


$(document).ready(function(){
    var apiKey="19ae373a"
    // $("#movieForm").submit(function(event){
        movie.addEventListener('keyup',(e)=>{
            searchMovie=e.target.value;
            console.log(searchMovie)
            e.preventDefault()

        var movie=$("#movie").val()
        var result=""
        var url="http://www.omdbapi.com/?apikey="+apiKey+"&type=movie"
// type=movie is hard coded into the url, as the requirements only asks for movies in the return result            
        $.ajax({
            type: 'GET',
            url: url + "&s=" + searchMovie,
            dataType: "JSON",
            data: JSON.stringify({}),
            success: function (data) {
                // console.log(data)
                let movies = data.Search; //this puts the array of objs into the variable
                $.each(movies, (index, movie) => {
                    result += `
                        <li><i class="fas fa-video"></i>
                        ${movie.Title} (${movie.Year})
                            <button id="nominateBtn" class="Polaris-Button Polaris-Button--primary"
                                type="button"><span class="Polaris-Button__Content"><span
                                class="Polaris-Button__Text">Nominate</span></span></button>
                        </li>
                    `;
                });
                $('#result_ul').html(result);
            },
            error: function () {
                alert('error in btnTestProduceUsageSettings');
            }
        });
    })        
})
//check off specific todos by clicking
$("#result_ul").on("click","#nominateBtn",function(event){
//grabbing movie data
    var movieData= $(this).parent().text();
    $(this).attr("disabled", true);
//li count 
    var nomination_length=$("#nomination_ul li").length;
    if(nomination_length<6){
//append it to nominate's ul
        $("#nomination_ul").append('<li id="nomination_li"><i class="fas fa-star"></i>'+movieData+'<button id="removeBtn" class="Polaris-Button Polaris-Button--destructive" type="button"><span class="Polaris-Button__Content"><span class="Polaris-Button__Text">Remove</span></span></button></li>')
    }else{
        alert("can not add to nomination list anymore")
    }
    event.stopPropagation();
});
$("#nomination_ul").on("click", "#removeBtn", function(event){
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    })
    event.stopPropagation();
});