/**
 *
 * Define a sphere that can be drawn with a color
 */

/**
 *
 * @param gl the gl object for which to define the sphere
 * @param latitudeBands the number of bands along the latitude direction
 * @param longitudeBands the number of bands along the longitude direction
 *
 */
function SolidSphere(gl, latitudeBands, longitudeBands, radius) {

    function defineVerticesAndTexture(latitudeBands, longitudeBands) {
        "use strict";
        // define the vertices of the sphere
        var vertices = [];
        var normals = [];
        var textureCordData = [];

        for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
            var theta = latNumber * Math.PI / latitudeBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
                var phi = longNumber * 2 * Math.PI / longitudeBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                // position (and normals as it is a unit sphere)
                var x = (2.5 * radius) * cosPhi * sinTheta;
                var y = (2.5 * radius)  * cosTheta;
                var z = (2.5 * radius)  * sinPhi * sinTheta;

                // texture coordinates
                var u = 1 - (longNumber / longitudeBands);
                var v = 1 - (latNumber / latitudeBands);

                vertices.push(x);
                vertices.push(y);
                vertices.push(z);

                textureCordData.push(u);
                textureCordData.push(v);

                normals.push(x);
                normals.push(y);
                normals.push(z);
            }
        }
        return {
            vertices: vertices,
            normals: normals,
            textures: textureCordData
        }
    }

    function defineIndices(latitudeBands, longitudeBands) {
        var indices = [];
        for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
            for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
                var first = (latNumber * (longitudeBands + 1)) + longNumber;
                var second = first + longitudeBands + 1;

                indices.push(first);
                indices.push(first + 1);
                indices.push(second);

                indices.push(second);
                indices.push(first + 1);
                indices.push(second + 1);
            }
        }
        return indices;
    }

    function draw(gl, aVertexPositionId, aVertexColorId, aVertexNormalId, aTextureCoord,  color, textureToLoad) {
        "use strict";

        // position
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
        gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aVertexPositionId);

        // color is directly specified as an attribute here, as it is valid for the whole object
        gl.disableVertexAttribArray(aVertexColorId);
        gl.vertexAttrib3f(aVertexColorId, color[0], color[1], color[2]);

        // normal
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferNormals);
        gl.vertexAttribPointer(aVertexNormalId, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aVertexNormalId);


        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferTextures);
        gl.vertexAttribPointer(aTextureCoord, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aTextureCoord);

        gl. activeTexture (gl. TEXTURE0 );
        gl. bindTexture (gl. TEXTURE_2D , textureToLoad);
        gl. uniform1i (ctx.uSampler2DId , 0);


        // elements
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere.bufferIndices);
        gl.drawElements(gl.TRIANGLES, this.numberOfTriangles*3 ,gl.UNSIGNED_SHORT, 0);

        // disable the arrays
        gl.disableVertexAttribArray(aVertexPositionId);
        gl.disableVertexAttribArray(aVertexNormalId);
    }

    var verticesAndTextures = defineVerticesAndTexture(latitudeBands, longitudeBands);
    var indices = defineIndices(latitudeBands, longitudeBands);

    var sphere = {};
    sphere.bufferVertices  = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere.bufferVertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesAndTextures.vertices), gl.STATIC_DRAW);


    sphere.bufferNormals = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere.bufferNormals);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesAndTextures.normals), gl.STATIC_DRAW);

    sphere.bufferTextures = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere.bufferTextures);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesAndTextures.textures), gl.STATIC_DRAW);

    sphere.bufferIndices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere.bufferIndices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    sphere.numberOfTriangles = latitudeBands*longitudeBands*2;
    sphere.draw = draw;
    return sphere;
}