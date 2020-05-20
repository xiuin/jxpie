
function time(time = +new Date()) {
    var date = new Date(time + 8 * 3600 * 1000);
    return date.toJSON().substr(0, 19).replace('T', ' ');
}

//秒转化成 时分秒
function secondToDate(result) {
    var h = Math.floor(result / 3600);
    var m = Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60));
    return result = m + ":" + s;
}

function createTable(dataType, data) {
    s = ''
    j = data['billboard_data']
    for (var x of j) {
        if (dataType == 1 || dataType == 9) {
            s = s + '<tr><td>' + x.rank + '.</td>' +
                    '<td><span style="white-space: normal;">' + x.title + '</span></td>' +
                    '<td><span><i class="icon ion-fireball"></i>' + parseInt(x.value)/1000 + 'w</span></td></tr>'
        } else if (dataType == 2 || dataType == 3) {
            s = s + '<tr><td>' + x.rank + '.</td>' +
                    '<td><img style="height: 50%;border-radius:50%" src="'+ x.img_url + '">' +
                    '<span style="white-space: normal;">  ' + x.title + '</span></td>' +
                    '<td><span>' + parseInt(x.value)/1000 + 'w 影响力</span></td></tr>'
        }  else if (dataType == 4) {
            s = s + '<tr><td>' + x.rank + '.</td>' +
                    '<td><a target="_blank" href="'+ x.link +'">' +
                    '<img style="height: 20%" src="'+ x.img_url + '"></a></td>' +
                    '<td><span style="white-space: normal;">' + x.title + '</span></td>' +
                    '<td><span><i class="icon ion-heart"></i>' + parseInt(x.value)/1000 + 'w</span></td></tr>'
        } else if (dataType == 5 || dataType == 6 || dataType == 7) {
            s = s + '<tr><td>' + x.rank + '.</td>' +
                    '<td><img style="height: 80%" src="'+ x.img_url + '"></td>' +
                    '<td><span style="white-space: normal;">' + x.title + ' [' + secondToDate(x.duration) + ']</span></td>' +
                    '<td>' + x.author + '</td>' +
                    '<td><span>' + parseInt(x.value)/1000 + 'w 人使用</span></td></tr>'
        } else if (dataType == 10) {
            s = s + '<tr><td>' + x.rank + '.</td>' +
                    '<td><img style="height: 5%" src="'+ x.img_url + '"></td>' +
                    '<td><span style="white-space: normal;">' + x.title + ' [' + x.author + ']</span></td>' +
                    '<td><span><i class="icon ion-fireball"></i>' + parseInt(x.value)/1000 + 'w</span></td></tr>'
        }    else {}
    }
    $(table).find('tbody').append(s)
}

function requestData(dataType) {
    htmlobj = $.ajax({
        url: "https://creator.douyin.com/aweme/v1/creator/data/billboard/?billboard_type=" + dataType,
        type: 'GET',
        async: true,
        success: function(data) {
            createTable(dataType, data);
        },
        error: function() {
        }
    })
}

