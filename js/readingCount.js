var readingCount = {
    init: function (app_id, app_key) {
        AV.init({
            appId: app_id,
            appKey: app_key
        })
    },
    //createData
    createData: function (result) {
        var Article = AV.Object.extend('Article')
        var article = new Article()

        article.set('id', result.id)
        article.set('title', result.title)

        if (result.flag === true) {
            article.set('time', 1)
        } else {
            article.set('time', 0)
        }

        return new Promise(function (resolve, reject) {
            article.save().then(function (data) {
                resolve({ id: data.attributes.id, time: data.attributes.time })
            }).catch(function (err) {
                console.log(err)
            })
        })
    },
    //searchIfExist
    searchData: function (id, title, flag) {
        return new Promise(function (resolve, reject) {
            var query = new AV.Query("Article")
            query.equalTo("id", id)
            query.find().then(function (result) {
                var data = {}
                if (result.length === 0) {
                    data.id = id
                    data.title = title
                    data.time = 0
                    data.exist = false
                    data.flag = flag
                    resolve(data)
                } else {
                    data.objectId = result[0].id
                    data.id = result[0].attributes.id
                    data.title = result[0].attributes.title
                    data.time = result[0].attributes.time
                    data.flag = flag
                    data.exist = true
                    resolve(data)
                }
            }).catch(function (err) {
                console.log(err)
            })
        })
    },
    addCount: function (result) {
        var article = AV.Object.createWithoutData('Article', result.objectId)
        // 修改属性
        article.set('time', result.time + 1)

        return new Promise(function (resolve, reject) {
            // 保存到云端
            article.save().then(function () {
                resolve({ id: result.id, time: result.time + 1 })
            }).catch(function (err) {
                reject(err)
            })
        })
    },
    //judgeResultIfNull
    judgeResult: function (result) {
        if (result.exist === false) {
            return readingCount.createData(result)
        } else {
            if (result.flag === true) {
                //取到_id直接执行time+1
                return readingCount.addCount(result)
            } else {
                return {
                    id: result.id,
                    time: result.time
                }
            }
        }
    },
    elFunc: function (obj) {
        var el = '[data-id=' + '"' + obj.id + '"' + ']'
        $(el).text(obj.time)
    },
    call: function (id, title, flag) {
        //post页面执行，初始值要置为1,flag为true
        //查询，如果查不到，则设置time为0。
        //新建一条数据，此时flag为0，time写入为1，然后渲染页面
        //如果查询到数据，执行addCount，然后渲染页面

        //index页面执行，初始页面置为0,flag为false
        //查询，如果查不到，则设置time为0。
        //新建一条数据，此时flag为0，time写入为0，然后渲染页面
        //如果查询到了，此时flag为false，直接return result给elFunc
        this.searchData(id, title, flag).then(this.judgeResult).then(this.elFunc).catch(function (err) {
            console.log(err)
        })
    },
    main: function (post, index, life) {
        if (post == "true") {
            var id = $(".viewsReading").attr('data-id')
            var title = $(".viewsReading").attr('data-title')
            this.call(id, title, true)
        }
        if (index == "true") {
            var that = this
            $(".viewsReading").each(function () {
                var id = $(this).attr('data-id')
                var title = $(this).attr('data-title')
                that.call(id, title, false)
            })
        }
        if (life.indexOf('life') > -1) {
            if (life.indexOf('index') > -1) {
                var that = this
                $(".viewsReading").each(function () {
                    var id = $(this).attr('id')
                    var title = $(this).attr('data-title')
                    that.call(id, title, false)
                })
            } else {
                var id = $(".viewsReading").attr('id')
                var title = $(".viewsReading").attr('data-title')
                this.call(id, title, true)
            }
        }
    }
}