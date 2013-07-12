$(document).ready(function () {

    // Toggles open/closed the settings drawer
    $(".slider").click(function(){
        $(".settings").slideToggle("slow");
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
     * @param {String} group    The colors group e.g. 'primary-color', 'color-6', etc.
     * @param {String} newColor The new color. Can either by a key in to our color-me-sass
     * colors, or an actual color value e.g. `red` or `#ddd`.
     */
    function setCSSColor(group, newColor) {
        var colorKey = newColor;
        newColor = getColor(newColor);
        switch (group) {
            case 'primary-color':
                $('.menu a').css('border', '.25em solid '+newColor);
                $('input:focus, textarea:focus').css({'border-color': newColor});
                $('input, textarea').focusin(function(evt) {
                    $(evt.currentTarget).css('border-color', newColor);
                });
                $("input, textarea").focusout(function(evt) {
                    $(evt.currentTarget).css('border-color', flattened['$whiteSmoke']);
                });
                // Changes all anchors colors (but NOT dynamic color-picker anchors)
                $('a, a:link, a:visited').not('.settings a').not('.button').css('color', newColor);
                // Hack since :not(:hover) no longer works properly in latest jquery :(
                $('.menu a').hover(
                    function(evt) {
                        $(evt.currentTarget).css({
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
                $('.primary').css('background-color', newColor);
                $('.primary').hover(
                    function(evt) {
                        $(evt.currentTarget).css({'opacity':'0.85'});
                    },
                    function(evt) {
                        $(evt.currentTarget).css({'opacity':'1.0'});
                    }
                );
                $('.adj-1').css('color', newColor);
                colorsInUse.primaryColor = colorKey;
                break;
            case 'secondary-color':
                $('.secondary-color, .secondary').css('background-color', newColor);
                $('.secondary').hover(
                    function(evt) {
                        $(evt.currentTarget).css({'opacity':'0.85'});
                    },
                    function(evt) {
                        $(evt.currentTarget).css({'opacity':'1.0'});
                    }
                );
                $('.adj-2').css('color', newColor);
                $('mark').css('background', newColor);
                colorsInUse.secondaryColor = colorKey;
                break;
            case 'alert-color':
                $('.alert-color, .button.alert').css('background-color', newColor);
                $('.alert').hover(
                    function(evt) {
                        $(evt.currentTarget).css({'opacity':'0.75'});
                    },
                    function(evt) {
                        $(evt.currentTarget).css({'opacity':'1.0'});
                    }
                );
                $('.adj-3').css('color', newColor);
                colorsInUse.alertColor = colorKey;
                break;
            case 'success-color':
                $('.success-color, .button.success').css('background-color', newColor);
                $('.success').hover(
                    function(evt) {
                        $(evt.currentTarget).css({'opacity':'0.85'});
                    },
                    function(evt) {
                        $(evt.currentTarget).css({'opacity':'1.0'});
                    }
                );
                $('.adj-4').css('color', newColor);
                colorsInUse.successColor = colorKey;
                break;
            case 'color-5':
                $('.color-5').css('background-color', newColor);
                $('.adj-5').css('color', newColor);
                colorsInUse.color5 = colorKey;
                break;
            case 'color-6':
                $('.color-6').css('background-color', newColor);
                $('.adj-6').css('color', newColor);
                colorsInUse.color6 = colorKey;
                break;
            case 'color-bg':
                $('.main').css('background-color', newColor);
                colorsInUse.bg = colorKey;
                break;
            default:
                console.log("In default case .. huh?");
                break;
        }
    }
    // Default colors start as defined here
    var colorsInUse = {
        primaryColor: '$blueSky',
        secondaryColor: '$orangeLight',
        alertColor: '$redCrimson',
        successColor: '$greenGroupon',
        color5: '$graySilver',
        color6: '$brownChocolate',
        black: '$black',
        white: '$whiteSmoke',
        bg: '$whiteSmoke',
    };
    // This sort of makes our statically defined colors redundant
    setCSSColor('primary-color', colorsInUse.primaryColor);
    setCSSColor('secondary-color', colorsInUse.secondaryColor);
    setCSSColor('alert-color', colorsInUse.alertColor);
    setCSSColor('success-color', colorsInUse.successColor);
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
    $("#color-picker-1").val(colorsInUse.primaryColor);//Set value attr so initSelection works
    $("#color-picker-1").select2(select2Options);
    $("#color-picker-1").on("change", function(e) {
        setCSSColor('primary-color', e.val);
    });
    $("#color-picker-1").on("select2-highlight", function(e) {
        setCSSColor('primary-color', e.val);
        setColorHint(e.val, this);
    });
    // ============== Color-2 ============= //
    $("#color-picker-2").val(colorsInUse.secondaryColor);
    $("#color-picker-2").select2(select2Options);
    $("#color-picker-2").on("change", function(e) {
        setCSSColor('secondary-color', e.val);
    });
    $("#color-picker-2").on("select2-highlight", function(e) {
        setCSSColor('secondary-color', e.val);
        setColorHint(e.val, this);
    });
    // ============== Color-3 ============= //
    $("#color-picker-3").val(colorsInUse.alertColor);
    $("#color-picker-3").select2(select2Options);
    $("#color-picker-3").on("change", function(e) {
        setCSSColor('alert-color', e.val);
    });
    $("#color-picker-3").on("select2-highlight", function(e) {
        setCSSColor('alert-color', e.val);
        setColorHint(e.val, this);
    });
    // ============== Color-4 ============= //
    $("#color-picker-4").val(colorsInUse.successColor);
    $("#color-picker-4").select2(select2Options);
    $("#color-picker-4").on("change", function(e) {
        setCSSColor('success-color', e.val);
    });
    $("#color-picker-4").on("select2-highlight", function(e) {
        setCSSColor('success-color', e.val);
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

// ============== Textures ============= //
    var textureInUse = null;
    function setTexture(name) {
        var url = 'url('+ _texturez[name] +')';
        $('body').css('background-image', url);
        textureInUse = url;
    }
    function getTexture(key) {
        return _texturez[key] || null;
    }
    function createTexturesForSelect2() {
        return _.map(_texturez, function(v, k) {
            return {id: k, text: k};
        });
    }
    // Create a data structure for select2 of our textures like [{id:foo,text:bar},...]
    var texturesForSelect2 = createTexturesForSelect2();
    var textureSelect2Options= _.clone(select2Options);
    textureSelect2Options.placeholder = 'Select Texture';
    textureSelect2Options.data = texturesForSelect2;
    // Texture dropdown picker
    $("#texture-picker").val('None');
    $("#texture-picker").select2(textureSelect2Options);
    $("#texture-picker").on("change", function(e) {
        setTexture(e.val);
    });
    $("#texture-picker").on("select2-highlight", function(e) {
        setTexture(e.val);
    });

// ============== TYPOGRAPHY ============= //
    var fonts = {
        //Serif font-stacks
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
        //Sans font-stacks
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
        'titles': '$helvetica-font-stack'
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
    // ============== EXPORT ============= //
    $(".export-settings").on("click", function(evt) {
        var textureUsed = textureInUse ? 'ELEMENT_TO_APPLY_TEXTURE_TO { background-image: '+textureInUse+'; }\n' : '';
        exportSettings(
            '<h3>CSS</h3>'+
            '<pre>'+
                '.primary-color { background: '+flattened[colorsInUse.primaryColor]+'; }\n'+
                '.secondary-color { background: '+flattened[colorsInUse.secondaryColor]+'; }\n'+
                '.alert-color { background: '+flattened[colorsInUse.alertColor]+'; }\n'+
                '.success-color { background: '+flattened[colorsInUse.successColor]+'; }\n'+
                '.color-5 { background: '+flattened[colorsInUse.color5]+'; }\n'+
                '.color-6 { background: '+flattened[colorsInUse.color6]+'; }\n'+
                textureUsed +
                '.bg { background: '+flattened[colorsInUse.bg]+'; }\n'+
                '.font-main { font-family: '+flattenedFonts[fontsInUse.main]+'; }\n'+
                '.font-title { font-family: '+flattenedFonts[fontsInUse.titles]+'; }\n'+
            '</pre>'+
            '<h3>Zurb Foundation</h3>'+
            '<p><i>Assumes inclusion of <a href="http://www.richbray.me/cms/" target="_new">color-me-sass</a> library, but you can alternatively just copy over the values from the CSS section above.</i></p>'+
            '<p>Find the following file and move to your project copying the variable values below:</p>'+
            '<pre>sass/partials/_settings-overrides.scss</pre>'+
            '<p>In your main app.scss or base.scss, etc., import it BEFORE foundation:</p>'+
            '<pre>@import "settings-overrides";</pre>'+
            '<p>Here are the values you should copy in to this file:</p>'+
            '<pre>'+
                '$primary-color: '+colorsInUse.primaryColor+';\n'+
                '$secondary-color: '+colorsInUse.secondaryColor+';\n'+
                '$alert-color: '+colorsInUse.alertColor+';\n'+
                '$success-color: '+colorsInUse.successColor+';\n'+
                '$body-bg: '+colorsInUse.bg+';\n'+
                textureUsed +
                '/* These fonts require the partial: sass/partials/_font-stack.scss. Altneratively, copy over values from CSS section above */\n'+
                '$body-font-family: '+fontsInUse.main+';\n'+
                '$header-font-family: '+fontsInUse.titles+';\n'+
            '</pre>' +
            '<p>If you do not want to include color-me-sass, simply replace with literal values from CSS section above.<p>'+
            '<h3>Sass</h3>'+
            '<pre>See: sass/colors/colors/_color-me-sass.scss</pre>'+
            '<p>These are from the excellent <a href="http://www.richbray.me/cms/" target="_new">color-me-sass</a> library</p>'+
            '<pre>'+
                '.primary-color { background: '+colorsInUse.primaryColor+'; }\n'+
                '.secondary-color { background: '+colorsInUse.secondaryColor+'; }\n'+
                '.alert-color { background: '+colorsInUse.alertColor+'; }\n'+
                '.success-color { background: '+colorsInUse.successColor+'; }\n'+
                '.color-5 { background: '+colorsInUse.color5+'; }\n'+
                '.color-6 { background: '+colorsInUse.color6+'; }\n'+
                '.bg { background: '+colorsInUse.bg+'; }\n'+
                textureUsed +
                '/* These fonts require the partial: sass/partials/_font-stack.scss. Altneratively, copy over values from CSS section above */\n'+
                '.font-main { font-family: '+fontsInUse.main+'; }\n'+
                '.font-title { font-family: '+fontsInUse.titles+'; }\n'+
            '</pre>'+
            '<h3>Less</h3>'+
            '<p>For these you will need to use the Less version of <a href="http://www.richbray.me/cms/" target="_new">color-me-sass</a></p>'+
            '<pre>'+
                '.primary-color { background: '+colorsInUse.primaryColor.replace('$','@')+'; }\n'+
                '.secondary-color { background: '+colorsInUse.secondaryColor.replace('$','@')+'; }\n'+
                '.alert-color { background: '+colorsInUse.alertColor.replace('$','@')+'; }\n'+
                '.success-color { background: '+colorsInUse.successColor.replace('$','@')+'; }\n'+
                '.color-5 { background: '+colorsInUse.color5.replace('$','@')+'; }\n'+
                '.color-6 { background: '+colorsInUse.color6.replace('$','@')+'; }\n'+
                '.bg { background: '+colorsInUse.bg.replace('$','@')+'; }\n'+
                textureUsed +
                '/* These fonts require the partial: sass/partials/_font-stack.scss. Altneratively, copy over values from CSS section above */\n'+
                '.font-main { font-family: '+fontsInUse.main.replace('$','@')+'; }\n'+
                '.font-title { font-family: '+fontsInUse.titles.replace('$','@')+'; }\n'+
            '</pre>' +
            '<h3>Twitter Bootstrap</h3>'+
            '<p>Bootstrap requires some fiddling because they do not use names like <pre>primary-color secondary-color ...</pre> But hope is not lost...you can still use the above LESS settings to customize <a href="https://github.com/twitter/bootstrap">Bootstrap</a> by simply overriding the <a href="https://github.com/twitter/bootstrap/blob/master/less/variables.less">variables.less file</a> by creating your own <pre>variables-overrides.less</pre> file, and include it AFTER the bootstrap _variables.less partial. Then simply edit to taste. Disclaimer: You must know how to compile LESS and also be using color-me-sass!</p>' +
            '<p>Suggestions: In your variables override file, you may redefine colors in the "Accent colors" section like: <pre>@blue @red</pre> In the Typography section replace variables like: <pre>@sansFontFamily @serifFontFamily</pre> Just look around in there as their definitions are self-evident.' +
            '<p>You can find more clues on Bootstrap variable naming conventions in: <pre>sass/colors/colors/_bootstrap.scss</pre>'
        );
    });
    // Pops up a new window where user can copy ditbi CSS/Sass/Less settings
    function exportSettings(content) {
        top.consoleRef=window.open('','settings-export',
            'width=500,height=850'
            +',menubar=0'
            +',toolbar=0'
            +',status=0'
            +',scrollbars=1'
            +',resizable=1', true);
        top.consoleRef.document.writeln(
            '<html><head><title>ditbi Settings Export</title></head>'
            +'<body bgcolor=white onLoad="self.focus()">'
            +content
            +'</body></html>');
        top.consoleRef.document.close();
    }
});
