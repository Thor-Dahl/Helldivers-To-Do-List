$(".list-container-ongoing").sortable({
    placeholder: "sort-placeholder", 
    axis: "y",
    update: function(event, ui) {
        var order = $(this).sortable( "toArray" );
    }
});

$(".list-container-accomplished").sortable({
    placeholder: "sort-placeholder", 
    axis: "y",
    update: function(event, ui) {
        var order = $(this).sortable( "toArray" );
    }
});