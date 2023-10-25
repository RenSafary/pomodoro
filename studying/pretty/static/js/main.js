$(document).ready(function(){
    function start_button(){
        $(".button").text("Start");
        $(".button").css({'background' : 'linear-gradient(90deg, rgba(162,83,57,1) 44%, rgba(255,203,80,1) 100%)', 'margin-left' : '-50'});
    }
    function stop_button(){
        $(".button").css({'background' : 'linear-gradient(90deg, rgba(255,101,50,1) 100%, rgba(255,211,105,1) 100%)', 'margin-left' : '-45'});
        $(".button").text("Stop");
    }

    $(".statistics").click(function(){
        $(".main").animate({'opacity' : '0.5'}, 200);
        $(".popup-statistics").fadeIn(600);

        $(".close").click(function(){
            $(".main").animate({'opacity' : '1'}, 600);
            $(".popup-statistics").fadeOut(600);
        });
    });

    var minutes;
    var seconds;
    var short_break;
    var long_break;
    var long_break_times;
    var k = -1;
    var last;

    var now0 = 180;
    function settings_deg(){
        $(".settings").animate({now: now0},
        {
            duration: 800,
            step: function(now) {
                $(this).css({ 'transform' : 'rotate(' + now + 90 + 'deg)' });
            }
        });
    }

    $(".settings").click(function(){
        settings_deg();
        now0 = now0 + 90;
        $(".popup-settings").fadeIn(600);
        $(".main").animate({'opacity' : '0.5'}, 600);
        $(this).animate({'opacity' : '1'}, 600);
        $(".b_classic").click(function(){
            $(".i_duration1").val(25);
            $(".i_duration2").val(5);
            $(".i_duration3").val(10);
            $(".i_duration4").val(4);
        });
        $(".b_hard").click(function(){
            $(".i_duration1").val(50);
            $(".i_duration2").val(10);
            $(".i_duration3").val(20);
            $(".i_duration4").val(4);
        });

        $(".apply").click(function(){
            $(".popup-settings").fadeOut(600);
            $(".main").animate({'opacity' : '1'}, 600);
            minutes = $(".i_duration1").val();
            short_break = $(".i_duration2").val();
            long_break = $(".i_duration3").val();
            long_break_times = $(".i_duration4").val();
            seconds = 0;
            if (minutes > 9){
                $(".time").text(minutes + ":" + "00");
            }
            else {
                $(".time").text("0" + minutes + ":" + "00");
            }
            t = 0;
            k = 0;
            last = "1pomodoro";
            start_button();
            $(".lap").animate({'opacity' : '1'}, 600);
            clearInterval(timer);
        });
    });
    $(".close").click(function(){
        $(".popup-settings").fadeOut(600);
        $(".main").animate({'opacity' : '1'}, 600);
    });


    var button;
    $(".button").click(function(){
        button = $(this).text();
        if (button === "Start" && k != -1){
            stop_button();
        } 
        else {
            start_button();
        }
    });


    var p_lap = 1;
    var s_lap = 0;
    var l_lap = 0;
    $(".button").click(function(){
        button = $(this).text();
        if (button === "Stop"){
            timer = setInterval(function(){
                if (minutes != 0){
                    if (seconds > 9){
                        if (minutes > 9){
                            $(".time").text(minutes + ":" + seconds--);
                        }
                        else{
                            $(".time").text("0" + minutes + ":" + seconds--);
                        }
                    }
                    else if (seconds > -1) {
                        if (minutes > 9){
                            $(".time").text(minutes + ":0" + seconds--);
                        }
                        else{
                            $(".time").text("0" + minutes + ":0" + seconds--);
                        }
                    }
                    else if (seconds === -1){
                        if (minutes > 10){
                            minutes--;
                            seconds = 59;
                            $(".time").text(minutes + ":" + seconds--);
                        }
                        else{
                            if (minutes === 1){
                                minutes--;
                                seconds = 59;
                                $(".time").text("0" + minutes + ":" + seconds);
                            }
                            else {
                                minutes--;
                                seconds = 59;
                                $(".time").text("0" + minutes + ":" + seconds--);
                            }
                        }
                    }
                }

                if (minutes === 0){
                    if (seconds > 9){
                        $(".time").text("0" + minutes + ":" + seconds--);
                    }
                    else if (0 < seconds < 10){
                        $(".time").text("0" + minutes + ":0" + seconds--);
                    }
                    if (seconds === -1){
                        $(".time").text("00:00");
                        seconds = 0;

                        if (last == "1pomodoro") {
                            k++;
                            last = "pomodoro";
                        }
                        
                        // short
                        if (k != long_break_times && last == "pomodoro"){
                            minutes = short_break;
                            seconds = 0;
                            if (minutes > 9){
                                $(".time").text(minutes + ":" + "00");
                            }
                            else {
                                $(".time").text("0" + minutes + ":" + "00");
                            }
                            s_lap++;
                            $(".lap").text("short break:" + s_lap);
                            last = "short_break";
                        } 
                        // main
                        else if (k != long_break_times && (last == "short_break" || last == "long_break")){
                            minutes = $(".i_duration1").val();
                            seconds = 0;
                            if (minutes > 9){
                                $(".time").text(minutes + ":" + "00");
                            }
                            else {
                                $(".time").text("0" + minutes + ":" + "00");
                            }
                            p_lap++;
                            $(".lap").text("pomodoro:" + p_lap);
                            k++;
                            last = "pomodoro";
                        }
                        // long
                        else if (k == long_break_times && last == "pomodoro"){
                            minutes = long_break;
                            seconds = 0;
                            if (minutes > 9){
                                $(".time").text(minutes + ":" + "00");
                            }
                            else {
                                $(".time").text("0" + minutes + ":" + "00");
                            }
                            l_lap++;
                            $(".lap").text("long break:" + l_lap);
                            k = 0;
                            last = "long_break";
                        }
                    }
                }
            }, 50);
        }
        else{
            clearInterval(timer);
        } 
    });

    $(".reset").click(function(){
        $(this).animate({'opacity' : '0.6'}, 300);
        $(this).animate({'opacity' : '1'}, 300);
        $(".lap").animate({'opacity' : '0'}, 600);
        $(".time").text("00:00");
        minutes = 0;
        seconds = 0;
        t = 0;
        k = -1;
        start_button();
        clearInterval(timer);
    });

    
    var buttons = [".statistics", ".left_arrow", ".right_arrow", ".mini-games"];
    for (var i = 0; i < buttons.length; i++){
        $(buttons[i]).click(function(){
            $(this).animate({'opacity' : '0.6'}, 100);
            $(this).animate({'opacity' : '1'}, 100);
        });
    }

    var links = ["https://www.youtube.com/embed/kgx4WGK0oNU",
    "https://www.youtube.com/embed/jfKfPfyJRdk",
    "https://www.youtube.com/embed/HDhR2Yhnvfo",
    "https://www.youtube.com/embed/KpMhwrRFn2M",
    "https://www.youtube.com/embed/rUxyKA_-grg"];
    var l = 2;
    $(".left_arrow").click(function(){
        if (l != 0){
            l--;
            for (var i = l; i < links.length; i--){
                $(".Video").attr('src', links[i]);
                break;
            }
        }
        else {
            l = 4;
            for (var i = l; i < links.length; i--){
                $(".Video").attr('src', links[i]);
                break;
            }
        }
    });

    $(".right_arrow").click(function(){
        if (l != 4){
            l++;
            for (var i = l; i < links.length; i++){
                $(".Video").attr('src', links[i]);
                break;
            }
        }
        else {
            l = 0;
            for (var i = l; i < links.length; i++){
                $(".Video").attr('src', links[i]);
                break;
            }
        }
    });

    var username = $(".username").text()
    if (username == "None"){
        $(".username_label").hide();
        $(".username").hide();
        $(".logout").hide();
        $(".profile").hide();
        $(".list").hide();
    }
    else{
        $(".login").hide();
        $(".login_field").hide();
        $(".password").hide();
        $(".password_field").hide();
        $(".button_sign_in").hide();
    }

    $(".profile").click(function(){
        $(this).css({
            'background':'black',
            'color':'white',
        })
        $(".list").css({
            'background':'white',
            'color':'black',
        })
    });

    $(".list").click(function(){
        $(this).css({
            'background':'black',
            'color':'white',
        })
        $(".profile").css({
            'background':'white',
            'color':'black',
        })
    });

/*
    var w_window = $(window).width()/150;
    var k = 0; 
    for (var i = 0; i < Math.round(w_window); i++){
        $(".background").append('<div class="background' + String(i) + '"></div>');
        $(".background" + String(i)).css({
            'left' : '0%',
            'height' : '99%',
            'width' : '150',
            'background' : 'black',
            'margin-left' : String(k) + 'px',
            'position' : 'absolute'
        });
        k+=150;
    }

    var t_b = 0;
    var background =  setInterval(function(){
        for (var i = 0; i < Math.round(w_window); i++){
            if (t_b % 2 == 0){
                $(".background" + String(i)).css({'background' : '#4c1a15'});
                if (tb + 1 < Math.round(w_window)) ;
                else {
                    $(".background" + String(i + 1)).css({'background' : '#69362d'});
                }
            }
            else{
                $(".background" + String(i)).css({'background' : '#69362d'});
                if (tb + 1 < Math.round(w_window)) ;
                else {
                    $(".background" + String(i + 1)).css({'background' : '#4c1a15'});
                }
            }
        }
        t_b++;
    },10); */
});