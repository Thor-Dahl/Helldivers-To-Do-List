flatpickr("#date-deadline", {
    enableTime: false,
    dateFormat: "Y-m-d"
});

flatpickr("#time-deadline", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i"
});

function updateCount() {
    let ongoingCount = $(".list-container-ongoing").find(".list-item").length;
    let accomplishedCount = $(".list-container-accomplished").find(".list-item").length;
    let totalCount = ongoingCount + accomplishedCount;

    $("#ongoing-count").text(`${ongoingCount} / ${totalCount} ONGOING`);
    $("#accomplished-count").text(`${accomplishedCount} / ${totalCount} ACCOMPLISHED`);
}

/* Add list item when clicked add item button */
$("#button-submit").click(function() {
    const priorityText = $("#priority option:selected").text();
    const priorityVal = $("#priority").val();
    let id = $(".list-item").length + 1;
    const title = $("#add-item-text").val().trim();
    const description = $("#add-item-description").val().trim();

    /* DATES & DEADLINES */
    const now = new Date();
    const deadlineDate = new Date($("#date-deadline").val() + "T" + $("#time-deadline").val() + ":00");
    const formattedDeadlineDate = deadlineDate.toLocaleDateString("en-US", { month: "short", day: "numeric", });

    const dateDiff = deadlineDate.getTime() - now.getTime();
    const hoursUntilDeadline = Math.floor(dateDiff / (1000 * 60 * 60));
    const daysUntilDeadline = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
    const weeksUntilDeadline = Math.floor(daysUntilDeadline / 7);

    let deadlineWarning;
    if (daysUntilDeadline < 0)        { deadlineWarning = "FAILED"; }
    else if (hoursUntilDeadline < 24) { deadlineWarning = `DUE IN ${hoursUntilDeadline}H`; }
    else if (daysUntilDeadline < 2)   { deadlineWarning = "DUE TOMORROW"; }
    else if (daysUntilDeadline < 7)   { deadlineWarning = `DUE IN ${daysUntilDeadline} DAYS`; }
    else if (weeksUntilDeadline < 2)  { deadlineWarning = "DUE IN 1 WEEK"; }
    else                              { deadlineWarning = `DUE IN ${weeksUntilDeadline} WEEKS`; }

    if (title === "") {
        return;
    }

    const $item = $(`
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-header">
                    <input type="checkbox" id="${id}">
                    <label for="${id}" class="list-item-title">${title}</label>
                    <span class="list-item-deadline">${deadlineWarning} - ${formattedDeadlineDate}</span>
                </div>
                <div class="list-item-body">
                    <p>${description}</p>
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
    $item.draggable({
        helper: "clone",
        revert: "invalid",
        axis: "y",
        appendTo: "body",
        start: function(event, ui) {
            ui.helper.css("z-index", 9999);
        }
    });
    $(".list-container-ongoing").append($item);

    updateCount();

    $("#add-item-text").val("");
    $("#add-item-description").val("");
    $("#priority").val("PRIORITY");
})

/* Move list item depending on checkbox */
const ITEM_MOVE_DURATION = 220;

function playListItemAnimation($item, animationName) {
    $item.css("animation", "none");
    void $item[0].offsetWidth;
    $item.css("animation", `${animationName} ${ITEM_MOVE_DURATION}ms ease forwards`);
}

$(".main-container").on("change", ".list-item input[type='checkbox']", function() {
    const listItem = $(this).closest(".list-item");
    const isChecked = $(this).prop("checked");

    listItem.css("pointer-events", "none");

    if (isChecked) {                                   //Mark as accomplished
        playListItemAnimation(listItem, "fadeOutDown");
        setTimeout(() => {
            $(".list-container-accomplished").append(listItem);
            listItem.addClass("accomplished");
            playListItemAnimation(listItem, "fadeInUpDone");
            updateCount();
            setTimeout(() => {
                listItem.css("animation", "");
                listItem.css("pointer-events", "");
            }, ITEM_MOVE_DURATION);
        }, ITEM_MOVE_DURATION);
    } else {                                           //Mark as ongoing
        playListItemAnimation(listItem, "fadeOutUp");
        setTimeout(function() {
            $(".list-container-ongoing").append(listItem);
            listItem.removeClass("accomplished");
            playListItemAnimation(listItem, "fadeInDown");
            updateCount();
            setTimeout(() => {
                listItem.css("animation", "");
                listItem.css("pointer-events", "");
            }, ITEM_MOVE_DURATION);
        }, ITEM_MOVE_DURATION);
    }
})

/* Remove list item when deleted */
$(".main-container").on("click", ".delete-list-option", function() { 
    $(this).closest(".list-item").remove(); 
    updateCount();
})


$(".list-container-accomplished").droppable({
    hoverClass: "highlight",
    drop: function(event, ui) {
        let droppedItem = ui.draggable;
        $(this).append(droppedItem);
    }
})