function loadContent(page) {
    $.ajax({
        type: "GET",
        url: page,
        success: function(data) {
            // 페이지 내용을 동적으로 로드
            $(".main").html(data);
        }
    });
}