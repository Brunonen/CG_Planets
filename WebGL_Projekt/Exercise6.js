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
    uLightPosition: -1,
    uSamplerSecondtexture: -1
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
    solidSphereEarth = new SolidSphere(gl, 40, 40,2.5);

    solidSphereMars = new SolidSphere(gl, 40, 40,2.5);

    solidSphereMoon = new SolidSphere(gl, 40, 40,0.5);

    solidSphereSun = new SolidSphere(gl, 40, 40,4);
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
    loadTextureEarth();
    loadTextureEarthDark();
    loadTextureMoon();
    loadTextureMars();
    loadTextureSun();
    //gl.clearColor(0,0,0,1);


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
    ctx.uSamplerSecondtexture = gl.getUniformLocation(ctx.shaderProgram, "uSamplerSecondTexture");
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
var solidSphereEarth;
var solidSphereMoon;
var solidSphereMars;
var solidSphereSun;
var lightY = 0;
var lightX = 0;
var lightZ = 0;
var countUp = true;
var interval = 0.005;
var lightRot = 0;
var cameraPos = 0;
var marsOrbit = 0.017453292519943;
var earthOrbit = 0.017453292519943;
var moonOrbit = 0.017453292519943;





var rectangleObject = {
    buffer: -1,
    textureBuffer: -1
};

var colorObject = {
    buffer: -1
};

var moonTxt = {
    textureObj:{}

};

var earthTxt = {
    textureObj:{}
};

var marsTxt = {
    textureObj:{}
}

var earthDarkTxt = {
    textureObj:{}
};

var backgrndTxt = {
    textureObj:{}
};

var sunTxt = {
    textureObj:{}
}


function initTexture(image, textureObject){
    gl.bindTexture(gl.TEXTURE_2D, textureObject);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, textureObject);
}
function loadTextureEarth() {
    var image = new Image ();
    // create a texture object
    earthTxt.textureObj = gl. createTexture();

    image.onload = function () {
        initTexture (image , earthTxt.textureObj );

        // make sure there is a redraw after the loading of the texture
    };
    // setting the src will trigger onload
    image.src = "1_earth_8k-min.jpg";
}

function loadTextureEarthDark() {
    var image = new Image ();
    // create a texture object
    earthDarkTxt.textureObj = gl. createTexture();

    image.onload = function () {
        initTexture (image , earthDarkTxt.textureObj );

        // make sure there is a redraw after the loading of the texture
    };
    // setting the src will trigger onload
    image.src = "Earth_At_Night-min.jpg";
}

function loadTextureSun() {
    var image = new Image ();
    // create a texture object
    sunTxt.textureObj = gl. createTexture();

    image.onload = function () {
        initTexture (image , sunTxt.textureObj );

        // make sure there is a redraw after the loading of the texture
    };
    // setting the src will trigger onload
    image.src = "sun.jpg";
}


function loadTextureMars() {
    var image = new Image ();
    // create a texture object
    marsTxt.textureObj = gl. createTexture();

    image.onload = function () {
        initTexture (image , marsTxt.textureObj );

        // make sure there is a redraw after the loading of the texture
    };
    // setting the src will trigger onload
    image.src = "mars.jpg";
}


function initBkgnd() {
    backgrndTxt.textureObj = gl.createTexture();

    var backTex = new Image();
    backTex.onload = function() {
        initTexture(backTex, backgrndTxt.textureObj);
    }
    backTex.src = "stars.jpg";
}



function loadTextureMoon() {
    var image = new Image ();
    // create a texture object
    moonTxt.textureObj = gl. createTexture();

    image.onload = function () {
        initTexture (image , moonTxt.textureObj );

        // make sure there is a redraw after the loading of the texture
    };
    // setting the src will trigger onload
    image.src = "moon-min.jpg";
}
function setUpBuffers(){

}

function setLookAt(cameraPos){
    var matrix = mat4.create();
    mat4.lookAt(
        matrix,
        [0,8,cameraPos],
        [0, 0.0, 800],
        [0, 1.0, 0]);
    return matrix;
}
/**
 * Draw the scene.
 */
function draw() {

    var cameraPos = document.getElementById("cameraPos");


    "use strict";
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    initBkgnd();

    var matrix = setLookAt(cameraPos.value);


    var projectionMatrix = mat4.create();
    // mat4.ortho(projectionMatrix,
    //     // -2, 2, -2, 2, 0, 50);
    //     -20, 20, -20, 20, 0, 100);
    mat4.perspective(projectionMatrix, 20,1,0.1,200);


    gl.uniformMatrix4fv(ctx.uProjectionMatrix, false, projectionMatrix);



    //gl.uniform3f(ctx.uLightPosition, 200000*Math.cos(lightRot),0,200000*Math.sin(lightRot));
    gl.uniform3f(ctx.uLightPosition, 0,0,0);
    lightRot += interval;

    var uTextureWanted = gl.getUniformLocation(ctx.shaderProgram, "uTextureWanted");
    var uLightingWanted = gl.getUniformLocation(ctx.shaderProgram, "uLightingWanted");
    var uSecondTextureWanted = gl.getUniformLocation(ctx.shaderProgram, "uSecondTextureWanted");

    var matrix = setLookAt(cameraPos.value);
    // mat4.ortho(projectionMatrix,
    //     -2, 2, -2, 2, 0, 50);

    // mat4.perspective(projectionMatrix, 2,3,1,50);
    gl.uniform1i(uLightingWanted, 0);
    gl.uniform1i(uSecondTextureWanted, 0);

    // gl.uniformMatrix4fv(ctx.uProjectionMatrix, false, projectionMatrix);


    // mat4.translate(matrix, matrix, [18, -13.5, 18]);
    // mat4.rotate(matrix, matrix,Math.PI, [1.0,1.0,0.0]);

    gl.uniformMatrix4fv(ctx.uModelViewMatrix, false, matrix);
    //gl.uniform3f(ctx.uLightPosition, -50, 0, -50);

    var normalMatrix = mat3.create();
    normalMatrix = mat3.normalFromMat4(normalMatrix, matrix);
    gl.uniformMatrix3fv(ctx.uNormalMatrix, false, normalMatrix);

    solidSphereSun.draw(gl, ctx.aVertexPositonId , ctx.aColor, ctx.aNormalBuffer, ctx.aVertexTextureCord, [1.0, 0.0, 0.0], sunTxt.textureObj, sunTxt.textureObj);

    var matrix = setLookAt(cameraPos.value);

    rotation += 0.0005;
    earthOrbit += 0.005;
    mat4.rotate(matrix, matrix,earthOrbit, [0.0,1.0,0.0]);
    mat4.translate(matrix, matrix, [0, 0, 50]);
    mat4.rotate(matrix, matrix,rotation, [0.0,1.0,0.0]);
    // mat4.translate(matrix, matrix, [-0.5, 0.0, -0.5]);

    gl.uniformMatrix4fv(ctx.uModelViewMatrix, false, matrix);

    var normalMatrix = mat3.create();
    normalMatrix = mat3.normalFromMat4(normalMatrix, matrix);
    gl.uniformMatrix3fv(ctx.uNormalMatrix, false, normalMatrix);

    gl.uniform1i(uTextureWanted, 1);
    gl.uniform1i(uLightingWanted, 1);
    //gl.uniformli(uSecondTextureWanted, 1);
    gl.uniform1i(uSecondTextureWanted, 1);




    var normalMatrix = mat3.create();
    normalMatrix = mat3.normalFromMat4(normalMatrix, matrix);
    gl.uniformMatrix3fv(ctx.uNormalMatrix, false, normalMatrix);


    solidSphereEarth.draw(gl, ctx.aVertexPositonId , ctx.aColor, ctx.aNormalBuffer, ctx.aVertexTextureCord, [1.0, 0.0, 0.0], earthTxt.textureObj, earthDarkTxt.textureObj);


    var matrix = setLookAt(cameraPos.value);

    gl.uniform1i(uSecondTextureWanted, 0);

    var projectionMatrix = mat4.create();
    // mat4.perspective(projectionMatrix, 2,3,1,50);
    // gl.uniformMatrix4fv(ctx.uProjectionMatrix, false, projectionMatrix)
    marsOrbit += 0.005
    mat4.rotate(matrix, matrix, marsOrbit, [0.25,1,0.0]);
    mat4.translate(matrix, matrix, [0, 0, 150]);

    // mat4.scale(matrix, matrix, [0.3, 0.3, 0.3]);
    gl.uniformMatrix4fv(ctx.uModelViewMatrix, false, matrix);

    solidSphereMars.draw(gl, ctx.aVertexPositonId , ctx.aColor, ctx.aNormalBuffer, ctx.aVertexTextureCord, [1.0, 0.0, 0.0], marsTxt.textureObj, marsTxt.textureObj);

    var matrix = setLookAt(cameraPos.value);
    // mat4.ortho(projectionMatrix,
    //     -2, 2, -2, 2, 0, 50);

    // mat4.perspective(projectionMatrix, 2,3,1,50);
    gl.uniform1i(uLightingWanted, 1);
    gl.uniform1i(uSecondTextureWanted, 0);

    // gl.uniformMatrix4fv(ctx.uProjectionMatrix, false, projectionMatrix);


    // mat4.translate(matrix, matrix, [18, -13.5, 18]);
    // mat4.rotate(matrix, matrix,Math.PI, [1.0,1.0,0.0]);
    moonOrbit += 0.01;
   // mat4.translate(matrix, matrix, [0, 0, -50]);
    mat4.rotate(matrix, matrix,earthOrbit, [0.0,1.0,0.0]);
    mat4.translate(matrix, matrix, [0, 0, 50]);
    //mat4.translate(matrix, matrix, [0, 0.0, -10]);
    mat4.rotate(matrix, matrix, moonOrbit, [1.0,1,0.0]);
    mat4.translate(matrix, matrix, [0, 0.0, 10]);


    gl.uniformMatrix4fv(ctx.uModelViewMatrix, false, matrix);
    //gl.uniform3f(ctx.uLightPosition, -50, 0, -50);

    var normalMatrix = mat3.create();
    normalMatrix = mat3.normalFromMat4(normalMatrix, matrix);
    gl.uniformMatrix3fv(ctx.uNormalMatrix, false, normalMatrix);

    solidSphereMoon.draw(gl, ctx.aVertexPositonId , ctx.aColor, ctx.aNormalBuffer, ctx.aVertexTextureCord, [1.0, 0.0, 0.0], moonTxt.textureObj, moonTxt.textureObj);
    //solidCube.draw (gl , ctx.aVertexPositonId , ctx.aColor, ctx.aVertexTextureCord, ctx.aNormalBuffer);


    window.requestAnimationFrame(draw);
}/**
 * Created by bruno on 24/10/2017.
 */
