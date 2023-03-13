const vertexSource = `

    out vec2 TexCoord;

    void main()
    {
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        TexCoord = uv;
    }
`;

const fragmentSource = `
    in vec2 TexCoord;

    uniform sampler2D ourTexture;
    uniform float zoom;
    uniform float left;
    uniform float bottom;

    out vec4 fragColor;

    #define PI       3.141592653589793238462f
    #define TWO_PI   6.283185307179586476924f
    #define PI4      0.7853981633974483096155f

    void main(){
        ivec2 tex2d = textureSize(ourTexture, 0);
        float x = TexCoord.x;
        float y = TexCoord.y;
        float lat = ((y) - 0.5f) * PI;
        if(lat >= -1.48442222974871 && lat <= 1.48442222974871){
            y = log(tan(PI4 + (lat / 2.0)));
            y = (y + PI) / TWO_PI;
            fragColor = texture(ourTexture, vec2(x * zoom - zoom*left, y * zoom - zoom*bottom));
            return;
        }
        fragColor = vec4(0.5, 0.5, 0.5, 1);
        
    }`;

export { fragmentSource, vertexSource };