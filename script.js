/* Add list item when clicked add item button */
var counter = 0;
$("#button-submit").click(function() {
    var priorityText = $("#priority option:selected").text();
    var priorityVal = $("#priority").val()
    let id = counter++;
    var text = $("#add-item-text").val().trim();

    var $item = $(`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-header">
                    <input type="checkbox" id="${id}">
                    <label for="${id}" id="list-item-title">${text}</label>
                    <span class="list-item-deadline">DUE TODAY</span>
                </div>
                <div class="list-item-body">
                    <p>Update all production servers with the latest vulnerability fix before the deadline window closes at end of day.</p>
                </div>
                <div class="list-item-priority">
                    <span>${priorityText} PRIORITY</span>
                </div>
            </div>
            <div class="list-item-options">
                <span class="material-symbols-outlined" id="drag_indicator_list_option">drag_indicator</span>
                <span class="material-symbols-outlined" id="delete_list_option">delete</span>
                <span class="material-symbols-outlined" id="edit_list_option">edit</span>
            </div>
        </div>
    `);

    if (priorityVal === 'high') {
        $item.find(".list-item-priority").addClass("high-priority");
    } 
    else if (priorityVal === 'medium') {
        $item.find(".list-item-priority").addClass("medium-priority");
    }
    else {
        $item.find(".list-item-priority").addClass("low-priority");
    }

    $(".list-container-ongoing").append($item);
})

/* Move list item depending on checkbox */
$(".main-container").on("change", ".list-item input[type='checkbox']", function() {
    var listItem = $(this).closest(".list-item");
    var isChecked = $(this).prop("checked");
    if (isChecked) {
        $(".list-container-accomplished").append(listItem);
        listItem.addClass("accomplished");
    } else {
        $(".list-container-ongoing").append(listItem);
        listItem.removeClass("accomplished");
    }
})

$(".main-container").on("click", "#delete_list_option", function() { 
    $(this).closest(".list-item").remove(); 
})



/*
selector.click(function(){}) - functions happens when clicking selector
selector.append('html_body') - appends html body as a direct child to selector
parent_selector.on('event_type', 'child_selector', 'function(){}') - when event_type happens on selector then run the function
selector.closest('selector') - finds the closest ancestor of the selected selector
selector.addClass('class_name') - adds class to selector
selector.removeClass('class_name') - removes class from selector
.val() - gets the value of an input element
.trim() - removes whitespace from both ends of a string
*/