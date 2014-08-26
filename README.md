Snap Navigation 1.0.2
=====================

##Background
snapjs has proven a bit tricky to install and to setup with maximum compatibility in our web projects. This is no more than helper classes making it quick for us to implement snapjs the way we want it implemented.

*This is in no way better for anyone else, but it could be*

##Features
* Support for kitUtils and debug logging
* Ajax search with JSON requests
* Stores searchresults in a cookie for better usability
* Collapsible tree menu
* Fixed top bar
* Font Awesome icons

##Browser Support
* Google Chrome
* Internet Explorer 8+
* Firefox
* Safari 6+
* Google Chrome on Android 4.x
* Safari on iOS 6.x

##Installation
```html
<!-- You'll need jquery -->
<script src="../dependencies/jquery/dist/jquery.min.js"></script>

<!-- Cookie support for quickSearch -->
<script src="../dependencies/jquery.cookie/jquery.cookie.js"></script>

<!-- Dependency -->
<script src="../dependencies/kitUtils/kitUtils.js"></script>

<!-- Template engine for QuickSearch -->
<script src="../dependencies/pure-templates/libs/pure.min.js"></script>

<!-- snapjs of course -->
<script src="../dependencies/snapjs/snap.js"></script>

<!-- Fastclick, optional but recommended -->
<script src="../dependencies/fastclick/lib/fastclick.js"></script>

<!-- The engine that runs it all -->
<script src="../dist/js/SnapNavigation.min.js"></script>
```

##Usage
```javascript
// Needed dependency
kitUtils.init();

// Init the menu
snapNavigation.init();

// Init the ajax search. Only need if used.
snapQuicksearch.init();

// Optional fastclick
FastClick.attach(document.body);
```

##Changelog

####1.0.3
* Will now clear all inline styling on ```.snap-content``` when the window is resized to over a specific value

####1.0.2
* CSS fix with margins with the search result
* Removed ```<i>``` element  from the search result and moved icon to the ```<a href>```

####1.0.1 - Bug fix
* Will not close snap menu on resize if ```.snap-content``` has position: relative

####1.0.0 - Initial release
