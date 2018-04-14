"use strict";
let card_list = []


$(function(){
    $('#fileSelector').change(function(evt){
        card_list = []
        let files = evt.target.files;
        for(let i = 0; i < files.length; ++i){
            console.log(files[i].name);
            card_list.push(files[i].name);
        }

    });

    $('#renderBtn').click(function() {
        console.log(card_list);
        if(card_list.length!= 0){
            let chosen_card = Math.floor(Math.random() * card_list.length);
            console.log(chosen_card);
            $('#chosenPic').attr('src', 'pic/' + card_list[chosen_card]);
            
        }else{
            console.error("No picture!!");
            $('#chosenPic').attr('src', 'question.png');
        }
    });
});