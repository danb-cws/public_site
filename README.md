# Dan Brown's folio - early WIP.
Based on my Node/Webpack boilerplate v1

On Heroku - [cwss.herokuapp.com](http://cwss.herokuapp.com)
*Please note: this is currently on the freebie Heroku plan, which sleeps after 30 mins inactivity, if sleeping it can take 15 sec to spin up!*

###Featuring:
- **Node**
- **Express** - Node based server
- **Webpack** - build tool and module bundler [https://webpack.github.io/](https://webpack.github.io/)<br/>
[https://github.com/petehunt/webpack-howto](https://github.com/petehunt/webpack-howto)
- **Hot Module Reload** - Similar to Live Reload but on a module level, very useful if you might have had to go through many UI steps, form filling etc, to create that module state [https://www.npmjs.com/package/webpack-hot-middleware](https://www.npmjs.com/package/webpack-hot-middleware)
- **Babel** - transpile ES6 to code for todays browsers
- **PostCSS** - JS-powered css transformer that can replace preprocessors and do much more [https://github.com/postcss/postcss](https://github.com/postcss/postcss)
- **Precss** - PostCSS plugin for sass-like tools, eg nesting rules
- **CssNext** - PostCSS plugin: written by the same dev as Autoprefixer, does everything Autoprefixer does and also polyfills some useful css4 features allowing you to use tomorrows syntax today
- **Dust templating** - templating language for use on client and server by Linkedin [http://www.dustjs.com/](http://www.dustjs.com/)
- **Eslint with Air bnb config** - Configurable linter to enforce coding style across a team [https://www.npmjs.com/package/eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
- **Sourcemapping** - for js and css is preserved (for dev build)
- **Gzip** - compression enabled (with optional threshold) for files served by Express
- **Image optimisation** - small images are inlined as base64 (up to a config threshold filesize), larger images optimised

###Instructions
- Ensure you have Node and npm installed (node version set at 5.10.1, amend the "engines" line in package.json if you want to try another version)
- in the working dir, run in terminal _npm install_
- for dev build, run _npm run start-dev_
- for prod build, run _npm run start-prod_
- _Ctrl+C_ to stop
- open _localhost:5000_ in your browser

###Exploring
- Dev build will have:
  * Linting run prebuild, errors will show in terminal
  * Hot Module Reload (try editing any module, eg js/testvar.js edit 'name', you will see it immediately reflected in the browser. Also, in the example, sass files have been included as dependancies, so for example try editing the sass variables file, again you will see the browser reflect changes)
  * Sourcemaps are preserved - inspecting elements will point you to the correct line in the sass file. In the 'sources' tab in Chrome devtools, you will see a Webpack:// source, open ./ then js and you will see the individual js modules. You can put in breakpoints here and debug!
- Prod build will have:
  * No linting
  * No sourcemaps
  * js and css minified
  * Assets will have a hash added to the filename to control caching.
  * css will be written to file and included in the head (in dev build Webpack serves all this from memory)
  * Various other optimisations
  
###Notes
- In dev build, Webpack will serve from memory (for this reason, you may notice FOUT). In prod, optimised assets will be served from ./dist/ directory. This will be destroyed on each build. For this reason in dev build there will be NO DIST directory. (This behaviour may have to be revisited if the build gets too slow)

###Gotchas:
- To pass enviromment variables Windows users will have to amend from export to SET in the scripts block of package.json from eg:

    "start-dev": "export NODE_ENV=development&& node ./src/server.js",<br/>to:<br/> 
    "start-dev": "SET NODE_ENV=development&& node ./src/server.js",
    
    For Mac users, vice versa, edit to "export" from "SET"
    
    Please note the lack of a space before &&
- Antivirus may break hot reload (exclude your working dir from your AV)
- Webstorm 2016 needs the option unchecked "use safe write" for hot reload to work.
This could apply to other editors. (Safe write: tries to write to a temp file first)
