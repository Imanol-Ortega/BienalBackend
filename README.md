# BackEnd para la Bienal 2024
>
## Tecnologias Necesarias.
>NodeJS v18.17.1.
>
>PostgreSQL v16.0.
>
>ExpressJS v4.19.2.

> [!IMPORTANT]
> Para la base de datos cree una nueva Data Base dentro de PostgreSQL con el nombre de "BieNal", luego haga un restore cargando el archivo que esta en la carpeta BD del proyecto.
>
> Tambien dentro de la configuracion del archivo "db.js", cambien el nombre del 'user' y el 'password' que puso al instalar el PostgreSQL.

## Instalacion del proyecto
> Abra la consola dentro del proyecto y escriba el siguiente comando.
>```
> npm install
>```

>Para lanzar el servidor escriba el siguiente comando.
>
>```
> npm run dev
>```

## Rutas disponibles.
### Obtener todos los participantes.
>```
>http://localhost/4000/participantes/obtener
>```
>- Metodos disponibles: 'GET'.

- Formato de devolucion de la peticion.

>```javascript
>  {
>    "data": [
>     {
>        "participanteid": 1,
>        "participantenombre": "Imanol Ortega",
>        "participantedoc": "111111",
>        "participantetel": "00000000",
>        "participantecolor": "Azul",
>        "participanteobs": "Ingeniería informática 4to"
>     }
>   ]
>  }
>```
### Guardar un participante no registrado en la web de la Biecat.
>```
>http://localhost/4000/participantes/nocedula
>```
>- Metodos disponibles: **'POST'.**

 - Formato JSON para el envio de los datos
>```javascript
>  {
>    "nombre": 'Imanol Ortega',
>    "nrodocumento": '111111',
>    "telefono": '00000',
>    "observacion": 'Ingeniería informática 4to'
>  }
>```
### Guardar un participante que se registro en la web de la Biecat.
>```
>http://localhost/4000/participantes/cedula/:ci
>```
>- Metodos disponibles: 'POST'.

>- ci = numero de cedula de la persona.

>- La api recupera los datos de la persona con el numero de cedula proporcionado y los guarda automaticamente en la base de datos.

>- Si no existe el CI te devuelve un JSON con el valor de false para indicar que no se registro previamente el participante 
