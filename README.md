# osm-globe

Plan to implement a deep zoomable globe in html/js.

First, OpenSeaDragon w/ OpenStreetMap api loads a tileset to a canvas.

Then, three.js uses this canvas as a texture, which is aligned on a sphere based on its coordinates. The sphere uses a WebGL shader that corrects Web Mercator to equirectangular projection.

Which part of the globe OpenSeaDragon shows depends on where the users scrolls the globe, and can be calculated fairly simply.
