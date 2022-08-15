// const { noData } = require("pg-protocol/dist/messages");

console.log('JS sourced.');

$(document).ready(onReady);

function onReady(){
    // set up click listeners
    $('#add-task-button').on('click', sendTaskToServer);
    $('body').on('click', '.task-delete', deleteTask);
    // on page load request list of tasks
    getTasks();
}


function sendTaskToServer(){
    console.log('in sendTaskToServer');
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            task: $('#add-new-task').val(),
            complete: 'no',
        }
    }).then(function (response) {
        getTasks();
    }).catch(function (error) {
        console.log(error);
        alert('Something went wrong!');
    });
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
            <li>
            ${tasks.task}
            <button class="task-complete" data-id="${tasks.id}">Complete</button>
            <button class="task-delete" data-id="${tasks.id}">Delete</button>
            </li>
            `);
        }
    }).catch(function (error) {
        console.log(error);
        alert('Something went wrong!');
    });
};


function deleteTask(){
    const taskId = $(this).data('id');
    console.log('in deleteTask', taskId);
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskId}`
    }).then(function (response) {
        getTasks();
    }).catch(function (error) {
        console.log(error);
        alert('Something went wrong with deleteTask.');
    })
}