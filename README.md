# SIMPLEST-NODEJS-TEST

Este proyecto consiste en una API REST desarrollada con **Node.js**, **Express** y **SQL Server**, que permite realizar operaciones de registro, login y gestión de usuarios.


## 🚀 Instrucciones para ejecutar el backend

1. Clona el repositorio:

```bash
git clone <url-del-repo>
cd user-api
```

2. Instala las dependencias:

```bash
npm install
```

3. Levanta la base de datos en Docker:

```bash
docker pull mcr.microsoft.com/mssql/server:2019-latest
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=P@SS1234" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2019-latest
```


> 📦 La base de datos se inicializa automáticamente al levantar el backend. No necesitas importar un `.sql` manualmente.


5. Ejecuta el backend:

```bash
npm run dev
```

---

## 🧪 Cómo probar la API en Postman

1. Importa el archivo `UserAPI_PostmanCollection.json` en Postman.
2. Importa el entorno `UserAPI_PostmanEnvironment.json`en Postman.
3. Selecciona el entorno activo (`User API Environment`).
4. Ejecuta los endpoints en orden:

   - 🔐 **Auth**
     - `POST /register` → crea usuario
     - `POST /login` → devuelve token (`{{token}}` se debe actualizar)
   - 👤 **Users** (requiere token):
     - `GET /users`
     - `GET /users/:id`
     - `PUT /users/:id`
     - `DELETE /users/:id`

---

## 📘 Acceso a Swagger

Una vez el backend está corriendo, accede a la documentación Swagger desde:

> [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Desde aquí puedes ver todos los endpoints disponibles y probarlos directamente.

---

## 👤 Usuario de prueba

Puedes usar este usuario para probar directamente desde Postman o Swagger:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Después de iniciar sesión, copia el token JWT de la respuesta y pégalo como:

```
Authorization: Bearer <token>
```

---

## 🗃️ Backup de la base de datos

No es necesario importar un `.sql`, ya que la imagen Docker de SQL Server inicia limpia y el backend crea la estructura al conectarse.

Puedes visualizar los datos fácilmente usando la extensión **SQL Server** en VSCode, conectando con los siguientes datos:

- Server: `localhost`
- User: `sa`
- Password: `P@SS1234`
- Database: `UserDB`

---
