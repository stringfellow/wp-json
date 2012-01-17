/********************************************************************
 * jQuery wp-json connects to the JSON API wordpress plugin.
 *
 * See http://wordpress.org/extend/plugins/json-api/other_notes/
 *
 * It performs a simple lookup, and currently nothing more.
 * Results are output into the subject element, which can contain a
 * child element with the class 'loading' that will be manipulated
 * with the return of the AJAX call.
 *
 * Steve Pike 2012
 *
 *******************************************************************/
 
(function($) {
     $.fn.wpFeed = function(base, options) {
        var urlTypes = {
            'recent': 'get_recent_posts'
        };

        var default_html = "<div class=\"post\">" +
            "<a href=\"{{=url}}\">" +
            "{{=title!}}" +
            "</div>";

        var settings = $.extend( {
            'type': 'recent',
            'limit': false,
            'template': default_html
        }, options);

        var elem = this;
        var feed = base + '?json=' + urlTypes[settings.type];

        var displayPosts = function(posts, count) {
            for (var i = 0; i < count; i++) {
                var post = posts[i];
                elem.append($.render(post, settings.template));
            }
        };
        
        $.ajax(feed, {
            dataType: 'json',
            success: function(data) {
                elem.find('.loading').remove();
                displayPosts(data.posts, (settings.limit || data.count))
            },
            error: function() {
                elem
                    .find('.loading')
                    .addClass('error')
                    .html("There was a problem loading the blog feed.");
            }
        });
    };
})(jQuery);
