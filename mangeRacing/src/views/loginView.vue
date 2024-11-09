<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    handleLogin() {
      if (this.username === 'admin' && this.password === 'admin') {
        alert("Login bem-sucedido! Não esqueça de ver a página de Not Found.");
        
        // Define o usuário como autenticado
        localStorage.setItem('isAuthenticated', 'true');

        // Recupera a URL de redirecionamento (se existir)
        const redirectTo = localStorage.getItem('redirectTo') || '/';

        // Redireciona para a página correta após o login
        this.$router.push(redirectTo);

        // Limpa a URL de redirecionamento após o login
        localStorage.removeItem('redirectTo');
      } else {
        this.errorMessage = 'Usuário ou senha incorretos.';
      }
    },
  },
};
</script>



<template>
    <div class="login-page">
        <div class="login-card">
            <h2 class="login-title">Login</h2>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="username">Usuário</label>
                    <input
                        type="text"
                        id="username"
                        v-model="username"
                        placeholder="Digite seu usuário"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        v-model="password"
                        placeholder="Digite sua senha"
                        required
                    />
                </div>
                <button type="submit" class="login-button">Entrar</button>
                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.login-page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #2b2b2b; /* Fundo suave para a página */
    overflow: hidden; /* Remove o scroll */
}

.login-card {
    width: 300px;
    padding: 20px;
    background-color: #333; /* Cor de fundo do card */
    color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.login-title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #ff6600; /* Cor laranja neon */
}

.form-group {
    margin-bottom: 15px;
    text-align: left;
}

.form-group label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    color: #ccc;
}

.form-group input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #555;
    border-radius: 4px;
    background-color: #222;
    color: #fff;
}

.login-button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    color: #fff;
    background-color: #ff6600; /* Laranja neon */
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.login-button:hover {
    background-color: #ff6600;
}

.error-message {
    margin-top: 15px;
    color: #ff6600;
    font-weight: bold;
}
</style>
