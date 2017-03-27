/**
 * Created by wangxiaobin on 2017/3/7.
 */
//加载content方法
function toggleContent(data){
    var content = data;
    var html = '';
    for(var i=0;i<content.length; i++){
        html += "<a><img src='./img/arrowRight.png'/><span>" + content[i].question + "</span></a>";
        html += "<p>" + content[i].detail + "</p>";
        html += "<div></div>";
    }
    $('.content').html(html);
    //ios对于事件委托不支持, 每次切换tab(dom重新生成)都需要重新绑定
    bindEvents();
}
//绑定事件()
function bindEvents(){
    //详细内容切换显示事件绑定
    $('.content>a').on('click', function () {
        this.deg = this.deg == undefined ? -90 : (this.deg == -90 ? 0 : -90); //记录每个被点击的三角图片状态；
        var pEles = $(this).parent().children('p'); //详细内容
        var imgEle = $(this).children('img');   //三角形图片

        for(var i=0;i<pEles.length;i++){
            if($(this).next().html() !== $(pEles[i]).html()){
                if(pEles[i].style.display == 'block' || pEles[i].style.wekitDisplay == 'block'){
                    var a = pEles[i].previousElementSibling || pEles[i].previousSibling; //将所有的对象的deg重置为0
                    a.deg = 0;
                    $(pEles[i]).animate({height:'toggle',marginBottom:'toggle'},300);
                    $(pEles[i]).prev().children('img').css(
                        {   'transform':'rotate('+ 0 +'deg)',
                            'webkitTransform':'rotate('+ 0 +'deg)',
                            'monTransform':'rotate('+ 0 +'deg)',
                            'msTransform':'rotate('+ 0 +'deg)',
                            'oTransform':'rotate('+ 0 +'deg)'
                        }
                    );
                }
            }
        }
        imgEle.css(
            {   'transform':'rotate('+ this.deg +'deg)',
                'webkitTransform':'rotate('+ this.deg +'deg)',
                'monTransform':'rotate('+ this.deg +'deg)',
                'msTransform':'rotate('+ this.deg +'deg)',
                'oTransform':'rotate('+ this.deg +'deg)'
            }
        );
        $(this).next().animate({height:'toggle', marginBottom:'toggle'},300);
    });
}
