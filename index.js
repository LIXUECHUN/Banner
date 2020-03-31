function Banner(){
    this.carousel = function(config){
        // 1 DOM draw
        var $slide = $("<div class='slider' id='slider'></div>");
        $("#box").append($slide);
        for(var k =0;k < config.imgarr.length; k++){
            var $img = $("<div class='slide'><img src="+config.imgarr[k]+" alt=''></div>");
            $("#slider").append($img);
        }
        var $left = $("<span id='left'><</span>");
        $("#box").append($left);
        var $right = $("<span id='right'>></span>");
        $("#box").append($right);
        var $nav = $("<ul class='nav' id='navs'></ul>");
        $("#box").append($nav);
        for(var j = 0;j < config.imgnum; j++){
            var $li = $("<li>"+(j+1)+"</li>");
            $("#navs").append($li);
        }

        // 2 事件
        box.onmouseover = function(){
            left.style.opacity = 0.6;
            right.style.opacity = 0.6;
        }
        box.onmouseout = function(){
            left.style.opacity = 0;
            right.style.opacity = 0;
        }
        var index = 0;
        var lis = $("li");
        $(lis[index]).addClass("active");
        
        // 当前页面对应添加导航样式
        function navMove(){
            for(var k = 0;k < lis.length; k++){
                if($(lis[k]).hasClass("active")){
                    $(lis[k]).removeClass("active");
                }
            }
            $(lis[index]).addClass("active");
        }
        //点击切换函数
        for(var j =0; j < lis.length; j ++){
            lis[j].num = j;
            lis[j].onclick = function(){
                clearInterval(auto);
                var digital = index - this.num;
                if(digital < 0){
                    digital = - digital;
                }
                index = this.num;
                navMove();
                move(digital*10,-1200*(this.num+1),20,automatic());
            }
        }

        slider.style.left = -1200+"px";
        var isMoving = false;
        //向右滑动
        right.onclick = function(){
            if (isMoving) {
                // console.log('不可以移动')
                return;
                }
            isMoving = true;
            // console.log('向右函数'+isMoving)
            clearInterval(auto);
            index++;
            navMove();
            move(20,-1200*(index+1),automatic());
            //跳到第一页
            if(parseInt(slider.style.left) <= -6000){ 
                index = 0; 
                clearInterval(moving);
                slider.style.left = 0 + 'px';
                move(20,-1200,navMove());
            }
        }
        //向左滑动
        left.onclick = function(){
            if (isMoving) {return;}
            isMoving = true;
            clearInterval(auto);
            index--;
            navMove();
            move(20,-1200*(index+1),automatic());
            //跳到最后一页
            if(index === -1){
                index = 4; 
                clearInterval(moving);
                slider.style.left = -1200*(config.imgarr.length-1) + 'px';
                move(20,-1200*(config.imgarr.length-2),navMove());
            };
        }

        //轮播
        var auto;
        function automatic(){
            auto = setInterval(function(){
                index++;
                move(20,-1200*(index+1),20,navMove());
                if(parseInt(slider.style.left) <= -6000){ 
                    index = 0; 
                    clearInterval(moving);
                    slider.style.left = 0 + 'px';
                    move(20,-1200,navMove());
                }
            },config.time)
        }
        automatic();

        //滑动
        var moving;
        function move(speed,target,callback){
            clearInterval(moving);
            var left = slider.style.left;
            var current = parseInt(left);

            if(left === ""){
                left = -1200;
            }
            // 判断滑动方向
            if(current > target){
                speed = -1*speed;
            }

            moving = setInterval(function(){
                var left = slider.style.left;
                if(left != ""){
                    befval = parseInt(left);
                }else{
                    befval = -1200;
                }
                var aftval = befval + speed;
                if(speed > 0 && aftval >= target || (aftval <= target && speed < 0)){
                    aftval = target;
                }
                slider.style.left = aftval + 'px';
                if(aftval === target){
                    clearInterval(moving);
                    callback;
                }
            },10)
            isMoving = false;
            // console.log('移动函数'+isMoving)

        }
    }
}
