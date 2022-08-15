console.log('JS sourced.');

$(document).ready(onReady);

function onReady(){
    // set up click listeners
    $('#add-task-button').on('click', sendTaskToServer);
    // on page load request list of tasks
    getTasks();
}


function sendTaskToServer(){

}


function getTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log(response);
        $('#task-list').empty();
        for (let i=0; i<response.length; i++){
            let tasks = response[i];
            $('#task-list').append(`
            <p>${tasks.id}
            ${tasks.task}
            ${tasks.complete}</p>
            `);
        }
    }).catch(function (error) {
        console.log(error);
        alert('Something went wrong!');
    });
};