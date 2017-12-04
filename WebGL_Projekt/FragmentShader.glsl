precision mediump float;
uniform vec3 myColor;
varying vec3 vColor;
varying vec2 vTextureCoord ;
uniform sampler2D uSampler ;

uniform int uTextureWanted;
uniform int uLightingWanted;

uniform vec3 uLightPosition;
uniform vec3 uLightColor ;

varying vec3 vNormalEye ;
varying vec3 vVertexPositionEye3 ;

const float ambientFactor = 0.2;
const float shininess = 20.0;
const vec3 specularMaterialColor = vec3 (0.4 , 0.4 , 0.4) ;

//uniform sampler3D uSampler;


void main() {
    // to complete
    //gl_FragColor = vColor;
    vec3 baseColor = vColor ;

    if(uTextureWanted == 1){
        baseColor = texture2D ( uSampler , vec2(vTextureCoord.s, vTextureCoord.t)).rgb  ;
    }

    if(uLightingWanted == 1)
    {
        //vec3 LightPosition = vec3(0.0, 5.0, 0.0);
        vec3 LightPosition = uLightPosition;
        vec3 ambientColor = ambientFactor * baseColor.rgb;

        vec3 lightDirectionEye = normalize(LightPosition - vVertexPositionEye3);
        //lightDirectionEye = normalize( lightDirectionEye );

        vec3 normal = normalize ( vNormalEye );

        float cosPhi = dot(normal, lightDirectionEye);
        cosPhi = clamp(cosPhi, 0.0, 1.0);

        vec3 diffuseColor = vec3(baseColor) * cosPhi;

        // specular lighting
        vec3 specularColor = vec3 (0, 0, 0);

        if (cosPhi > 0.0) {
            //vec3 reflectionDir = 2.0 * normal * dot(normal,lightDirectionEye)  - lightDirectionEye;
            vec3 reflectionDir = normalize(reflect(-lightDirectionEye, normal));
            vec3 eyeDir = normalize(-vVertexPositionEye3);
            float cosPhi = max(dot(reflectionDir , eyeDir), 0.0);
            float specularFactor = pow(cosPhi , shininess);
            specularColor = specularMaterialColor * specularFactor;
        }

        vec3 color = ambientColor + diffuseColor + specularColor ;
        gl_FragColor = vec4 (color , 1.0) ;
    }else{
        gl_FragColor = vec4 ( baseColor , 1.0) ;
    }


}


