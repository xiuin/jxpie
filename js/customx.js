
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
    for (const [index, x] of j.entries()) {
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
        if (dataType != 4 && index == 2) {
            s = s + '<tr><td>x.</td><td colspan="3" id="ad-1"></td></tr>'
        } else if (dataType == 4 && (index+1) % 4 == 0) {
            s = s + '<tr><td>x.</td><td colspan="3" id="ad-'+parseInt(index)+'"></td></tr>'
        }

    }
    $(table).find('tbody').append(s)
}

function createAndAppendAdsElement(id, adUnitID) {
  var parent = document.getElementById(id);
  var ele = document.createElement('ins');
  ele.style.display = 'block';
  ele.className = 'adsbygoogle';
  ele.setAttribute('data-ad-format', 'fluid');
  ele.setAttribute('data-ad-layout-key', '-e3+q+33-nw+vn');
  ele.setAttribute('data-ad-client', 'ca-pub-5277012882124453');
  ele.setAttribute('data-ad-slot', adUnitID);
  parent.appendChild(ele);
  (adsbygoogle = window.adsbygoogle || []).push({});
}

function requestData(dataType) {
    htmlobj = $.ajax({
        url: "https://1911958968496216.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/python/douyin/" + dataType,
        type: 'GET',
        async: true,
        success: function(data) {
            createTable(dataType, JSON.parse(data));
            if (dataType != 4) {
                createAndAppendAdsElement('ad-1', '1666208762');
            } else {
                for (i = 3; i < 50; i+=4) {
                    id = 'ad-'+parseInt(i)
                    createAndAppendAdsElement(id, '1666208762');
                }
            }
        },
        error: function() {
        }
    })
}

