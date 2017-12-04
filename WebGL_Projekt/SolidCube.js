
function SolidCube(gl, color1, color2, color3, color4, color5, color6, textureCube, textureToLoad){
    function defineVertices(gl){
        var vertices = [
            //Front
            1.0, 0.0, 0.0,
            1.0, 1.0, 0.0,
            1.0, 1.0, 1.0,
            1.0, 0.0, 1.0,
            //Right
            1.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 1.0,
            1.0, 1.0, 1.0,
            //Left
            1.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 1.0,
            1.0, 0.0, 1.0,
            //Top
            1.0, 0.0, 1.0,
            1.0, 1.0, 1.0,
            0.0, 1.0, 1.0,
            0.0, 0.0, 1.0,
            //Back
            0.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 1.0,
            0.0, 0.0, 1.0,
            //Bottom
            1.0, 0.0, 0.0,
            1.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 0.0
        ];
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return buffer;
    }

    function defineEdges(gl){
        var vertexIndices = [
            0, 1, 2,
            0, 2, 3,
            4, 5, 7,
            5, 6, 7,
            9, 8, 11,
            9, 11, 10,
            12, 13, 15,
            13, 14, 15,
            16, 19, 17,
            17, 19, 18,
            20, 23, 21,
            21, 23, 22
        ];

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
        return buffer;
    }

    function defineColors(color1, color2, color3, color4, color5, color6){
        var colors = [
            color1[0], color1[1], color1[2],
            color1[0], color1[1], color1[2],
            color1[0], color1[1], color1[2],
            color1[0], color1[1], color1[2],
            color2[0], color2[1], color2[2],
            color2[0], color2[1], color2[2],
            color2[0], color2[1], color2[2],
            color2[0], color2[1], color2[2],
            color3[0], color3[1], color3[2],
            color3[0], color3[1], color3[2],
            color3[0], color3[1], color3[2],
            color3[0], color3[1], color3[2],
            color4[0], color4[1], color4[2],
            color4[0], color4[1], color4[2],
            color4[0], color4[1], color4[2],
            color4[0], color4[1], color4[2],
            color5[0], color5[1], color5[2],
            color5[0], color5[1], color5[2],
            color5[0], color5[1], color5[2],
            color5[0], color5[1], color5[2],
            color6[0], color6[1], color6[2],
            color6[0], color6[1], color6[2],
            color6[0], color6[1], color6[2],
            color6[0], color6[1], color6[2],
        ];

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        return buffer;
    }

    function defineTexture(){
        var textureCoord = [
            0.0, 1.0,
            1.0, 1.0,
            1.0, 0.0,
            0.0, 0.0,
            0.0,1.0,
            1.0, 1.0,
            1.0, 0.0,
            0.0, 0.0,
            0.0,1.0,
            1.0, 1.0,
            1.0, 0.0,
            0.0, 0.0,
            0.0,1.0,
            1.0, 1.0,
            1.0, 0.0,
            0.0, 0.0,
            0.0,1.0,
            1.0, 1.0,
            1.0, 0.0,
            0.0, 0.0,
            0.0,1.0,
            1.0, 1.0,
            1.0, 0.0,
            0.0, 0.0,
        ];

        //var textureCoord = [0.0,1.0 , 1.0,1.0 , 1.0,0.0 , 0.0,0.0 ];
        var buffer = gl.createBuffer();
        gl. bindBuffer (gl. ARRAY_BUFFER , buffer );
        gl. bufferData (gl. ARRAY_BUFFER , new Float32Array ( textureCoord ), gl.STATIC_DRAW );
        return buffer;
    }

    function defineNormalVectors(){
        cubeVertexNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
        var vertexNormals = [

            // Front face
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,
            1.0,  0.0,  0.0,

            // Right face
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,
            0.0,  1.0,  0.0,

            //Left face
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0,
            0.0, -1.0,  0.0,

            // Top face
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,
            0.0,  0.0,  1.0,

            // Back face
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,
            -1.0,  0.0,  0.0,

            // Bottom face
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,
            0.0,  0.0, -1.0,
        ];
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
        return buffer;
    }

    return{
        bufferVertices: defineVertices(gl),
        bufferEdges: defineEdges(gl),
        bufferColors: defineColors(color1, color2, color3, color4, color5, color6),
        bufferTextures: defineTexture(),
        bufferNormalVektors: defineNormalVectors(),
        textureCubeWanted: textureCube,
        textureToLoad: textureToLoad,
        draw: function(gl, aVertexPositionId, aVertexColorId, aTextureCoord, aNormalId){
            gl.bindBuffer (gl. ARRAY_BUFFER , this.bufferVertices );
            gl.vertexAttribPointer ( aVertexPositionId , 3, gl.FLOAT , false , 0, 0);
            gl.enableVertexAttribArray ( aVertexPositionId );
            gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER , this.bufferEdges );
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferColors);
            gl.vertexAttribPointer(aVertexColorId, 3, gl.FLOAT, false, 0,0);
            gl.enableVertexAttribArray( aVertexColorId);

            gl.bindBuffer (gl. ARRAY_BUFFER , this.bufferNormalVektors );
            gl.vertexAttribPointer(aNormalId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aNormalId);

            if(this.textureCubeWanted) {

                gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferTextures);
                gl.vertexAttribPointer(aTextureCoord, 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(aTextureCoord);

                gl. activeTexture (gl. TEXTURE0 );
                gl. bindTexture (gl. TEXTURE_2D , this.textureToLoad);
                gl. uniform1i (ctx.uSampler2DId , 0);
            }

            gl.drawElements (gl.TRIANGLES , 36 ,gl. UNSIGNED_SHORT , 0);
            gl.disableVertexAttribArray(aVertexColorId);
            gl.disableVertexAttribArray(aNormalId);
            gl.disableVertexAttribArray(aVertexPositionId);
            gl.disableVertexAttribArray(aTextureCoord);


        }
    }
}