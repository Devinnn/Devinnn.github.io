/**
 * initVal from common.js
 * Usage: page layer dom
 * 
 * layOutControl from common.js
 * Usage: control layer open or close
 * 
 * niceScrollControl from common.js
 * Usage: control content scroll
 */
$(function () {

    //lineDown操作
    $(".lineDown").each(function () {
        $(this).addClass("animated fadeInDown")
    })

    //日期控制器
    commonControl.init(
        initVal.time.click,
        initVal.time.content,
        initVal.overlay,
        initVal.time.close,
        initVal.time.show
    )
    timeControl.init()

    //分类控制
    category_tag.init(initVal.category.content)
    commonControl.init(
        initVal.category.click,
        initVal.category.content,
        initVal.overlay,
        initVal.category.close,
        initVal.category.show
    )

    //标签控制
    category_tag.init(initVal.tag.content)
    commonControl.init(
        initVal.tag.click,
        initVal.tag.content,
        initVal.overlay,
        initVal.tag.close,
        initVal.tag.show
    )

})
