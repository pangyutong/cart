$(function () {
    $('#cart').fullpage({
        /*配置背景颜色*/
        sectionsColor:["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        /*显示导航*/
        navigation:true,
        /*不需要上下居中*/
        verticalCentered:false,
        /*切换动画时间为1秒*/
        scrollingSpeed:1000,
        /*离开上一屏*/
        onLeave:function (index,nextIndex,direction) {
            /*隐藏更多按钮*/
            $('.more').hide();
            /*第二屏到第三屏才需要做沙发掉落的动画*/
            if(index == 2 && nextIndex == 3){
                $('.section:eq(1)').find('.sofa').addClass('animated');
            }
            /*第三屏到第四屏才需要做沙发掉落的动画*/
            if(index == 3 && nextIndex == 4){
                $('.section:eq(2)').find('.sofa').addClass('animated');
            }

            /*第五屏到第六屏需要做沙发掉落的动画*/
            if(index == 5 && nextIndex == 6){
                $('.section:eq(4)').find('.sofa').addClass('animated');
                $('.section:eq(5)').find('.box').addClass('animated');
            }

        },
        /*进入下一屏*/
        afterLoad:function (link,index) {
            /*淡入显示更多按钮*/
            $('.more').fadeIn();
            /*去实现下一屏动画*/
            /*给下一屏加上一个类 在类中去实现动画*/
            //this.addClass('now');
            //console.log(index);
            $('.section').eq(index-1).addClass('now');

            if (index == 7) {
                $('.section:eq(6)').find(".star img").each(function (i) {
                    $(this).delay(800*i).fadeIn(800);
                });
            }

        },
        /*插件初始化成功 渲染完毕*/
        afterRender:function () {
            /*绑定页面事件的时候和插件如果有关系 最后在插件初始化成功之后绑定*/
            $('.more').on('click',function () {
                /*下一屏的切换*/
                /*插件方法：moveSectionDown()*/
                /*在初始化之后 jquery对象 没有这个插件方法*/
                /*插件的封装机制是怎么样的？ $.fn.fullpage */
                $.fn.fullpage.moveSectionDown();
            });
            /*第四屏的购物车推出去之后的动画*/
            $('.section:eq(3)').on('animationend','.cart',function () {
                /*1.文字变换*/
                $('.section:eq(3)').find('.text').find('img:first').hide().siblings().fadeIn();
                /*2.填写购物车地址的图片淡入*/
                /*$('.section:eq(3)').find('.address').fadeIn(function () {
                    /!*3.填写购物车地址的图片淡入之后淡入具体的收货地址文字*!/
                    $(this).find('img:last').fadeIn();
                });*/
                $('.section:eq(3)').find('.address').fadeIn(1000).find('img:last').delay(1000).fadeIn(1000);
            });
            /*第8屏 鼠标移动手移动*/
            $('.section:nth-child(8)').on('mousemove',function (e) {
                /*通过时间对象获取鼠标的定位 坐标*/
                $(this).find('.hand').css({
                    //图片跟着鼠标动
                    left:e.clientX-330,
                    top:e.clientY-180 // 让鼠标露出来
                });
            }).on('click','.again',function () {
                /*第8屏 点击再来一次  重新开始所有的动画*/
                //实现动画我们用了以下三种方式
                /*1. 插件内方法 判断进入下一屏幕时 下一屏幕加now类名 */
                /*2. 判断离开上一屏幕触发 到下一屏幕的阶段 给下一屏幕加animated类名 */
                /*3. 使用jquery fadeIn淡入动画*/
                $('.section.now').removeClass('now');
                $('.section').find('.animated').removeClass('animated');
                $('.section').find('[style]').removeAttr('style');
                /*回第一屏*/
                $.fn.fullpage.moveTo(1);
            });


        }
    });
});