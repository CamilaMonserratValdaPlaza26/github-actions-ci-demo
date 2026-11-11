# Informe de Ejercicios: Laboratorio 5.1

## Laboratorio 5.1: Creación de un Workflow de GitHub Actions para CI

---

# Portada

UNIVERSIDAD MAYOR, REAL Y PONTIFICIA DE SAN FRANCISCO XAVIER DE CHUQUISACA

FACULTAD DE CIENCIAS Y TECNOLOGÍA

![LOGO DE LA CARÁTULA](LOGO%20USFX/ESCUDO.png)

**Nombre:** VALDA PLAZA CAMILA MONSERRAT

**Carrera:** INGENIERÍA DE SISTEMAS

**Asignatura:** Trabajando en la Nube (COM610)

**Docente:** Ing. Marcelo Quispe Ortega

**Semestre:** 2/2026

SUCRE – BOLIVIA

---

# Introducción

En este laboratorio se construyó, paso a paso, un flujo de integración continua (CI) con GitHub Actions sobre una aplicación sencilla de Node.js y Express. El objetivo fue entender cómo un **pipeline** automatiza una secuencia de tareas cada vez que se sube código al repositorio: descargar el código, preparar el entorno, instalar dependencias, revisar el estilo con ESLint y ejecutar las pruebas.

Un pipeline es, en términos simples, una cadena ordenada de pasos automáticos. Si un paso falla, la ejecución se detiene y el resultado queda marcado como fallido, lo que permite detectar errores antes de integrar cambios a la rama principal. En este laboratorio el pipeline se fue ampliando: primero solo ejecutaba pruebas, después incorporó el linting y finalmente se ejecutó en paralelo con una matriz de versiones de Node.js.

El repositorio utilizado fue `github-actions-ci-demo`. La aplicación expone dos rutas (`/health` y `/users`), las pruebas se escribieron con Jest y Supertest, y el análisis estático se realizó con ESLint.

**Nota sobre las capturas:** la numeración corresponde a los archivos originales del repositorio. La secuencia omite las imágenes 40 y 46, y algunas capturas se tomaron en momentos distintos, por lo que el orden de los archivos no siempre coincide exactamente con el orden cronológico de los hechos.

Este informe corresponde únicamente a los ejercicios 3.1 a 3.4 del laboratorio. La práctica individual, con la API de inventario, se documenta por separado en <https://github.com/CamilaMonserratValdaPlaza26/inventario-ci>.

---

# Ejercicio 3.1: Preparación del repositorio y la aplicación

**Objetivo:** crear el repositorio `github-actions-ci-demo`, clonarlo, inicializar un proyecto Node.js con Express y agregar pruebas unitarias con Jest y Supertest.

## Desarrollo

**Figura 1. Creación del repositorio en GitHub.**
Qué se observa: el formulario de creación de un repositorio nuevo con el nombre `github-actions-ci-demo`, la visibilidad pública y la opción de agregar un archivo README.

![Figura 1](imgejercicios/1.png)

**Figura 2. Repositorio creado.**
Qué se observa: la página principal del repositorio ya creado, con la rama `main`, el archivo README y el botón para copiar la URL de clonación.

![Figura 2](imgejercicios/2.png)

**Figura 3. Clonación del repositorio.**
Qué se observa: una terminal de PowerShell ejecutando `git clone` sobre la URL del repositorio y mostrando el progreso de la descarga.

![Figura 3](imgejercicios/3.png)

**Figura 4. Configuración local de Git y estado del repositorio.**
Qué se observa: la terminal con la configuración de Git, la comprobación del estado del repositorio y la carpeta `img` todavía sin seguimiento.

![Figura 4](imgejercicios/4.png)

**Figura 5. Inicialización del proyecto Node.js.**
Qué se observa: la ejecución de `npm init -y` y el archivo `package.json` generado automáticamente, abierto en VS Code.

![Figura 5](imgejercicios/5.png)

**Figura 6. Instalación de Express, Jest y Supertest.**
Qué se observa: la instalación de las dependencias con `npm install express` y `npm install --save-dev jest supertest`, junto con el `package.json` actualizado.

![Figura 6](imgejercicios/6.png)

**Figura 7. Código de la aplicación Express.**
Qué se observa: el archivo `app.js` con la configuración de Express, la ruta `/health` y la ruta `/users`, además de la exportación de la aplicación.

![Figura 7](imgejercicios/7.png)

**Figura 8. Archivos `server.js` y `app.test.js`.**
Qué se observa: el archivo `server.js` que inicia el servidor y el archivo `app.test.js` con las dos pruebas de integración para `/health` y `/users`.

![Figura 8](imgejercicios/8.png)

**Figura 9. Ejecución local de las pruebas.**
Qué se observa: la terminal ejecutando `npm test` con las dos pruebas aprobadas y el mensaje de Jest indicando que la suite pasó correctamente.

![Figura 9](imgejercicios/9.png)

**Figura 10. Verificación de versiones instaladas.**
Qué se observa: la terminal con `npm list` mostrando las versiones de Express, Jest y Supertest instaladas en el proyecto.

![Figura 10](imgejercicios/10.png)

**Figura 11. Primer commit y push.**
Qué se observa: el archivo `.gitignore` y la terminal ejecutando `git add`, `git commit` y `git push` para subir la aplicación al repositorio.

![Figura 11](imgejercicios/11.png)

**Figura 12. Confirmación de los scripts y las pruebas.**
Qué se observa: el `package.json` con los scripts `start` y `test`, y una nueva ejecución de `npm test` confirmando que las pruebas siguen pasando.

![Figura 12](imgejercicios/12.png)

---

# Ejercicio 3.2: Creación del workflow de CI

**Objetivo:** crear el archivo `.github/workflows/ci.yml` y verificar que el workflow se ejecute automáticamente en la pestaña Actions.

## Desarrollo

**Figura 13. Estado del repositorio antes del workflow.**
Qué se observa: la terminal con `git status` y el proyecto abierto en VS Code, mostrando los archivos que forman parte de la aplicación.

![Figura 13](imgejercicios/13.png)

**Figura 14. Pruebas locales antes de crear el workflow.**
Qué se observa: el `package.json` con el script de pruebas y la terminal ejecutando `npm test` con las dos pruebas aprobadas.

![Figura 14](imgejercicios/14.png)

**Figura 15. Consulta de versiones disponibles.**
Qué se observa: la terminal consultando versiones de paquetes con `npm view` y el `package.json` con la configuración del proyecto.

![Figura 15](imgejercicios/15.png)

**Figura 16. Verificación final de las pruebas.**
Qué se observa: una nueva ejecución de `npm test` y el `package.json` con los scripts del proyecto, como comprobación previa al push.

![Figura 16](imgejercicios/16.png)

**Figura 17. Repositorio en GitHub con la aplicación subida.**
Qué se observa: la página del repositorio con los archivos `app.js`, `server.js`, `app.test.js`, `package.json` y el README, además de la lista de commits.

![Figura 17](imgejercicios/17.png)

**Figura 18. Historial de commits.**
Qué se observa: la página de commits del repositorio con el commit inicial de la aplicación Express y sus pruebas.

![Figura 18](imgejercicios/18.png)

**Figura 19. Creación y push del workflow.**
Qué se observa: la terminal ejecutando `git add`, `git commit` y `git push` del archivo `.github/workflows/ci.yml`.

![Figura 19](imgejercicios/19.png)

**Figura 20. Contenido inicial del workflow.**
Qué se observa: el archivo `ci.yml` con el nombre `CI Basico`, los eventos `push` y `pull_request` sobre `main` y los pasos de checkout, configuración de Node.js, instalación de dependencias y ejecución de pruebas.

![Figura 20](imgejercicios/20.png)

**Figura 21. Commit y push del workflow básico.**
Qué se observa: la terminal confirmando los cambios del workflow y subiéndolos a GitHub, junto con el archivo `ci.yml` en el editor.

![Figura 21](imgejercicios/21.png)

**Figura 22. Pestaña Actions con el workflow registrado.**
Qué se observa: la pestaña Actions mostrando el workflow `CI Basico` y su primera ejecución asociada al commit del workflow.

![Figura 22](imgejercicios/22.png)

**Figura 23. Vista inicial de ejecuciones.**
Qué se observa: la pestaña Actions con la lista de ejecuciones del repositorio, desde donde se puede abrir cada corrida del workflow.

![Figura 23](imgejercicios/23.png)

**Figura 24. Resumen de la ejecución del workflow.**
Qué se observa: el resumen de la ejecución con el commit que la originó, el estado, la duración total y el job `build-and-test`.

![Figura 24](imgejercicios/24.png)

**Figura 25. Detalle del job `build-and-test`.**
Qué se observa: la lista de pasos del job, desde la preparación del entorno hasta el checkout, la configuración de Node.js, la instalación de dependencias y la ejecución de pruebas.

![Figura 25](imgejercicios/25.png)

**Figura 26. Paso de checkout en detalle.**
Qué se observa: el log del paso `Checkout del codigo`, donde GitHub descarga el contenido del repositorio en el runner.

![Figura 26](imgejercicios/26.png)

**Figura 27. Paso de instalación de dependencias en detalle.**
Qué se observa: el log del paso `Instalar dependencias`, con la ejecución de `npm ci` y la instalación de los paquetes del proyecto.

![Figura 27](imgejercicios/27.png)

**Figura 28. Paso de pruebas en detalle.**
Qué se observa: el log del paso `Ejecutar pruebas`, con la salida de `npm test` y las dos pruebas aprobadas.

![Figura 28](imgejercicios/28.png)

**Figura 29. Resumen de todos los jobs.**
Qué se observa: la vista de todos los jobs de la ejecución, con el job `build-and-test` marcado en verde.

![Figura 29](imgejercicios/29.png)

**Figura 30. Ejecución exitosa del workflow básico.**
Qué se observa: el resumen final de la ejecución exitosa, con el job completado y la duración total del workflow.

![Figura 30](imgejercicios/30.png)

---

# Ejercicio 3.3: Extensión del pipeline con calidad de código

**Objetivo:** instalar ESLint, agregar el paso de linting al workflow y comprobar que el pipeline falla cuando se introduce un error intencional, para luego corregirlo.

## Desarrollo

**Figura 31. Instalación de ESLint.**
Qué se observa: la terminal ejecutando `npm install --save-dev eslint` y la instalación de ESLint junto con sus dependencias.

![Figura 31](imgejercicios/31.png)

**Figura 32. Configuración interactiva de ESLint.**
Qué se observa: la ejecución de `npx eslint --init` con las preguntas sobre el tipo de proyecto, el sistema de módulos, el framework y el estilo de configuración.

![Figura 32](imgejercicios/32.png)

**Figura 33. Archivo `eslint.config.mjs` generado.**
Qué se observa: el archivo de configuración de ESLint creado por el asistente y el `package.json` del proyecto en VS Code.

![Figura 33](imgejercicios/33.png)

**Figura 34. Script de linting en `package.json`.**
Qué se observa: el `package.json` con el script `lint` agregado, el archivo `eslint.config.mjs` y la terminal con el commit de los cambios.

![Figura 34](imgejercicios/34.png)

**Figura 35. Workflow actualizado con el paso de linting.**
Qué se observa: el archivo `ci.yml` con el nombre `CI con Linting` y el paso `Ejecutar linting` agregado antes de las pruebas.

![Figura 35](imgejercicios/35.png)

**Figura 36. Ejecución del workflow con linting.**
Qué se observa: la pestaña Actions con la ejecución del workflow `CI con Linting` correspondiente al commit que agregó el paso de linting.

![Figura 36](imgejercicios/36.png)

**Figura 37. Commit y push del paso de linting.**
Qué se observa: la terminal ejecutando el commit y el push de los cambios que incorporan ESLint y el paso de linting al pipeline.

![Figura 37](imgejercicios/37.png)

**Figura 38. Historial de ejecuciones con linting.**
Qué se observa: la lista de ejecuciones del workflow con la corrida correspondiente al paso de linting y su resultado.

![Figura 38](imgejercicios/38.png)

**Figura 39. Error de sintaxis intencional en `app.js`.**
Qué se observa: el archivo `app.js` con una llave de cierre adicional en la línea 25, introducida a propósito para que ESLint detecte un error de sintaxis.

![Figura 39](imgejercicios/39.png)

**Figura 41. Commit y push del error intencional.**
Qué se observa: la terminal ejecutando `git add`, `git commit` con el mensaje `test: fuerza un error de linting para probar el pipeline` y `git push`.

![Figura 41](imgejercicios/41.png)

**Figura 42. Ejecución fallida y corrección en curso.**
Qué se observa: la pestaña Actions con la ejecución del error intencional marcada en rojo y, encima, la ejecución de la corrección en progreso.

![Figura 42](imgejercicios/42.png)

**Figura 43. Detalle del job fallido.**
Qué se observa: el log del paso `Ejecutar linting` con el mensaje `Parsing error: Unexpected token }` y el proceso terminando con código de salida 1.

![Figura 43](imgejercicios/43.png)

**Figura 49. Verificación local de la corrección.**
Qué se observa: el archivo `app.js` sin la llave adicional y la terminal ejecutando las comprobaciones locales antes de subir la corrección.

![Figura 49](imgejercicios/49.png)

**Figura 50. Commit y push de la corrección.**
Qué se observa: la terminal ejecutando `git add app.js`, el commit `fix: corrige error de sintaxis intencional` y el push a `main`.

![Figura 50](imgejercicios/50.png)

---

# Ejercicio 3.4: Uso de matrices de ejecución

**Objetivo:** modificar el workflow para ejecutar el mismo job en paralelo con dos versiones de Node.js y verificar los dos jobs en la pestaña Actions.

## Desarrollo

**Figura 44. Workflow con matriz de versiones.**
Qué se observa: el archivo `ci.yml` con `strategy.matrix.node-version: [20, 22]` y el uso de `${{ matrix.node-version }}` en la configuración de Node.js.

![Figura 44](imgejercicios/44.png)

**Figura 45. Ejecución de la matriz en cola.**
Qué se observa: la pestaña Actions con la ejecución del commit `ci: agrega matriz de versiones de node.js` en estado de cola.

![Figura 45](imgejercicios/45.png)

**Figura 47. Historial con la ejecución de la matriz.**
Qué se observa: la lista de ejecuciones del workflow donde aparece la corrida de la matriz y las ejecuciones anteriores del pipeline.

![Figura 47](imgejercicios/47.png)

**Figura 48. Detalle de las ejecuciones.**
Qué se observa: la lista de ejecuciones con el commit de la matriz, el commit de corrección, el error intencional y las ejecuciones exitosas previas.

![Figura 48](imgejercicios/48.png)

**Figura 51. Seguimiento de la matriz.**
Qué se observa: la pestaña Actions con la ejecución de la matriz registrada y su estado dentro del historial de workflows.

![Figura 51](imgejercicios/51.png)

**Figura 52. Resumen de la matriz con dos jobs.**
Qué se observa: el resumen de la ejecución con los dos jobs de la matriz, `build-and-test (20)` y `build-and-test (22)`, ambos completados correctamente.

![Figura 52](imgejercicios/52.png)

**Figura 53. Historial final de ejecuciones.**
Qué se observa: la lista final de ejecuciones del workflow con la matriz, la corrección del error y las ejecuciones anteriores.

![Figura 53](imgejercicios/53.png)

**Figura 54. Resultado final de la matriz.**
Qué se observa: el resumen de la ejecución exitosa de la matriz con los dos trabajos completados y la duración total del workflow.

![Figura 54](imgejercicios/54.png)

---

# Conclusiones

La integración continua permitió comprobar, de forma automática, que la aplicación se instala, se analiza y se prueba correctamente cada vez que se sube un cambio. El pipeline comenzó con un único paso de pruebas y fue creciendo hasta incluir el linting y una matriz de versiones de Node.js, lo que demuestra que un workflow puede adaptarse a medida que el proyecto lo necesita.

El fallo intencional fue especialmente útil: al introducir una llave adicional en `app.js`, ESLint detuvo el pipeline y GitHub mostró el error exacto con el archivo y la línea. Después de corregir el código, el workflow volvió a pasar, lo que confirma que el pipeline no solo informa el error, sino que también verifica la corrección.

La matriz de ejecución mostró otra ventaja de CI: el mismo conjunto de pruebas se ejecutó en paralelo con Node.js 20 y Node.js 22, sin duplicar trabajo manual. Esto ayuda a detectar incompatibilidades entre versiones antes de que el código llegue a producción.

En conjunto, el laboratorio demuestra que GitHub Actions permite automatizar la calidad del código con poco esfuerzo de configuración y que las capturas de cada etapa sirven como evidencia de que el pipeline funcionó de principio a fin.
