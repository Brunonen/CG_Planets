attribute vec3 aVertexPosition;
attribute vec3 aColor;
attribute vec2 aVertexTextureCoord ;
attribute vec3 aVertexNormal;

uniform mat3 uNormalMatrix ;
uniform mat4 uTranslationMatrix ;
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

uniform mat4 uInverseTranslationMatrix;

varying vec3 vColor;
varying vec2 vTextureCoord ;
varying vec3 vNormalEye;
varying vec3 vVertexPositionEye3;

void main() {
    // to complete
    //gl_Position = uProjectionMatrix * uModelViewMatrix  * vec4(aVertexPosition, 1);
    //aVertexPosition = gl_Position;


    // calculate the vertex position in eye coordinates
    vec4 vertexPositionEye4 = uModelViewMatrix * vec4 ( aVertexPosition , 1.0) ;
    vVertexPositionEye3 = vertexPositionEye4.xyz / vertexPositionEye4.w;

     // calculate the normal vector in eye coordinates
    vNormalEye = normalize ( uNormalMatrix * aVertexNormal );

    vColor = aColor;
    vTextureCoord = aVertexTextureCoord ;

     // calculate the projected position
    gl_Position = uProjectionMatrix * vertexPositionEye4 ;
}