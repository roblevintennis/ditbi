$(document).ready(function () {

    $(".slider").click(function(){
        $(".ws-settings").slideToggle("slow");
    });
    // Categorized colors e.g. _ambers, _blues, etc., from colors.js
    var colors = _colorz;
    // Create a flattened colors struct so we can quickly index by key
    var flattened = {};
    _.each(_colorz, function(colorGroup) {
        _.each(colorGroup, function(value, colorname) {
            flattened[colorname] = value;
        });
    });
// ============== COLORS ============= //
    // `key` is something like "_ambers" "_whites" etc. see sass/colors/colors directory
    function getColorsByGroup(key) {
        var arr = _.map(colors[key], function(v, k) {
            return { id: k, text: k };
        });
        return arr;
    }
    /**
     * If `key` is a key to our flattened colors structure use, otherwise, assume a color value.
     */
    function getColor(key) {
        newColor = key;
        if (flattened[newColor]) {
            newColor = flattened[newColor];
        }
        return newColor;
    }
    function setColorHint(val, currentTarget) {
        var hex = flattened[val];
        hex = hex ? hex : val;
        $(currentTarget).closest('.stack').find('.half:nth-child(2)').html(val+'&mdash;'+hex).css({
            'background-color': hex,
            'padding': '2px 8px'
        });
    }
    /**
     * This will go through the color group's corresponding DOM selectors and reset the
     * `color`, `background-color`, `border`, etc., as appropriate with new color.
     * -- NOTE -- The way we do this here requires that the JavaScript selectors match
     * up with whatever's set in the Sass/CSS. If we add new rules that use colors in the
     * CSS, we'll need to keep this consistent with those new rules so dynamic updates are
     * applied as expected.
     * @param {String} group    The colors group e.g. 'color-1', 'color-6', etc.
     * @param {String} newColor The new color. Can either by a key in to our color-me-sass
     * colors, or an actual color value e.g. `red` or `#ddd`.
     */
    function setCSSColor(group, newColor) {
        var colorKey = newColor;
        newColor = getColor(newColor);
        switch (group) {
            case 'color-1':
                console.log("In color-1");
                $('.menu a').css('border', '.25em solid '+newColor);
                $('input:focus, textarea:focus').css({'border-color': newColor});
                $('input, textarea').focusin(function(evt) {
                    $(evt.currentTarget).css('border-color', newColor);
                });
                $("input, textarea").focusout(function(evt) {
                    $(evt.currentTarget).css('border-color', flattened['$whiteSmoke']);
                });
                // Changes all anchors colors (but NOT dynamic color-picker anchors)
                $('a, a:link, a:visited').not('.ws-settings a').css('color', newColor);
                // Hack since :not(:hover) no longer works properly in latest jquery :(
                $('.menu a').hover(
                    function(evt) { $(evt.currentTarget).css({
                            'color': flattened['$whiteSmoke'],
                            'background': newColor
                        });
                    },
                    function(evt) {
                        $(evt.currentTarget).css({
                            'color': newColor,
                            'background': 'transparent'
                        });
                    }
                );
                $('.color-1, .btn-primary').css('background', newColor);
                $('.adj-1').css('color', newColor);
                colorsInUse.color1 = colorKey;
                break;
            case 'color-2':
                console.log("In color-2");
                $('.color-2, .btn-secondary').css('background', newColor);
                $('.adj-2').css('color', newColor);
                $('mark').css('background', newColor);
                colorsInUse.color2 = colorKey;
                break;
            case 'color-3':
                console.log("In color-3");
                $('.color-3').css('background', newColor);
                $('.adj-3').css('color', newColor);
                colorsInUse.color3 = colorKey;
                break;
            case 'color-4':
                console.log("In color-4");
                $('.color-4').css('background', newColor);
                $('.adj-4').css('color', newColor);
                colorsInUse.color4 = colorKey;
                break;
            case 'color-5':
                console.log("In color-5");
                $('.color-5').css('background', newColor);
                $('.adj-5').css('color', newColor);
                colorsInUse.color5 = colorKey;
                break;
            case 'color-6':
                console.log("In color-6");
                $('.color-6').css('background', newColor);
                $('.adj-6').css('color', newColor);
                colorsInUse.color6 = colorKey;
                break;
            case 'color-bg':
                console.log("In color-bg");
                $('body, .masthead').css('background', newColor);
                colorsInUse.bg = colorKey;
                break;
            default:
                console.log("In default case");
                break;
        }
    }
    // Default colors start as defined here
    var colorsInUse = {
        color1: '$blueSky',
        color2: '$orangeLight',
        color3: '$redCrimson',
        color4: '$greenGroupon',
        color5: '$graySilver',
        color6: '$brownChocolate',
        // custom colors mainly for border and typo
        black: '$black',
        white: '$whiteSmoke',
        bg: '$whiteSmoke',
    };
    // This sort of makes our statically defined colors redundant
    setCSSColor('color-1', colorsInUse.color1);
    setCSSColor('color-2', colorsInUse.color2);
    setCSSColor('color-3', colorsInUse.color3);
    setCSSColor('color-4', colorsInUse.color4);
    setCSSColor('color-5', colorsInUse.color5);
    setCSSColor('color-6', colorsInUse.color6);
    setCSSColor('color-bg', colorsInUse.bg);

    var colorsForSelect2 = [
        { text: 'Ambers', children: getColorsByGroup('_ambers') },
        { text: 'Blues', children: getColorsByGroup('_blues') },
        { text: 'Bootstrap', children: getColorsByGroup('_bootstrap') },
        { text: 'Browns', children: getColorsByGroup('_browns') },
        { text: 'Grays', children: getColorsByGroup('_grays') },
        { text: 'Greens', children: getColorsByGroup('_greens') },
        { text: 'Limes', children: getColorsByGroup('_limes') },
        { text: 'Oranges', children: getColorsByGroup('_oranges') },
        { text: 'Peaches', children: getColorsByGroup('_peaches') },
        { text: 'Pinks', children: getColorsByGroup('_pinks') },
        { text: 'Preboot', children: getColorsByGroup('_preboot') },
        { text: 'Purples', children: getColorsByGroup('_purples') },
        { text: 'Reds', children: getColorsByGroup('_reds') },
        { text: 'Tans', children: getColorsByGroup('_tans') },
        { text: 'Turquoise', children: getColorsByGroup('_turquoise') },
        { text: 'Whites', children: getColorsByGroup('_whites') },
        { text: 'Yellows', children: getColorsByGroup('_yellows') }
    ];
    /**
     * These are boiler-plate select2 constructor options to remove some duplication
     * between the various color-pickers using select2
     * @type {Object}
     */
    var select2Options = {
        allowClear: true,
        initSelection : function (element, callback) {
            var data = {id: element.val(), text: element.val()};
            callback(data);
        },
        //Allow manually entering color values in text in drop down.
        createSearchChoice: function (term, data) {
            if ($(data).filter(function () {
                return this.text.localeCompare(term) === 0;
            }).length === 0) {
                return {
                    id: term,
                    text: term
                };
            }
        },
        data: colorsForSelect2
    };
    // ============== Color-1 ============= //
    $("#color-picker-1").val(colorsInUse.color1);//Set value attr so initSelection works
    $("#color-picker-1").select2(select2Options);
    $("#color-picker-1").on("change", function(e) {
        setCSSColor('color-1', e.val);
    });
    $("#color-picker-1").on("select2-highlight", function(e) {
        setCSSColor('color-1', e.val);
        setColorHint(e.val, this);
    });
    // ============== Color-2 ============= //
    $("#color-picker-2").val(colorsInUse.color2);
    $("#color-picker-2").select2(select2Options);
    $("#color-picker-2").on("change", function(e) {
        setCSSColor('color-2', e.val);
    });
    $("#color-picker-2").on("select2-highlight", function(e) {
        setCSSColor('color-2', e.val);
        setColorHint(e.val, this);
    });
    // ============== Color-3 ============= //
    $("#color-picker-3").val(colorsInUse.color3);
    $("#color-picker-3").select2(select2Options);
    $("#color-picker-3").on("change", function(e) {
        // console.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed}));
        setCSSColor('color-3', e.val);
    });
    $("#color-picker-3").on("select2-highlight", function(e) {
        // console.log("highlighted val="+ e.val+" choice="+ JSON.stringify(e.choice));
        setCSSColor('color-3', e.val);
        setColorHint(e.val, this);
    });
    // ============== Color-4 ============= //
    $("#color-picker-4").val(colorsInUse.color4);
    $("#color-picker-4").select2(select2Options);
    $("#color-picker-4").on("change", function(e) {
        setCSSColor('color-4', e.val);
    });
    $("#color-picker-4").on("select2-highlight", function(e) {
        setCSSColor('color-4', e.val);
        setColorHint(e.val, this);
    });
    // ============== Color-5 ============= //
    $("#color-picker-5").val(colorsInUse.color5);
    $("#color-picker-5").select2(select2Options);
    $("#color-picker-5").on("change", function(e) {
        setCSSColor('color-5', e.val);
    });
    $("#color-picker-5").on("select2-highlight", function(e) {
        setCSSColor('color-5', e.val);
        setColorHint(e.val, this);
    });
    // ============== Color-6 ============= //
    $("#color-picker-6").val(colorsInUse.color6);
    $("#color-picker-6").select2(select2Options);
    $("#color-picker-6").on("change", function(e) {
        setCSSColor('color-6', e.val);
    });
    $("#color-picker-6").on("select2-highlight", function(e) {
        setCSSColor('color-6', e.val);
        setColorHint(e.val, this);
    });
    // ============== Background Color ============= //
    $("#color-picker-bg").val(colorsInUse.bg);
    $("#color-picker-bg").select2(select2Options);
    $("#color-picker-bg").on("change", function(e) {
        setCSSColor('color-bg', e.val);
    });
    $("#color-picker-bg").on("select2-highlight", function(e) {
        setCSSColor('color-bg', e.val);
        setColorHint(e.val, this);
    });
// ============== TYPOGRAPHY ============= //
    // Serif font-stacks
    // TODO: These are pulled out from _font-stack.scss. Probably should eventually have a node.js to pick up (although the font-stack lib doesn't seem to get updated anymore so might not be worthwhile ROI)
    var fonts = {
        serifs: {
            '$garamond-font-stack': "Garamond, Baskerville, 'Baskerville Old Face', 'Hoefler Text', 'Times New Roman', serif",
            '$lucida-bright-font-stack': '"Lucida Bright", Georgia, serif',
            '$palatino-font-stack': 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif',
            '$big-caslon-font-stack': '"Big Caslon", "Book Antiqua", "Palatino Linotype", Georgia, serif',
            '$didot-font-stack': 'Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif',
            '$baskerville-font-stack': 'Baskerville, "Baskerville old face", "Hoefler Text", Garamond, "Times New Roman", serif',
            '$hoefler-text-font-stack': '"Hoefler Text", "Baskerville old face", Garamond, "Times New Roman", serif',
            '$bodoni-mt-font-stack': '"Bodoni MT", Didot, "Didot LT STD", "Hoefler Text", Garamond, "Times New Roman", serif',
            '$goudy-old-style-font-stack': '"Goudy Old Style", Garamond, "Big Caslon", "Times New Roman", serif',
            '$constantia-font-stack': 'Constantia, Palatino, "Palatino Linotype", "Palatino LT STD", Georgia, serif',
            '$cambria-font-stack': 'Cambria, Georgia, serif',
            '$book-antiqua-font-stack': '"Book Antiqua", Palatino, "Palatino Linotype", "Palatino LT STD", Georgia, serif',
        },
        // Sans-Serif font-stacks
        sans: {
            '$optima-font-stack': 'Optima, Segoe, "Segoe UI", Candara, Calibri, Arial, sans-serif',
            '$futura-font-stack': 'Futura, "Trebuchet MS", Arial, sans-serif',
            '$gill-sans-font-stack': '"Gill Sans", "Gill Sans MT", Calibri, sans-serif',
            '$trebuchet-font-stack': '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif',
            '$helvetica-font-stack': '"Helvetica Neue", Arial, Helvetica, sans-serif',
            '$verdana-font-stack': 'Verdana, Geneva, sans-serif',
            '$lucida-grande-font-stack': '"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif',
            '$geneva-font-stack': 'Geneva, Tahoma, Verdana, sans-serif',
            '$segoe-font-stack': 'Segoe, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
            '$candara-font-stack': 'Candara, Calibri, Segoe, "Segoe UI", Optima, Arial, sans-serif',
            '$calibri-font-stack': 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif',
            '$franklin-gothic-font-stack': '"Franklin Gothic Medium", Arial, sans-serif',
            '$tahoma-font-stack': 'Tahoma, Geneva, Verdana, sans-serif'
        },
        misc: {
            '$monospace-font-stack': '"Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace',
            '$cursive-font-stack': '"Bradley Hand ITC", "Apple Chancery", "URW Chancery L", cursive'
        }
    };
    var flattenedFonts = {};
    _.each(fonts, function(fontGrp) {
        _.each(fontGrp, function(value, fontname) {
            flattenedFonts[fontname] = value;
        });
    });
    function getFontByGroup(key) {
        var arr,
            grp = fonts[key];
        arr = _.map(grp, function(v, k) {
            return { id: k, text: k };
        });
        return arr;
    }
    function setFontHint(val, currentTarget) {
        var fontStackValue = flattenedFonts[val];
        fontStackValue = fontStackValue ? fontStackValue : val;
        $(currentTarget).closest('.stack').find('.half:nth-child(2)')
            .css({
                'font-family': fontStackValue,
                'padding': '2px 8px'
            })
            .html(val+'&mdash;'+fontStackValue);
    }
    function setCSSFont(group, newFont) {
        var fontKey = newFont;
        newFont = flattenedFonts[newFont];
        newFont = newFont ? newFont : fontKey;
        switch (group) {
            case 'main':
                console.log("In main font case");
                $('body, input, textarea, button, form, select').css('font-family', newFont);
                fontsInUse.main = fontKey;
                break;
            case 'titles':
                console.log("In titles font case");
                $('h1, h2, h3, h4, h5, h6').css('font-family', newFont);
                fontsInUse.titles = fontKey;
                break;
            default:
                // NOP ... TODO: Need to maybe have secondary/tertiary fonts?
                break;
        }
    }
    var fontsInUse = {
        'main': '$tahoma-font-stack',
        'titles': '$palatino-font-stack'
    };
    var fontStacksForSelect2 = [
        { text: 'Serifs', children: getFontByGroup('serifs') },
        { text: 'Sans-Serifs', children: getFontByGroup('sans') },
        { text: 'Misc', children: getFontByGroup('misc') }
    ];
    // Clone over our select2Options and tweak for fonts
    var fontSelect2Options= _.clone(select2Options);
    fontSelect2Options.placeholder = 'Select font-stack';
    fontSelect2Options.data = fontStacksForSelect2;
    // Fonts - Main
    $("#font-picker").val(fontsInUse['main']);//Set value attr so initSelection works
    $("#font-picker").select2(fontSelect2Options);
    $("#font-picker").on("change", function(e) {
        setCSSFont('main', e.val);
    });
    $("#font-picker").on("select2-highlight", function(e) {
        setCSSFont('main', e.val);
        setFontHint(e.val, this);
    });
    // Fonts - Titles
    $("#font-picker-titles").val(fontsInUse['titles']);//Set value attr so initSelection works
    $("#font-picker-titles").select2(fontSelect2Options);
    $("#font-picker-titles").on("change", function(e) {
        setCSSFont('titles', e.val);
    });
    $("#font-picker-titles").on("select2-highlight", function(e) {
        setCSSFont('titles', e.val);
        setFontHint(e.val, this);
    });
// ============== WEBSTILES EXPORT ============= //
    $(".export > .button").on("click", function(evt) {
        exportSettings(
            '<h3>CSS</h3>'+
            '<pre>'+
                '.color-1 { background: '+flattened[colorsInUse.color1]+'; }\n'+
                '.color-2 { background: '+flattened[colorsInUse.color2]+'; }\n'+
                '.color-3 { background: '+flattened[colorsInUse.color3]+'; }\n'+
                '.color-4 { background: '+flattened[colorsInUse.color4]+'; }\n'+
                '.color-5 { background: '+flattened[colorsInUse.color5]+'; }\n'+
                '.color-6 { background: '+flattened[colorsInUse.color6]+'; }\n'+
                '.bg { background: '+flattened[colorsInUse.bg]+'; }\n'+
                '.font-main { font-family: '+flattenedFonts[fontsInUse.main]+'; }\n'+
                '.font-title { font-family: '+flattenedFonts[fontsInUse.titles]+'; }\n'+
            '</pre>'+
            '<h3>Sass</h3>'+
            '<pre>See: sass/colors/colors/_color-me-sass.scss</pre>'+
            '<p>These are from the excellent <a href="http://www.richbray.me/cms/" target="_new">color-me-sass</a> library</p>'+
            '<pre>'+
                '.color-1 { background: '+colorsInUse.color1+'; }\n'+
                '.color-2 { background: '+colorsInUse.color2+'; }\n'+
                '.color-3 { background: '+colorsInUse.color3+'; }\n'+
                '.color-4 { background: '+colorsInUse.color4+'; }\n'+
                '.color-5 { background: '+colorsInUse.color5+'; }\n'+
                '.color-6 { background: '+colorsInUse.color6+'; }\n'+
                '.bg { background: '+colorsInUse.bg+'; }\n'+
                '.font-main { font-family: '+fontsInUse.main+'; }\n'+
                '.font-title { font-family: '+fontsInUse.titles+'; }\n'+
            '</pre>'+
            '<h3>Less</h3>'+
            '<p>For these you will need to use the Less version of <a href="http://www.richbray.me/cms/" target="_new">color-me-sass</a></p>'+
            '<pre>'+
                '.color-1 { background: '+colorsInUse.color1.replace('$','@')+'; }\n'+
                '.color-2 { background: '+colorsInUse.color2.replace('$','@')+'; }\n'+
                '.color-3 { background: '+colorsInUse.color3.replace('$','@')+'; }\n'+
                '.color-4 { background: '+colorsInUse.color4.replace('$','@')+'; }\n'+
                '.color-5 { background: '+colorsInUse.color5.replace('$','@')+'; }\n'+
                '.color-6 { background: '+colorsInUse.color6.replace('$','@')+'; }\n'+
                '.bg { background: '+colorsInUse.bg.replace('$','@')+'; }\n'+
                '.font-main { font-family: '+fontsInUse.main.replace('$','@')+'; }\n'+
                '.font-title { font-family: '+fontsInUse.titles.replace('$','@')+'; }\n'+
            '</pre>' +
            '<h3>Zurb Foundation</h3>'+
            '<p><i>Assumes inclusion of <a href="http://www.richbray.me/cms/" target="_new">color-me-sass</a> library</i></p>'+
            '<p>Create a file in your project such as:</p>'+
            '<pre>myapp/sass/_settings-overrides.scss</pre>'+
            '<p>Then in your main app.scss import it BEFORE foundation:</p>'+
            '<pre>@import "settings-overrides";</pre>'+
            '<pre>'+
                '$primary-color: '+colorsInUse.color1+';\n'+
                '$secondary-color: '+colorsInUse.color2+';\n'+
                '$alert-color: '+colorsInUse.color3+';\n'+
                '$success-color: '+colorsInUse.color4+';\n'+
                '$body-bg: '+colorsInUse.bg+';\n'+
                '$body-font-family: '+fontsInUse.main+';\n'+
                '$header-font-family: '+fontsInUse.titles+';\n'+
            '</pre>' +
            '<p>If you do not want to include color-me-sass, simply replace with literal values from CSS section above.<p>'+
            '<h3>Twitter Bootstrap</h3>'+
            '<p>Bootstrap requires some fiddling because they do not use names like <pre>primary-color secondary-color ...</pre> But hope is not lost...you can still use the above LESS settings to customize <a href="https://github.com/twitter/bootstrap">Bootstrap</a> by simply overriding the <a href="https://github.com/twitter/bootstrap/blob/master/less/variables.less">variables.less file</a> by creating your own <pre>variables-overrides.less</pre> file, and include it AFTER the bootstrap _variables.less partial. Then simply edit to taste. Disclaimer: You must know how to compile LESS and also be using color-me-sass!</p>' +
            '<p>Suggestions: In your variables override file, you may redefine colors in the "Accent colors" section like: <pre>@blue @red</pre> In the Typography section replace variables like: <pre>@sansFontFamily @serifFontFamily</pre> Just look around in there as their definitions are self-evident.' +
            '<p>You can find more clues on Bootstrap variable naming conventions in: <pre>sass/colors/colors/_bootstrap.scss</pre>'
        );
    });
    // Pops up a new window where user can copy webstiles CSS/Sass/Less settings
    function exportSettings(content) {
        top.consoleRef=window.open('','settings-export',
            'width=500,height=850'
            +',menubar=0'
            +',toolbar=0'
            +',status=0'
            +',scrollbars=1'
            +',resizable=1', true);
        top.consoleRef.document.writeln(
            '<html><head><title>Webstiles Settings Export</title></head>'
            +'<body bgcolor=white onLoad="self.focus()">'
            +content
            +'</body></html>');
        top.consoleRef.document.close();
    }
});