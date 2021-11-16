let alumnos = []; //Arreglo para meter la lista de alumnos;
let asignaturas = [];//mismo para asignaturas;
let notas_asignatura= [];//mismo para notas;
let notas_alumnos= [];//mismo para notas;
 
function getDatosAlumnos(url){    //Funcion para convertirlo de Json a objeto.
    return new Promise((resolve,reject) => { //Esta es una Promesa (objeto), 
            var xhr = new XMLHttpRequest(); 
            xhr.open("GET", url, true);
            xhr.onload = function () {

            if (xhr.status == "200") {
                resolve(JSON.parse(xhr.response));
            } else {
                reject();
            }
        };
        xhr.send();
    });    
}

function getAsignaturas(url){
    return new Promise((resolve,reject) =>{
        var xhr = new XMLHttpRequest(); 
        xhr.open("GET", url, true);
        xhr.onload = function(){
            
            if (xhr.status == "200") {
                resolve(JSON.parse(xhr.response));
            } else {
                reject();
            }
        };
        xhr.send();
    });    
}

function getNotasAlumnos(url){
    return new Promise((resolve,reject) =>{
        var xhr = new XMLHttpRequest(); 
        xhr.open("GET", url, true);
        xhr.onload = function(){
            
            if (xhr.status == "200") {
                resolve(JSON.parse(xhr.response));
            } else {
                reject();
            }
        };
        xhr.send();
    });    
}

function getNotasAsignaturas(url){
    return new Promise((resolve,reject) =>{
        var xhr = new XMLHttpRequest(); 
        xhr.open("GET", url, true);
        xhr.onload = function(){
            
            if (xhr.status == "200") {
                resolve(JSON.parse(xhr.response));
            } else {
                reject();
            }
        };
        xhr.send();
    });    
}

function setDataAlumnos(datos){
    alumnos.push(datos);
    alumnosBase(alumnos);
}

function setDataAsignaturas(datos){
    asignaturas.push(datos);
    asignaturasBase(asignaturas);
}

function setDataNotasAlumnos(datos){
    notas_alumnos.push(datos);
}
function setDataNotasAsignaturas(datos){
    notas_asignatura.push(datos);
}

function alumnosBase(baseDeDatos){
 for (let index = 0; index < baseDeDatos.length; index++) {
    const a = baseDeDatos[index];
        document.getElementById("tabla_alumnos").innerHTML = "";
                let html = "";
                html += "<tr>";
                html +=     "<th> Alumno </th>";
                html +=     "<th> Nombre </th>";
                html +=     "<th> Apellido </th>";
                html +=     "<th> Correo </th>";
                html +=     "<th> Contraseña </th>";
                html +=     "<th> Imagen </th>";
                html += "</tr>";
                let tabla = document.getElementById("tabla_alumnos");
                tabla.insertAdjacentHTML('beforeend', html);
        for(let j =0; j < a.length ; j++){
            html = "";
            const element = a[j];
                html += "<tr id='numero_"+(j+1)+"'>";
                html += "   <th scope='row'>" + element.Alumno + "</th>";
                html += "   <td>" + element.Nombre + "</td>";
                html += "   <td>" + element.Apellido + "</td>";
                html += "   <td>" + element.Correo + "</td>";
                html += "   <td>" + element.Contraseña + "</td>";
                html += "   <td><img src='" + element.Imagen + "' /></td>";
                html += "</tr>";
                tabla = document.getElementById("tabla_alumnos");
                tabla.insertAdjacentHTML('beforeend', html);

                    let evento1 = document.getElementById("numero_"+ (j+1));

                    evento1.addEventListener('click', function(){
                        getNotasAlumnos("https://6189d55a34b4f400177c4283.mockapi.io/getNotas").then(data =>{
                        let filtrado_alumnos = data.filter(j => j.Alumno == element.Alumno);

                            document.getElementById("tabla_alumnos").innerHTML = "";
                                html = "";
                                html += "<tr>";
                                html +=     "<th> Asignatura </th>";
                                html +=     "<th> Alumno </th>";
                                html +=     "<th> Nota </th>";
                                html += "</tr>";
                                tabla = document.getElementById("tabla_alumnos");
                                tabla.insertAdjacentHTML('beforeend', html);
                            for(index = 0 ; index < filtrado_alumnos.length ; index++){
                                html = " "; 
                                html += "<tr>";
                                html +=  "  <td>" + filtrado_alumnos[index].Asignatura + "</td>";
                                html +=  "  <td>" + filtrado_alumnos[index].Alumno + "</td>";
                                html +=  "  <td>" + filtrado_alumnos[index].Nota + "</td>";
                                html += "</tr>";
                                tabla = document.getElementById("tabla_alumnos");
                                tabla.insertAdjacentHTML('beforeend', html); 
                            } 

                    }, false);     
                });


        }
    }
}


function asignaturasBase(baseDeDatos){
    for (let index = 0; index < baseDeDatos.length; index++) {
        const a = baseDeDatos[index];
        document.getElementById("tabla_asignaturas").innerHTML = "";
        for(let j =0; j < a.length ; j++){
            let html = "";
            const element = a[j];
            html += "<tr id='registro_"+(j+1)+"'>";
            html +=  "  <td>" + element.Asignatura + "</td>";
            html += "   <td><img src='" + element.Imagen + "' /></td>";
            html += "</tr>";
            let tabla = document.getElementById("tabla_asignaturas");
            tabla.insertAdjacentHTML('beforeend', html);  

            let evento = document.getElementById("registro_"+ (j+1));
                evento.addEventListener('click', function(){
                    getNotasAsignaturas("https://6189d55a34b4f400177c4283.mockapi.io/getNotas").then(data =>{
                       let datos_filtrado = data.filter(j => j.Asignatura == element.Asignatura);

                        document.getElementById("tabla_asignaturas").innerHTML = "";
                        
                        for(index = 0 ; index < datos_filtrado.length ; index++){
                        html = " ";
                        tabla = document.getElementById("tabla_asignaturas");
                        tabla.insertAdjacentHTML('beforeend', html); 
                        html += "<tr>";
                        html +=  "  <td>" + datos_filtrado[index].Asignatura + "</td>";
                        html +=  "  <td>" + datos_filtrado[index].Alumno + "</td>";
                        html +=  "  <td>" + datos_filtrado[index].Nota + "</td>";
                        html += "</tr>";
                        tabla = document.getElementById("tabla_asignaturas");
                        tabla.insertAdjacentHTML('beforeend', html); 
                        } 

                }, false);     
            });
        }  
                
    }    
}

function pegarAlumno(){
    getDatosAlumnos("https://6189d55a34b4f400177c4283.mockapi.io/getAlumnos").then(data =>{
        setDataAlumnos(data);
}).catch(error=>{
     console.log("ERROR!!!!!!");
});

}

function pegarNotas(){
    getAsignaturas("https://6189d55a34b4f400177c4283.mockapi.io/getAsignaturas").then(data =>{
        setDataAsignaturas(data);
    }).catch(error=>{
        console.log("ERROR!!!!!!");
   });
   
   }


