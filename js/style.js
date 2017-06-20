/**
 * Created by dhl on 2017/5/28.
 */
+function () {
    $(window).scroll(function () {
        var $index_banner=$(".index_banner");
        var $pianoRoom=$(".piano-room");
        var $navbar=$(".navbar-default");
        var $body=$("body");
        var HEIGHT=500,
            SCOREHEIGHT=200,
            FOOTHEIGHT=4050;
        if($body.scrollTop()>SCOREHEIGHT){
            $navbar.css({padding:0})
                .addClass("black");
        }else {
            $navbar.css({padding:"15px 0"})
                .removeClass("black");
        }
        if($body.scrollTop()>HEIGHT){
            $index_banner.removeClass("fadeInDownBig");
            $pianoRoom.removeClass("bounceInRight");
        }else {
            $index_banner.addClass("fadeInDownBig");
            $pianoRoom.addClass("bounceInRight");
        }
    })

    // $(".team").each(function () {
    //     $(this).mouseenter(function () {
    //         $(this).css({border:"3px solid #aaa"});
    //     }).mouseleave(function () {
    //         $(this).css({border:"3px solid transparent"});
    //     })
    // })
    $(".go-top").hover(function () {
        $(this).children().removeClass("fa-angle-up")
            .html("返回顶部");
    },function () {
        $(this).children().addClass("fa-angle-up")
            .html("");
    });
    Pace.on("done", function(){
        $("#myloader").fadeOut(800);
    });

}();