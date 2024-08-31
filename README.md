# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con Typescript.


#dev
1. Clonar el archivo env.template a .env
2. Configurar las variables de entorno
    ```
    PORT=3000
    PROD=false

    MAILER_EMAIL=
    MAILER_SECRET_KEY=
    ```
    [Generar key para MAILER SECRET](#generar-key-para-mailer_secret_key)


3. Instalar dependencias:
    ```
    npm install
    ```
4. Levantar las bases de datos con el comando:
    ```
    docker compose up -d
    ```
5. Ejecutar el comando:
    ```
    npx prisma migrate dev
    ```
6. Iniciar el proyecto:
    ```
    npm run dev
    ```
<br/>

## Generar key para MAILER_SECRET_KEY:

1. Entrar a: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

2. Generar una contraseña de aplicación asignando un nuevo nombre

3. Copiar y pegar en la variable de entorno.



