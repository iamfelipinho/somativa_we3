<script setup>
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

// Cria uma instância da store do carrinho
const cartStore = useCartStore()

// Cria uma instância do router
const router = useRouter()

// Função para remover itens do carrinho
const removeFromCart = (index) => {
  cartStore.removeFromCart(index)
}

// Verificar se o usuário está autenticado
if (!localStorage.getItem('isAuthenticated')) {
  // Caso não esteja autenticado, redireciona para a página de login
  router.push('/login')
}
</script>

<template>
  <div class="cart-container">
    <h2 class="title">{{ $t('CART.TITLE') }}</h2>
    <div class="cart-table">
      <!-- Cabeçalho da tabela com os nomes das peças -->
      <div class="cart-header">
        <span>Guidão</span>
        <span>Motor</span>
        <span>Roda Frente</span>
        <span>Roda Traseira</span>
        <span>Ações</span>
      </div>

      <!-- Linhas da tabela para cada moto no carrinho -->
      <div v-for="(moto, index) in cartStore.cart" :key="index" class="cart-row">
        <div class="cart-item">
          <img :src="moto.guidao" alt="Guidão" />
        </div>
        <div class="cart-item">
          <img :src="moto.motor" alt="Motor" />
        </div>
        <div class="cart-item">
          <img :src="moto.rodaFrente" alt="Roda Frente" />
        </div>
        <div class="cart-item">
          <img :src="moto.rodaTraseira" alt="Roda Traseira" />
        </div>
        <div class="cart-actions">
          <button @click="removeFromCart(index)" class="remove-button">Remover</button>
        </div>
        
      </div>
      
    </div>
    <div class="cart-total">
      Total de Motos: {{ cartStore.cart.length }}
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  width: 100%;
}



.cart-table {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 100%;
  max-width: 900px;
  margin-bottom: 30px;
}

.cart-header, .cart-row {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

.cart-header {
  background-color: #1f1f1f;
  font-weight: bold;
}

.cart-header span {
  width: 20%;
  text-align: center;
  font-size: 20px;
}

.cart-item img {
  width: 120px; /* Aumentando o tamanho das imagens */
  height: auto;
  border-radius: 6px;
  border: 1px solid #ddd;
  transition: transform 0.3s;
}

.cart-item img:hover {
  transform: scale(1.1);
}

.cart-actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.remove-button {
  background-color: #ff3333;
  color: #3f3f3f;
  font-weight: bold;
  padding: 10px 20px; /* Tamanho maior para o botão */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
}

.remove-button:hover {
  background-color: #cc0000;
}

.cart-total {
  font-size: 26px; /* Aumentando o tamanho do total */
  font-weight: bold;
  margin-top: 30px;
  color: #ff6600;
  text-align: center;
}
</style>
