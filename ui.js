export function updateCount() {
    let ongoingCount = $("#list-container-ongoing").find(".list-item").length;
    let accomplishedCount = $("#list-container-accomplished").find(".list-item").length;
    let totalCount = ongoingCount + accomplishedCount;

    $("#ongoing-count").text(`${ongoingCount} / ${totalCount} ONGOING`);
    $("#accomplished-count").text(`${accomplishedCount} / ${totalCount} ACCOMPLISHED`);
}