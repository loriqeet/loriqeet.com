---
title: Documentation
description: Get started with Loriqeet and learn how to make dynamic custom images for social media sharing.
layout: docs
---

## Introduction

Loriqeet is a service that enables you to create dynamic custom images - typically for the purpose of using in websites for social media previews on platforms such as Facebook, Twitter, LinkedIn, Instagram, etc. Traditionally, you might have a single static image that you uses for all social media image previews on your website that you defines via the `og:image` and/or `twitter:image` HTML `<meta>` tags. For example:

```html
<meta name="twitter:image" content="https://example.com/images/social.jpg">
<meta property="og:image" content="https://example.com/images/social.jpg">
```

Or, in some cases, you might create two separate static images to target both Twitter and Facebook. For example:

```html
<meta name="twitter:image" content="https://example.com/images/social-1200x600.jpg">
<meta property="og:image" content="https://example.com/images/social-1200x630.jpg">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

The problem with this approach is twofold:

1. You have to create different images for different social media platforms to ensure optimal presentation
1. Your images are static - no matter which link you share on social media - the image is the same

With Loriqeet, you create a templates that can be resized and customised on-the-fly - in real-time - with the use of template variables that you pass in via the URL query string. For example:

```html
<meta name="twitter:image" content="https://images.loriqeet.com/mytemplate?width=1200&height=600&title=Hello+World&description=My+first+blog+post">
<meta property="og:image" content="https://images.loriqeet.com/mytemplate?width=1200&height=630&title=Hello+World&description=My+first+blog+post">
```

---

## Images

Once you've created one or more [templates](#templates), you're ready to access your images. The syntax is simple:

```
https://images.loriqeet.com/<TEMPLATE>?<VARIABLES>
```

For example:

```
https://images.loriqeet.com/mytemplate?width=1200&height=630&title=Hello+World&description=My+first+blog+post
```

Learn more about [templates](#templates) and [variables](#variables) below.

---

## Templates

Templates are what make your images customisable. This is because Loriqeet templates are simply [Nunjucks](https://mozilla.github.io/nunjucks/) templates - so you have all the power and flexibility of HTML, CSS and Nunjucks at your fingertips to be as creative as you like. For example, you can:

- Write your own HTML and CSS
- Take advantage of Nunjucks templating
- link to external libraries such as Bootstrap or Tailwind CSS
- Base64 encode images, use inline SVGs or link to external assets on a CDN
- Use external fonts such as Google Fonts
- Use CSS to create responsive breakpoints so images look perfect at any size and ratio - big, small, landscape, portrait, square, etc.

Here's a very simple example:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pacifico&family=Source+Sans+Pro:wght@300&display=swap">
    <title>Loriqeet</title>
    <style>
      body {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000;
        color: #fff;
        font-family: "Source Sans Pro", sans-serif;
        font-weight: 300;
        font-size: 2rem;
      }
      h1 {
        font-family: "Pacifico", sans-serif;
        text-transform: lowercase;
      }
    </style>
  </head>
  <body>
    <div>
      <h1>{% raw  %}{{ title }}{% endraw  %}</h1>
      <p>{% raw  %}{{ description }}{% endraw  %}</p>
    </div>
  </body>
</html>
```

---

## Variables

Variables are what make your images dynamic. You pass variables to your images via the URL query string and they become available to your template using Nunjucks.

For example:

```
https://images.loriqeet.com/mytemplate?width=1200&height=630&title=Hello+World&description=My+first+blog+post
```

**Note:** Notice how the `title` and `description` have been URL encoded. An example in PHP might look like this:

```
https://images.loriqeet.com/mytemplate?width=1200&height=630&title=<?php urlencode($title) ?>&description=<?php urlencode($description) ?>
```

In the above example, the template is called `mytemplate` and there are four variables:

1. `width`: 1200
1. `height`: 630
1. `title`: Hello World
1. `description`: My first blog post

All these variables (anything you pass in the URL query string) are now available to your template. For example:

```html
<h1>{% raw  %}{{ title }}{% endraw  %}</h1>
<p>{% raw  %}{{ description }}{% endraw  %}</p>
```

---

## Configuration variables

There are four system variables you can use to configure your images:

| Name      | Type   | Description                                                      | Default |
|-----------|--------|------------------------------------------------------------------|---------|
| `width`   | Number | The width of the image in pixels. Maximum is 2400.               | 1200    |
| `height`  | Number | The height of the image in pixels. Maximum is 1200.              | 600     |
| `type`    | String | The image type. Possible values are "png" or "jpeg".             | png     |
| `quality` | Number | The image quality for "jpeg" images. A number between 0 and 100. | 100     |

**Note:** Even though you'll typically use configuration variables to configure your images, they're still available to your template using `{% raw  %}{{ width }}{% endraw  %}`, `{% raw  %}{{ height }}{% endraw  %}`, `{% raw  %}{{ type }}{% endraw  %}` and `{% raw  %}{{ quality }}{% endraw  %}` if you need them.
