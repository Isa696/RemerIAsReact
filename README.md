# El Paraíso - Tienda Multireligiosa

Este es el repositorio del sitio web [El Paraíso](https://el-paraiso.vercel.app/), una tienda multireligiosa con más de 15 años de trayectoria en la ciudad de General Pacheco. Reconocida en la zona por el amplio surtido de productos religiosos, esotéricos, holísticos, aromáticos y de decoración, y por tener el precio más bajo en artículos de parafina.

## Descripción del Proyecto

El Paraíso es un proyecto desarrollado con **React.js**, utilizando una plantilla de Ace Clothing Ecommerce como base. El propósito de este sitio es ofrecer una experiencia de compra en línea intuitiva y atractiva para nuestros clientes.

### Sitio Original de la Plantilla

- [Ace Clothing Ecommerce](https://ace-clothing.netlify.app/)

## Estructura del Proyecto

El proyecto sigue una estructura organizada para facilitar su mantenimiento y expansión:

```
src/
|-- components/
|-- pages/
|-- utils/
|   |-- fetchFromApi.js
|-- App.js
|-- index.js
```

### Descripción de Carpetas y Archivos

- **components/**: Contiene los componentes reutilizables del sitio web.
- **pages/**: Contiene las páginas principales del sitio web.
- **utils/**: Contiene utilidades y funciones auxiliares. La función de fetch se encuentra en `fetchFromApi.js`.

## Instrucciones de Instalación

1. Clona el repositorio en tu máquina local.
    ```bash
    git clone [URL del repositorio]
    ```
2. Navega al directorio del proyecto.
    ```bash
    cd el-paraiso
    ```
3. Instala las dependencias necesarias.
    ```bash
    npm install
    ```
4. Inicia la aplicación en modo desarrollo.
    ```bash
    npm start
    ```

## Fetch desde la API

El fetch de datos se maneja en el archivo `utils/fetchFromApi.js`. Asegúrate de revisar y modificar este archivo según sea necesario para adaptarse a los endpoints de la API que estés utilizando.

## Despliegue

Este sitio web está actualmente desplegado en [Vercel](https://vercel.com/). Para realizar despliegues futuros, sigue estos pasos:

1. Asegúrate de tener la [CLI de Vercel](https://vercel.com/cli) instalada.
2. Inicia sesión en Vercel.
    ```bash
    vercel login
    ```
3. Despliega el sitio.
    ```bash
    vercel --prod
    ```

## Notas Adicionales

- Este es un proyecto privado y no se prevé hacerlo público ya que es para un cliente.
- Si tienes preguntas o necesitas asistencia, por favor contacta al desarrollador principal del proyecto.