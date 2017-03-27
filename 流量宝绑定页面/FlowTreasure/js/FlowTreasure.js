/**
 * Created by wangxiaobin on 2017/3/8.
 */
var clickCount = 0;
var excode; //商户代码
var $ = function(id){
    return document.getElementById(id);
};
//通过URL获取电话号码(telNo)和商户代码(exCode)
(function(){
    var number = window.location.href;
    var params = [];
    params = number.split('?')[1].split('&');
    for(var i=0;i<params.length;i++){
        if(params[i].indexOf('telNo')>=0){
            $('phone').value = params[i].split('=')[1];
        }
        if(params[i].indexOf('exCode')>=0 || params[i].indexOf('excode')>=0){
            excode = params[i].split('=')[1];
        }
    }
})();

//获取验证码事件绑定
function codeEvent(o){
    var time = 300; //短信验证码有效时长（单位：s）
    //避免多次点击
    if(clickCount === 0){
        clickCount = 1;
    }else{
        return;
    }
    var that = o;
    var minutes = 0;
    var seconds = 0;
    time--;
    that.innerHTML = '04:59';
    that.style.color = '#CCCCCC';
    var interval = setInterval(function(){
        time--;
        minutes = parseInt(time/60)==0?'' : '0'+parseInt(time/60)+':';
        seconds = time%60<10 ? '0' + time%60 : time%60;
        if(time === 0){
            that.innerHTML = '获取验证码';
            that.style.color = '#FF7700';
            clickCount = 0;
            clearInterval(interval);
            return;
        }
        that.innerHTML = minutes + seconds;
    },1000);
    getCode($('phone').value);
}
//获取验证码
function getCode(number) {
    var params = 'excode=' + excode +"&telNo=" + $('phone').value;
    fetch(new Request('http://10.15.191.108:8080/getSmsCode?'+ params),{mode:"cors"}).then(function(response) {
        return response.json();
    }).then(function(data) {
        if(data.status === 200){ //获取短信验证码成功
            showMessageTip("验证码已发送，请注意查收!");
        }else{
        }
    }).catch(function(e) {
        console.log(e);
    });
}

//验证码验证、授权事件
function bind() {
    $('error').innerHTML = '';
    var phone = $('phone').value;
    var code = $('code').value;
    var params = 'excode=' + excode +"&telNo=" + $('phone').value + "&smsCode=" + code;
    if(code === ''){
        showError('请输入验证码');
        return;
    }
    //验证 验证码是否正确 正确则授权
    fetch(new Request('http://10.15.191.108:8080/verifySmsCode?'+params),{mode:"cors"}).then(function(response) {
        return response.json();
    }).then(function(data) {
        if(data.status === 200){ //验证成功

        }else{
            showError('验证码输入错误');
        }
    }).catch(function(e) {
        console.log(e);
    });
}

//错误信息显示
function  showError(msg) {
    $('error').innerHTML = msg;
    $('error').parentNode.style.display = 'block';
    $('error').parentNode.style.webkitDisplay = 'block';

}

//调用提示框
function showMessageTip(msg){
    $('message').innerHTML = msg;
    $('messageTip').style.zIndex = 10001;
    $('messageTip').style.mozOpacity = 1;
    $('messageTip').style.khtmlOpacity = 1;
    $('messageTip').style.opacity = 1;
    setTimeout(function(){
        $('messageTip').style.mozOpacity = 0;
        $('messageTip').style.khtmlOpacity = 0;
        $('messageTip').style.opacity = 0;
        $('messageTip').style.zIndex = -1;
    }, 2000);
}

