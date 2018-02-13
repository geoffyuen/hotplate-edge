$(function() {

  CMS.init({

    // Name of your site or location of logo file, relative to root directory (img/logo.png)
    siteName: 'Hotplate',

    // Tagline for your site
    siteTagline: 'Starter project for building websites',

    // Email address
    siteEmail: 'geoffyuen@gmail.com',

    // Name
    siteAuthor: 'Geoff Yuen',

    // Navigation items
    siteNavItems: [
      { name: 'Gulp'},
      { name: 'Images'},
      { name: 'Sass'},
      { name: 'Grid'},
      { name: 'Blog', href: '#posts', newWindow: false},
      { name: 'Github↗', href: 'https://github.com/geoffyuen/hotplate-edge', newWindow: false}
    ],

    // Posts folder name
    postsFolder: 'posts',

    // Homepage posts snippet length
    postSnippetLength: 120,

    // Pages folder name
    pagesFolder: 'pages',

    // Order of sorting (true for newest to oldest)
    sortDateOrder: true,

    // Posts on Frontpage (blog style)
    postsOnFrontpage: false,

    // Page as Frontpage: pass title of page (static)
    pageAsFrontpage: 'Hotplate',

    // Posts/Blog on different URL
    postsOnUrl: 'posts',

    // Site fade speed
    fadeSpeed: 300,

    // Site footer text
    footerText: '&copy; ' + new Date().getFullYear() + ' All Rights Reserved.',

    // Mode 'Github' for Github Pages, 'Server' for Self Hosted. Defaults
    // to Github
    //mode: 'Github',
    mode: 'Github',
    // mode: 'Server',

     // If Github mode is set, your Github username and repo name.
    githubUserSettings: {
      username: 'geoffyuen',
      repo: 'hotplate-edge'
    },

    // If Github mode is set, choose which Github branch to get files from.
    // Defaults to Github pages branch (gh-pages)
    githubSettings: {
      branch: 'gh-pages',
      host: 'https://api.github.com'
    }

  });

  // Markdown settings
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });

});
