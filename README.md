# What is ditbi?

[ditbi][ditbi] is a tool for designing in the browser interactively. Simply open up the index.html page, click the settings button on the top of the page and select your color and typography settings. From there, you can click the 'Show Me' dropdown and select 'Export Settings' to get CSS, Sass/SCSS, LESS, Zurb Foundation settings. Paste those in to your project as you see fit and your off and running.

ditbi pulls in a few choice `git submodule` libs: [color-me-sass][color-me-sass] for some excellent colors to create your palette from, and [Zurb Foundation][foundation], used only for the generated styleguide. ditbi tries to use similar CSS class or id's as Foundation.

Short video demo: http://www.youtube.com/watch?v=ERgFCJFpq5E

# Fast Start

First ensure you have Compass installed:

```bash
# Windows
$ gem install compass
# Linux/OS X
$ sudo gem install compass
```

Next, as this repo uses submodules you'll pull in everything required by adding the `--recursive` option when you clone:

```bash
# Add the –recursive flag to pull in all submodules, etc.:
git clone git@github.com:roblevintennis/ditbi.git --recursive
```

See https://twoguysarguing.wordpress.com/2010/11/14/tie-git-submodules-to-a-particular-commit-or-branch/ for details on how this works.

## Zurb Foundation and the _settings-overrides.scss file

As mentioned we've optimized ditbi to work with with Zurb Foundation, you can immediately view your color and font changes. Here's how:

1.  Open Settings and configure to taste
2.  Click 'Show Me' dropdown and select 'Export Settings'
3.  Copy the code snippet from the popup to your clipboard. These should look like:

```css
$primary-color: $blueSky;
$secondary-color: $orangeLight;
$alert-color: $redCrimson;
$success-color: $greenGroupon;
$body-bg: $whiteSmoke;
$body-font-family: $tahoma-font-stack;
$header-font-family: $helvetica-font-stack;
```

4. Paste these in to the `sass/partials/_settings-overrides.scss` file below:

```css
/* ------- Place your overrides here ------ */
```

5. Compile with either of:

```bash
compass watch # or compass compile for one-time compile
```

6. Reselect 'Show Me' dropdown and select 'View Components' to see Zurb Foundation components page

# Contributing

See the https://github.com/roblevintennis/ditbi/wiki/Developer-Quick-Start wiki page.

## Contributors

#### [Rob Levin](https://github.com/roblevintennis) - Lead Developer

## Project History

[ditbi][ditbi] originally started as a fork of [Webstiles][webstiles], the brain-child of [Namanyay Goel][namanyayg], creator and maintainer of the Webstiles project. Since the primary goals of the two tools are quite different, a new project was created for ditbi. How are they different? While Webstiles is essentially a static template (heavily inspired from Style Tiles) that helps you prototype in the browser and create a static design deliverable to show your client, _ditbi_ aims more to be a creative workflow tool that helps you to interactively experiment with colors and typography for your web site. The end goal of ditbi is to simply export your selected colors and typpography settings such that you can easily paste them over in to your web site or style guide. It's essentially a first step in your _design in the browser_ workflow.

[namanyayg]: http://namanyayg.com/
[webstiles]: https://github.com/namanyayg/webstiles
[ditbi]: https://github.com/roblevintennis/ditbi
[color-me-sass]: https://github.com/RichardBray/color-me-sass
[foundation]: https://github.com/zurb/foundation/tree/scss-standalone
