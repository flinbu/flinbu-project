# COMPONENTS
* [Embed Videos](#embed-videos)


## Embed videos
This components embed a responsive video object, but, asynchronously. First appears an image with play button and only with the user click the player is loaded.

### Attributes

#### data-source (required)
The video provider, 'youtube' or 'vimeo' only.

#### data-video-url (required)
Url of the video to embed.

#### data-thumbnail (optional)
If this attribute is no set, the component will try to get video thumbnail from the provider. But if is passed, this image will be used.

### Usage

Simple use:

```
<div class="embed-video" data-source="youtube" data-video-url="https://www.youtube.com/watch?v=WFLRASMq_XY"></div>
```

If you want to use a custom thumbnail just pass the image url in the data-thumbnail attribute, please provide a 16x9 image:

```
<div class="embed-video" data-source="youtube" data-video-url="https://www.youtube.com/watch?v=WFLRASMq_XY" data-thumbnail="path/to/custom/thumbnail.jpg"></div>
```