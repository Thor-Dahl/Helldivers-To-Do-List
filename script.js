flatpickr("#date-deadline", {
    enableTime: false,
    dateFormat: "Y-m-d"
});
flatpickr("#time-deadline", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i"
});

/* Add list item when clicked add item button */
$("#button-submit").click(function() {
    const priorityText = $("#priority option:selected").text();
    const priorityVal = $("#priority").val();
    let id = $(".list-item").length + 1;
    const text = $("#add-item-text").val().trim();

    /* DEADLINES */
    let deadlineWarning;
    const now = new Date();
    const deadlineDate = new Date($("#date-deadline").val() + "T" + $("#time-deadline").val() + ":00");
    const formattedDeadlineDate = deadlineDate.toLocaleDateString("en-US", 
        {
            month: "short", 
            day: "numeric", 
        }
    );
    const dateDiff = (deadlineDate.getTime() - now.getTime());
    const hoursUntilDeadline = Math.floor(dateDiff / (1000 * 60 * 60));
    const daysUntilDeadline = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
    const weeksUntilDeadline = Math.floor(daysUntilDeadline / 7);

    if (daysUntilDeadline < 0)        { deadlineWarning = "FAILED"; }
    else if (hoursUntilDeadline < 24) { deadlineWarning = `DUE IN ${hoursUntilDeadline}H`; }
    else if (daysUntilDeadline < 2)   { deadlineWarning = "DUE TOMORROW"; }
    else if (daysUntilDeadline < 7)   { deadlineWarning = `DUE IN ${daysUntilDeadline} DAYS`; }
    else if (weeksUntilDeadline < 2)  { deadlineWarning = "DUE IN 1 WEEK"; }
    else                              { deadlineWarning = `DUE IN ${weeksUntilDeadline} WEEKS`; }

    const $item = $(`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-header">
                    <input type="checkbox" id="${id}">
                    <label for="${id}" class="list-item-title">${text}</label>
                    <span class="list-item-deadline">${deadlineWarning} - ${formattedDeadlineDate}</span>
                </div>
                <div class="list-item-body">
                    <p>Update all production servers with the latest vulnerability fix before the deadline window closes at end of day.</p>
                </div>
                <div class="list-item-priority">
                    <span>${priorityText} PRIORITY</span>
                </div>
            </div>
            <div class="list-item-options">
                <span class="material-symbols-outlined drag-indicator-list-option">drag_indicator</span>
                <span class="material-symbols-outlined delete-list-option">delete</span>
                <span class="material-symbols-outlined edit-list-option">edit</span>
            </div>
        </div>
    `);

    $item.find(".list-item-priority").addClass(`${priorityVal}-priority`);
    $(".list-container-ongoing").append($item);
})

/* Move list item depending on checkbox */
$(".main-container").on("change", ".list-item input[type='checkbox']", function() {
    const listItem = $(this).closest(".list-item");
    const isChecked = $(this).prop("checked");
    if (isChecked) {
        $(".list-container-accomplished").append(listItem);
        listItem.addClass("accomplished");
    } else {
        $(".list-container-ongoing").append(listItem);
        listItem.removeClass("accomplished");
    }
})

$(".main-container").on("click", ".delete-list-option", function() { 
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