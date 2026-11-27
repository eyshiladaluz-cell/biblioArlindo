// Conexão do site com o Supabase.

const SUPABASE_URL = "https://yzxxrgzgiiouaqkdgqom.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY = "sb_publishable_E9_1zYTAGwuhV1dA0WBAnQ_9U_2P9lF";

// Cria a conexão que será utilizada pelos outros arquivos.
const db = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
); 