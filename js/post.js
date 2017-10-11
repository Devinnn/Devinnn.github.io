$(function () {

    if ($(".toc-content").length) {

        __PAGE_POST__.tocOffsetTop = $(".toc-content").offset().top

        var headerlink = __PAGE_POST__.getAllOffset()

        __PAGE_POST__.tocTop(null, $(window).scrollTop())
        __PAGE_POST__.tocHover(headerlink, $(window).scrollTop())

        __PAGE_POST__.scroll(headerlink)
        //文章页面导航滚动效果
        __PAGE_POST__.aScroll()

        __PAGE_POST__.toTop()
    }
})
var __PAGE_POST__ = {

    //页面加载的时候获取文章目录的offsetTop值
    tocOffsetTop: null,

    //设置10px来保证标题的可读性（错开）
    viewOffset: 10,

    //postPage页面标志
    postPage: function () {
        if ($(".post").length === 0) {
            return false
        } else {
            return true
        }
    },
    //监控scroll滚动效果
    scroll: function (headerlink) {
        //储存this变量
        var that = this
        $(window).scroll(function () {
            var scroll = $(window).scrollTop()
            that.tocTop(scroll, null)
            that.tocHover(headerlink, scroll)
        })
    },
    //目录导航滑动效果
    aScroll: function () {
        var that = this
        $(".toc-content").on('click', 'a', function (e) {
            //阻止a标签hash默认跳转
            e.preventDefault()
            //有些浏览器是body滚动
            $("html, body").stop(true, true).animate({ scrollTop: $($(this).attr("href")).offset().top - that.viewOffset + 'px' })
        })
    },
    //文章目录贴顶处理
    //两种状态
    tocTop: function (scroll, newTop) {
        var $this = $(".toc-content")
        if (scroll) {
            if (scroll >= this.tocOffsetTop  && !$this.hasClass('fixed')) {
                $this.addClass('fixed')
            } else if (scroll < this.tocOffsetTop  && $this.hasClass('fixed')) {
                $this.removeClass('fixed')
            }
            return
        }

        if (newTop) {
            if (newTop >= this.tocOffsetTop) {
                $this.addClass('fixed')
            }
        }
    },
    //获取所有headerlink的offsetTop
    getAllOffset: function () {
        var that = this
        var arrayTitle = []
        var headerlink = $(".headerlink")
        $.each(headerlink, function (i, e) {
            arrayTitle.push({
                offset: $(e).offset().top - that.viewOffset,//距离顶端Y值
                height: $(e).parent().height()//元素的高度
            })
        })
        return arrayTitle
    },
    //滚动文章列表标签高亮
    tocHover: function (headerlink, scroll) {
        var index = 0
        if (scroll + headerlink[0].height < headerlink[0].offset) {
            $(".toc-content").find('a').removeClass('active-headerlink')
            return
        }
        if (scroll + headerlink[headerlink.length - 1].height >= headerlink[headerlink.length - 1].offset) {
            $(".toc-content").find('a').removeClass('active-headerlink')
            $(".toc-content").find('a').eq(headerlink.length - 1).addClass('active-headerlink')
            return
        }
        while (scroll + headerlink[index].height >= headerlink[index].offset) {
            index++
        }
        index--
        $(".toc-content").find('a').removeClass('active-headerlink')
        $(".toc-content").find('a').eq(index).addClass('active-headerlink')
    },
    //置顶处理
    toTop: function () {
        $("#toTop").click(function (e) {
            e.preventDefault()
            if ($(window).scrollTop() !== 0) {
                $(".toc-content").removeClass('fixed')
                $("html, body").scrollTop(0)
            }
        })
    }
}