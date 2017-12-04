//
// Computer Graphics
//
// WebGL Exercises
//

// Register function to call after document has loaded
window.onload = startup;

// the gl object is saved globally
var gl;

// we keep all local parameters for the program in a single object
var ctx = {
    shaderProgram: -1,
    aVertexPositonId: -1,
    myColor: -1,
    aColor: -1,
    uSampler2DId: -1,
    aVertexTextureCord: -1,
    uRotationMatrix: -1,
    uTranslationMatrix: -1,
    uProjectionMatrix: - 1,
    uModelViewMatrix: -1,
    uInverseTranslationMatrix: -1,
    uNormalMatrix: -1,
    aNormalBuffer: -1,
    uLightPosition: -1
};



/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    //loadTexture();
    //solidCube = new SolidCube(gl , [0.0, 1.0 , 0.0], [0.0 , 0.0 , 1.0 ], [1.0 , 0.0 , 0.0 ],[1.0 , 0.0 , 1.0 ], [1.0 , 1.0 , 0.0 ], [0.0 , 1.0 , 1.0], true, lennaTxt.textureObj) ;
    //wiredCube = new WireFrameCube(gl, [0.0, 1.0,0.0]);
    solidSphere = new SolidSphere(gl, 40, 40, 1);
    draw();
}

function createGLContext(canvas){
    var context = canvas.getContext("webgl");
    if(!context){
        alert("Failed to create GL context")
    }
    return context;
}

/**
 * InitGL should contain the functionality that needs to be executed only once
 */
function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'VertexShader.glsl', 'FragmentShader.glsl');
    setUpAttributesAndUniforms();
    //setUpBuffers();
    loadTexture();
    gl.clearColor(0,0,0,1);


    // add more necessary commands here
}

/**
 * Setup all the attribute and uniform variables
 */
function setUpAttributesAndUniforms(){
    "use strict";
    ctx.aVertexPositonId = gl.getAttribLocation(ctx.shaderProgram , "aVertexPosition");
    ctx.myColor = gl.getUniformLocation(ctx.shaderProgram, "myColor");
    ctx.aColor = gl.getAttribLocation(ctx.shaderProgram, "aColor");
    ctx.uSampler2DId = gl.getUniformLocation(ctx.shaderProgram, "uSampler");
    ctx.aVertexTextureCord = gl.getAttribLocation(ctx.shaderProgram, "aVertexTextureCoord");

    ctx.uRotationMatrix = gl.getUniformLocation(ctx.shaderProgram, "uRotationMatrix");
    ctx.uTranslationMatrix = gl.getUniformLocation(ctx.shaderProgram, "uTranslationMatrix");
    ctx.uInverseTranslationMatrix = gl.getUniformLocation(ctx.shaderProgram, "uInverseTranslationMatrix");
    ctx.uProjectionMatrix = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMatrix");
    ctx.uModelViewMatrix = gl.getUniformLocation(ctx.shaderProgram, "uModelViewMatrix");

    ctx.uNormalMatrix = gl.getUniformLocation(ctx.shaderProgram, "uNormalMatrix");
    ctx.aNormalBuffer = gl.getAttribLocation(ctx.shaderProgram, "aVertexNormal");
    ctx.uLightPosition = gl.getUniformLocation(ctx.shaderProgram, "uLightPosition");
}

/**
 * Setup the buffers to use. If more objects are needed this should be split in a file per object.
 */

var modelViewMatrix = mat4.create ();
var rotation = 0.017453292519943;
//var rotation = 0.00436332312998575;
var scaler = 0;
var increment = 0.02;
var projectionMatrix;
var solidCube;
var wiredCube;
var solidSphere;
var lightY = 0;
var lightX = 0;
var lightZ = 0;
var countUp = true;





var rectangleObject = {
    buffer: -1,
    textureBuffer: -1
};

var colorObject = {
    buffer: -1
};

var lennaTxt = {
    textureObj:{}

};

var earthTxt = {
    textureObj:{}
}


function initTexture(image, textureObject){
    gl.bindTexture(gl.TEXTURE_2D, textureObject);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
}
function loadTexture () {
    var image = new Image ();
    // create a texture object
    earthTxt.textureObj = gl. createTexture();
    image.onload = function () {
        initTexture (image , earthTxt.textureObj );
        // make sure there is a redraw after the loading of the texture
    };
    // setting the src will trigger onload
    image.src = "1_earth_8k.jpg";
}

function setUpBuffers(){

}

function setLookAt(){
    var matrix = mat4.create();
    mat4.lookAt(
        matrix,
        [4.0, 4.0 , 4.0],
        [0.5,0.5, 0.5],
        [0, 1.0, 0]);
    return matrix;
}
/**
 * Draw the scene.
 */
function draw() {


    "use strict";
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var matrix = setLookAt();


    var projectionMatrix = mat4.create();
    mat4.ortho(projectionMatrix,
        -2, 2, -2, 2, 1, 20);


    gl.uniformMatrix4fv(ctx.uProjectionMatrix, false, projectionMatrix);



    gl.uniform3f(ctx.uLightPosition, 0, 0, 0);


    var uTextureWanted = gl.getUniformLocation(ctx.shaderProgram, "uTextureWanted");
    var uLightingWanted = gl.getUniformLocation(ctx.shaderProgram, "uLightingWanted");



    rotation += 0.05;

    var rotationMatrix = mat4.create();
    var translationMatrix = mat4.create();
    var inverseTranslationMatrix = mat4.create();

    mat4.translate(matrix, matrix, [1.5, 0.0, 0.5]);
    mat4.rotate(matrix, matrix,rotation, [0.0,1.0,0.0]);
    mat4.translate(matrix, matrix, [-0.5, 0.0, -0.5]);

    gl.uniformMatrix4fv(ctx.uModelViewMatrix, false, matrix);

    var normalMatrix = mat3.create();
    normalMatrix = mat3.normalFromMat4(normalMatrix, matrix);
    gl.uniformMatrix3fv(ctx.uNormalMatrix, false, normalMatrix);

    gl.uniform1i(uTextureWanted, 1);
    gl.uniform1i(uLightingWanted, 1);

    //solidCube.draw (gl , ctx.aVertexPositonId , ctx.aColor, ctx.aVertexTextureCord, ctx.aNormalBuffer);
    //gl.uniform1i(uTextureWanted, 0);

    var matrix = setLookAt();


    //mat4.translate(matrix, matrix, [-0.0,0.0, 1.5]);
    mat4.rotate(matrix, matrix,rotation, [0.0,1.0,0.0]);
    // mat4.translate(matrix, matrix, [-0.5, 0.0, -0.5]);
    mat4.scale(matrix, matrix, [0.75, 0.75, 0.75]);
    gl.uniformMatrix4fv(ctx.uModelViewMatrix, false, matrix);

    var normalMatrix = mat3.create();
    normalMatrix = mat3.normalFromMat4(normalMatrix, matrix);
    gl.uniformMatrix3fv(ctx.uNormalMatrix, false, normalMatrix);


    solidSphere.draw(gl, ctx.aVertexPositonId , ctx.aColor, ctx.aNormalBuffer, ctx.aVertexTextureCord, [1.0, 0.0, 0.0], earthTxt.textureObj);

    var matrix = setLookAt();

    mat4.translate(matrix, matrix, [-0.5, 0.0, 0.0]);
    mat4.rotate(matrix, matrix,rotation, [0.0,1.0,0.0]);

    mat4.translate(matrix, matrix, [-0.5, 0.0, -0.5]);
    gl.uniformMatrix4fv(ctx.uModelViewMatrix, false, matrix);

    var normalMatrix = mat3.create();
    normalMatrix = mat3.normalFromMat4(normalMatrix, matrix);
    gl.uniformMatrix3fv(ctx.uNormalMatrix, false, normalMatrix);

    //solidCube.draw (gl , ctx.aVertexPositonId , ctx.aColor, ctx.aVertexTextureCord, ctx.aNormalBuffer);
    window.requestAnimationFrame(draw);
}/**
 * Created by bruno on 24/10/2017.
 */
