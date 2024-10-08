interface ImportMetaEnv {
  readonly DB_PASSWORD: string;
  readonly PUBLIC_POKEAPI: string;
  readonly GROQ_API_KEY: string;
  readonly DEBUG?: boolean;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}