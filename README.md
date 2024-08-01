# 🎶 SpotiEmotions 🎵

**SpotiEmotions** es una aplicación que utiliza la información de tu cuenta de Spotify para analizar tus canciones más escuchadas, extraer y resumir las letras mediante inteligencia artificial, y mostrar un resumen de tus emociones basado en tus canciones. Similar a las historias de Spotify Wrapped, esta herramienta proporciona una visión profunda de tus emociones, canciones, artistas y géneros más escuchados.

## 👥 Autores

- **zClut** - [Perfil de zClut](https://github.com/zclut)
- **klasinky** - [Perfil de klasinky](https://github.com/klasinky)
- **romentoss** - [Perfil de romentoss](https://github.com/romentoss)

## 🚀 Instalación

Para comenzar con **SpotiEmotions**, sigue estos pasos:

1. **Clona el repositorio:**

```bash
git clone https://github.com/zclut/spoti-emotions.git
```

2. **Navega al directorio del proyecto:**
```bash
cd spoti-emotions
```

3. **Instala las dependencias:**
```bash
npm install
# or
yarn install
```

4. **Configura las variables de entorno:**
```bash
SPOTIFY_CLIENT_ID=<SPOTIFY_CLIENT_ID>
SPOTIFY_CLIENT_SECRET=<SPOTIFY_CLIENT_SECRET>
AUTH_SECRET=<AUTH_SECRET>
GROQ_API_KEY=<GROQ_API_KEY>
DEBUG=<true | false> # Para usar datos falsos
```

5. **Inicia el servidor de desarrollo:**
```bash
npm start
# or
yarn start
```

## 📜 Uso

Una vez que el servidor esté en marcha, abre tu navegador y navega a `http://localhost:4321`. Aquí podrás conectar tu cuenta de Spotify y comenzar a explorar tu resumen emocional basado en tus canciones más escuchadas.

### Funcionalidades principales:

- **Resumen de Canciones:** Obtén un resumen de tus canciones más escuchadas.
- **Análisis de Letras:** Utiliza inteligencia artificial para analizar y resumir las letras de tus canciones.
- **Emociones del Usuario:** Determina las emociones del usuario basadas en las canciones más escuchadas.
- **Artistas y Géneros:** Visualiza los artistas y géneros más escuchados.

<!-- ## 📸 Capturas -->

## 📜 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más detalles.

---

**¡Gracias por usar SpotiEmotions!**