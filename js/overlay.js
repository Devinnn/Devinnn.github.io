//flag to judge lay species
var showNow = null

//all layout element
var initVal = {
    time: {
        click: $("#time"),
        close: $(".date-close"),
        content: $(".date-content"),
        show: 'time'
    },
    category: {
        click: $(".category-click"),
        close: $(".category-close"),
        content: $(".category-content"),
        show: 'category'
    },
    tag: {
        click: $(".tag-click"),
        close: $(".tag-close"),
        content: $(".tag-content"),
        show: 'tag'
    },
    search: {
        click: $("a[href='#search']"),
        close: $(".search-close"),
        content: $(".search-content"),
        show: 'search',
    },
    overlay: $(".overlay")
}

//layoutControl
var layOutControl = {
    othersToClose: function () {
        var that = this
        $("html").on("click", function (e) {
            //comfirm that don't run down
            if (showNow === null) {
                return
            }
            if (initVal[showNow].content.has(e.target).length === 0 && !initVal[showNow].content.is(e.target)) {
                var el = $(".content-show")
                that.close(el, initVal.overlay)
            }
        })
    },
    close: function ($content, $overlay) {
        $content.removeClass("content-show")
        $overlay.removeClass("visibility-show")
        showNow = null
        if(window.innerWidth <= 1000  && $("body").hasClass("ios-scroll")) {
            $("body").removeClass("ios-scroll")
        }
    },
    manualToClose: function ($toClose, $content, $overlay) {
        var that = this
        $toClose.on("click", function (e) {
            e.stopPropagation()
            that.close($content, $overlay)
        })
    },
    show: function ($content, $overlay, show) {
        $overlay.addClass("visibility-show")
        $content.addClass("content-show")
        showNow = show
        if(window.innerWidth <= 1000) {
            $("body").addClass("ios-scroll")
        }
    }
}

//scroll control
var niceScrollControl = {
    scroll: function ($content) {
        $content.find(".nice-scroll").niceScroll(".detail", {
            cursorcolor: "#cccccc",
            cursorwidth: "4px",
            cursorborder: "0px solid #000",
            scrollspeed: 60,
            autohidemode: false,
            background: 'none',
            hidecursordelay: 400,
            cursorfixedheight: false,
            cursorminheight: 20,
            enablekeyboard: true,
            horizrailenabled: true,
            bouncescroll: false,
            smoothscroll: true,
            iframeautoresize: false,
            touchbehavior: false,
            preservenativescrolling: false,//阻止滚轮冒泡
            zIndex: 999
        })
    },
    toResize: function ($content) {
        $content.find(".nice-scroll").getNiceScroll().resize()
    }
}

var timeControl = {
    init: function () {
        //具体内部控制
        this.controlMonth()
        this.slide()
    },
    judgetoTurn: function () {
        if ($(".date-show").prev().length === 0) {
            $(".y-l").hide()
        } else {
            $(".y-l").show()
        }
        if ($(".date-show").next().length === 0) {
            $(".y-r").hide()
        } else {
            $(".y-r").show()
        }
    },
    slide: function () {
        var that = this
        $(".y-l").on("click", function () {
            var $now = $(".date-show");
            $now.removeClass("date-show").addClass("date-r")
            $now.prev().removeClass("date-l").addClass("date-show")
            that.judgetoTurn()
            that.controlMonth()
        })

        $(".y-r").on("click", function () {
            var $now = $(".date-show");
            $now.removeClass("date-show").addClass("date-l")
            $now.next().removeClass("date-r").addClass("date-show")
            that.judgetoTurn()
            that.controlMonth()
        })
    },
    controlMonth: function () {
        var time = JSON.parse($("#timeVal").val())

        if (time.length === 1) {
            $(".y-l").hide()
            return
        }

        var index = $(".date-show a").attr("data-index")

        var recordMonths = []

        var thisYear = $(".date-show a").text()

        time[index].forEach(function (e, i) {
            if (e === 1) {
                recordMonths.push(i)
            }
        })

        $(".month").find("i").hide()
        $(".month").find("a").removeAttr("href")

        recordMonths.forEach(function (e) {
            var $toChange = $(".month").children().eq(e - 1)
            if (e < '10') {
                e = '0' + e
            }
            $toChange.attr("href", "/archives/" + thisYear + "/" + e)
            $toChange.children("i").show()
        })

    }
}

var category_tag = {
    init: function ($content) {
        this.randomFontSize($content)
        niceScrollControl.scroll($content)
    },
    randomFontSize: function ($content) {
        $content.find(".detail").children('a').each(function () {
            var randomFont = parseInt(Math.random() * (20 - 14 + 1) + 14)
            $(this).css("font-size", randomFont + "px")
        })
    }
}

var commonControl = {
    //共同的操作控制
    init: function ($click, $content, $overlay, $close, show) {
        $click.click(function (e) {
            e.stopPropagation()
            layOutControl.show($content, $overlay, show)
            niceScrollControl.toResize($content)
        })
        //手动关闭
        layOutControl.manualToClose($close, $content, $overlay)
    }
}