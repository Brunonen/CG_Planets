
function WireFrameCube(gl, color){
    function defineVertices(gl){
        var vertices = [
            0.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0,
            1.0, 1.0, 0.0,
            1.0, 0.0, 1.0,
            0.0, 1.0, 1.0,
            1.0, 1.0, 1.0
        ];
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return buffer;
    }

    function defineEdges(gl){
        var vertexIndices = [
            0, 1,
            0, 2,
            0, 3,
            1, 4,
            1, 5,
            2, 4,
            2, 6,
            3, 5,
            3, 6,
            4, 7,
            5, 7,
            6, 7
        ];

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
        return buffer;
    }

    return{
        bufferVertices: defineVertices(gl),
        bufferEdges: defineEdges(gl),
        color: color,
        draw: function(gl, aVertexPositionId, aVertexColorId){
            gl. bindBuffer (gl. ARRAY_BUFFER , this.bufferVertices );
            gl.vertexAttribPointer ( aVertexPositionId , 3, gl.FLOAT , false , 0, 0);
            gl.enableVertexAttribArray ( aVertexPositionId );
            gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER , this.bufferEdges );
            gl.drawElements (gl.LINES , 24 ,gl. UNSIGNED_SHORT , 0);

            gl.disableVertexAttribArray(aVertexColorId);
            gl.disableVertexAttribArray(aVertexPositionId);


        }
    }
}