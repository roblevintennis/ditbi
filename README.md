# What is ditbi?

[ditbi][ditbi] is a tool for designing in the browser interactively. Simply open up the index.htm page, click the settings button on the top of the page and select your color and typography settings. From there, you can click 'Export' to get CSS, Sass/SCSS, LESS, Zurb Foundation settings. Paste those in to your project as you see fit and your off and running.

ditbi pulls in a few choice `git submodule` libs: [color-me-sass][color-me-sass] for some excellent colors to create your palette from, and [Zurb Foundation][foundation], used only for the generated styleguide. ditbi tries to use similar CSS class or id's as Foundation.

# Fast Start

This repo uses submodules so if you're going to pull in everything required you have to do:

```bash
# Add the –recursive flag to git clone command:
git clone THIS_REPO_URL --recursive
# Or, manually initialize submodules after the clone
git clone THIS_REPO_URL && git submodule update --init --recursive
```
See https://twoguysarguing.wordpress.com/2010/11/14/tie-git-submodules-to-a-particular-commit-or-branch/ for details on how this works.

# Sass How To

Using [ditbi][ditbi] is as simple as opening the `index.htm` page and playing around with the settings. However, if you'd like to "go deeper" and/or contribute back to the project, you'll want to become familiar with the files in the `./sass/*` directory. Please see the following resources for more information if you're new to Sass (or just go ahead and edit the CSS directly if you're looking for a quick one-off solution and don't have time for all this Sass stuff!):

* [Setting up for Sass development][settingup]
* [Compass/Sass chapter][sasschapter]

[settingup]: https://github.com/roblevintennis/rapid-prototyping-book/blob/master/chapters/02_setting_up_for_rapid_dev.md
[sasschapter]: https://github.com/roblevintennis/rapid-prototyping-book/blob/master/chapters/03_compass_sass.md

If you just want to edit and go and you've obtained this via `git clone`, you'll need to enable the submodule for [color-me-sass][color-me-sass] and Zurb [Foundation] as follows:

```bash
git submodule update --init --recursive
```

_To optionally sync [ditbi][ditbi] with the latest [color-me-sass][color-me-sass] submodule update, we have a Node.js script: `./scripts/create-colors-config.js` that will ensure that the very latest color-me-sass variables are being used from within ditbi (of course this requires Node.js!) If you're going to do this you should have cd'd to the submodule directory and pulled in a later version of [color-me-sass][color-me-sass] before this._

```bash
./scripts/create-colors-config.js
# ... output omitted for brevity
--- Writing out Colors JavaScript ---
Colors JavaScript written to:  /Users/rlevin/programming/labs/ditbi/scripts/js/colors.js
```

The above `colors.js` defines the variables that are used in the dynamic color-pickers (the dropdowns you see on the index.htm page for selecting colors).

Then simply do the following to set up Compass / Sass:

```bash
# Windows
$ gem install compass
# Linux/OS X
$ sudo gem install compass
```

Now, while in this project's root directory, open a new terminal tab and watch for any changes (or use the free tool [Scout][scout] if you're more GUI inclined) with:

```
compass watch
```

[scout]: http://mhs.github.io/scout-app/

## Contributors

#### [Rob Levin](https://github.com/roblevintennis) - Lead Developer

[namanyayg]: http://namanyayg.com/
[webstiles]: https://github.com/namanyayg/webstiles
[ditbi]: https://github.com/roblevintennis/ditbi
[color-me-sass]: https://github.com/RichardBray/color-me-sass
[foundation]: https://github.com/zurb/foundation/tree/scss-standalone

## Project History

[ditbi][ditbi] originally started as a fork of [Webstiles][webstiles], the brain-child of [Namanyay Goel][namanyayg], creator and maintainer of the Webstiles project. Since the primary goals of the two tools are quite different, a new project was created for ditbi. How are they different? While Webstiles is essentially a static template (heavily inspired from Style Tiles) that helps you prototype in the browser and create a static design deliverable to show your client, _ditbi_ aims more to be a creative workflow tool that helps you to interactively experiment with colors and typography for your web site. The end goal of dipti is to simply export your selected colors and typpography settings such that you can easily paste them over in to your web site or style guide. It's essentially a first step in your _design in the browser_ workflow.

