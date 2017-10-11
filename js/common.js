/**
 * initVal from overlay.js
 * Usage: page layer dom
 * 
 * layOutControl from overlay.js
 * Usage: control layer open or close
 * 
 * niceScrollControl from overlay.js
 * Usage: control content scroll
 */

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        $(".loading-wrapper").hide()
        $(".comment-wrapper").show().addClass("animated fadeIn")
    }
}



$(function () {

    //moblies 300ms delay
    FastClick.attach(document.body);

    //fade
    $('.fade').addClass('animated fadeIn')

    //search layout
    layOutControl.othersToClose()
    //create niceScroll
    niceScrollControl.scroll(initVal.search.content)
    $("a[href='#search']").click(function (e) {
        e.stopPropagation()
        layOutControl.show(
            initVal.search.content,
            initVal.overlay,
            initVal.search.show
        )
    })
    $(".search-close").click(function (e) {
        e.stopPropagation()
        layOutControl.close(initVal.search.content, initVal.overlay)
    })

    //categories control
    category_tag.init(initVal.category.content)
    commonControl.init(
        initVal.category.click,
        initVal.category.content,
        initVal.overlay,
        initVal.category.close,
        initVal.category.show
    )

    //tag control
    category_tag.init(initVal.tag.content)
    commonControl.init(
        initVal.tag.click,
        initVal.tag.content,
        initVal.overlay,
        initVal.tag.close,
        initVal.tag.show
    )


    //phoneMenu
    var flag = false
    var $old_height = $("header").height()
    var $add_height = $(".nav-phone").height()
    $(".phone-menu").click(function () {
        if (flag === false) {
            $(".header").css("height", $old_height + $add_height)
            flag = true
        } else {
            $(".header").css("height", $old_height)
            flag = false
        }
    })
})

//fancybox图片包裹a标签

function wrapImg($content) {
    $content.find("img").each(function () {
        var url = $(this).attr("src")
        var link = '<a href=' + '"'+ url + '"' + 'data-fancybox="images"' + '></a>'
        $(this).wrap(link)
    })
}


