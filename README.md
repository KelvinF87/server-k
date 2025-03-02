# Proyecto de Gestión de Gastos e Ingresos

Este proyecto es una aplicación de backend en Node.js con Express y MongoDB para gestionar ingresos y gastos de usuarios.

## Instalación

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/KelvinF87/server-k.git
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Configurar las variables de entorno en un archivo `.env`:
   ```sh
   MONGO_URI=tu_conexion_mongodb
   TOKEN_SECRET=tu_secreto_jwt
   CORS_URI=http://localhost:3000
   ```

## Uso

### Iniciar el servidor
```sh
npm start
```

El servidor se ejecutará en `http://localhost:5006`.

### Uso de la API con Postman

#### Registro de usuario
**Endpoint:** `POST /auth/signup`

**Ejemplo de solicitud en Postman:**
```json
{
  "username": "usuario123",
  "email": "usuario@example.com",
  "password": "password123",
  "name": "Juan",
  "lastname": "Pérez",
  "roles": ["user"],
  "active": true
}
```

**Respuesta esperada:**
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "username": "usuario123",
  "email": "usuario@example.com",
  "name": "Juan",
  "lastname": "Pérez",
  "roles": ["user"],
  "active": true,
  "created": "2024-03-02T12:00:00.000Z"
}
```

#### Inicio de sesión
**Endpoint:** `POST /auth/login`

**Ejemplo de solicitud:**
```json
{
  "username": "usuario123",
  "password": "password123"
}
```

**Respuesta esperada:**
```json
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Crear un nuevo gasto
**Endpoint:** `POST /api/gastos`

**Encabezados:**
```
Authorization: Bearer {authToken}
```

**Cuerpo de la solicitud:**
```json
{
  "gasto": 100,
  "tipo": "60d21b9667d0d8992e610c86",
  "detalles": "Compra de comida"
}
```

**Respuesta esperada:**
```json
{
  "_id": "60d21bf667d0d8992e610c87",
  "gasto": 100,
  "tipo": "60d21b9667d0d8992e610c86",
  "detalles": "Compra de comida",
  "user": "60d21b4667d0d8992e610c85",
  "created": "2024-03-02T12:10:00.000Z"
}
```

### Rutas disponibles

#### Autenticación
- `POST /auth/signup`: Registro de usuario.
- `POST /auth/login`: Inicio de sesión.

#### Gastos
- `POST /api/gastos`: Crear un nuevo gasto.
- `GET /api/gastos`: Obtener todos los gastos del usuario.

#### Ingresos
- `POST /api/ingresos`: Crear un nuevo ingreso.
- `GET /api/ingresos`: Obtener todos los ingresos del usuario.

## Tecnologías Usadas
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT) para autenticación

## Contribución
Si deseas contribuir, haz un fork del repositorio, crea una rama con tus cambios y haz un pull request.

## Licencia
Este proyecto está bajo la licencia MIT.

## Autor
Kelvin Jose Familia Adames