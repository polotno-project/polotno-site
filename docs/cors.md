---
title: How to resolve CORS issues?
hide_table_of_contents: true
---

In order to load images into canvas element, Polotno sets `crossOrigin` attribute to `anonymous` by default. In some configurations you may see an error like this:

> Access to image at 'http://example.com/image.jpg' from origin 'http://your-domain.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

How to fix it?

## (1) Make sure assets are served with CORS headers

First you need to make sure that a server that hosts your images allows CORS requests. If you have access to the server, you can add `Access-Control-Allow-Origin: *` header to the response. If you have S3 bucket, you can enable CORS in the bucket settings, read more here: https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html

## (2) Make sure all images have `crossOrigin` attribute

Before adding images into canvas, you may want to display in somewhere else in UI of you application like side panel or any steps that user may see before the edito. Make sure that all images have `crossOrigin` attribute set to `anonymous`. For example, if you use `img` tag to display images, you can do this:

```js
<img src="http://example.com/image.jpg" crossOrigin="anonymous" />
```

> Explanation: if you load the same image in the same browsing session without the crossOrigin attribute, after it’s loaded with it, the browser will consider that it needs CORS protocol because it was initially loaded that way.
