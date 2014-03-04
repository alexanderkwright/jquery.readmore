/*
    @author       - Mike Matthewson / Alex Wright
    @date         - 11/10/2011
    @description  - Content is able to be hidden and then revealed with either a link or button.
                    Users may specify how much text to show, the line height of the text, revealing
                    and hiding link / button text, whether or not to show a button or link,
                    and the show and hide speed.
*/

(function($){
    $.fn.readMore = function(o) {
    
        var defaults = {
            numLines: 5,
            lineHeight: '20px',
            moreText: 'more',
            lessText: 'less',
            button: false,
            showSpeed: 400,
            hideSpeed: 400
        };
        o = $.extend(defaults, o);
        
        
        return this.each(function() {
            var e = $(this);

            e.css("line-height", o.lineHeight);
            
            var collapsedHeight = o.numLines * parseInt(o.lineHeight);
                     
            
            e.html(
                '<div>' + e.html() + '</div>' +
                '<div>' + ((o.button) ?
                    '<button type="button" class="read-link">'+o.moreText+'</button>' :
                    '<a href="#" class="read-link">'+o.moreText+'</a>') +
                '</div>'
            );
            
            $('div:eq(0)', e)
                .css({"overflow": "hidden"})
                .height(collapsedHeight);
            
            $('.read-link', e)                  
                .toggle(
                    function(){
                        
                        $('div:eq(0)', e).css('height', 'auto');                        
                        var expandedHeight = $('div:eq(0)', e).height();
                        
                        $('div:eq(0)', e)
                            .height(collapsedHeight)
                            .animate({height: expandedHeight}, o.showSpeed, function(){
                                 $('.read-link', e).text(o.lessText);
                            });
                        return false;
                    },
                    
                    function(){
                        $('div:eq(0)', e).animate({height: collapsedHeight}, o.hideSpeed, function(){
                            $('.read-link', e).text(o.moreText);
                        });
                        return false;
                        
                    }
                );
        });
    };
})(jQuery);