$(".list-container-accomplished").droppable({
    hoverClass: "highlight",
    drop: function(event, ui) {
        let droppedItem = ui.draggable;
        $(this).append(droppedItem);
    }
})

$(".list-container-ongoing").sortable({
    placeholder: "sort-placeholder", 
    axis: "y",
    update: function(event, ui) {
        var order = $( this ).sortable( "toArray" );
    }
});