import { updateCount } from "./ui.js";

$("#list-container-ongoing").sortable({
    items: ".list-item",
    placeholder: "sort-placeholder", 
    axis: "y",
    connectWith: ".list-container",
    receive: function(event, ui) {
        let listItem = ui.item;
        $(this).append(listItem);
        listItem.removeClass("accomplished");
        listItem.find("input[type='checkbox']").prop("checked", false);
        updateCount();
    }
});

$("#list-container-accomplished").sortable({
    items: ".list-item",
    placeholder: "sort-placeholder", 
    axis: "y",
    connectWith: ".list-container",
    receive: function(event, ui) {
        let listItem = ui.item;
        $(this).append(listItem);
        listItem.addClass("accomplished")
        listItem.find("input[type='checkbox']").prop("checked", true);
        updateCount();
    }
});