<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart.ts'

export default {
  name: 'MotoImages',
  setup() {
    const cartStore = useCartStore()
    const guidaoImages = ref([])
    const motorImages = ref([])
    const rodaFrenteImages = ref([])
    const rodaTraseiraImages = ref([])

    const currentIndex = ref({
      guidao: 0,
      motor: 0,
      rodaFrente: 0,
      rodaTraseira: 0,
    })

    onMounted(() => {
      axios.get('/db.json')
        .then(response => {
          guidaoImages.value = response.data.MOTOS.guidao
          motorImages.value = response.data.MOTOS.motor
          rodaFrenteImages.value = response.data.MOTOS.rodaFrente
          rodaTraseiraImages.value = response.data.MOTOS.rodaTraseira
        })
        .catch(error => {
          console.error('Erro ao carregar o arquivo JSON:', error)
        })
    })

    const nextImage = (part) => {
      const totalImages = {
        guidao: guidaoImages.value.length,
        motor: motorImages.value.length,
        rodaFrente: rodaFrenteImages.value.length,
        rodaTraseira: rodaTraseiraImages.value.length,
      }
      currentIndex.value[part] = (currentIndex.value[part] + 1) % totalImages[part]
    }

    const previousImage = (part) => {
      const totalImages = {
        guidao: guidaoImages.value.length,
        motor: motorImages.value.length,
        rodaFrente: rodaFrenteImages.value.length,
        rodaTraseira: rodaTraseiraImages.value.length,
      }
      currentIndex.value[part] = (currentIndex.value[part] - 1 + totalImages[part]) % totalImages[part]
    }

    const addToCart = () => {
      const selectedMoto = {
        guidao: guidaoImages.value[currentIndex.value.guidao],
        motor: motorImages.value[currentIndex.value.motor],
        rodaFrente: rodaFrenteImages.value[currentIndex.value.rodaFrente],
        rodaTraseira: rodaTraseiraImages.value[currentIndex.value.rodaTraseira],
      }
      cartStore.addToCart(selectedMoto)
      console.log('Moto adicionada ao carrinho:', selectedMoto)
    }

    return {
      guidaoImages,
      motorImages,
      rodaFrenteImages,
      rodaTraseiraImages,
      currentIndex,
      nextImage,
      previousImage,
      addToCart
    }
  }
}
</script>




<template>
  <div>
    <h2>{{ $t('BUILD.TITLE') }}</h2>

    <!-- Botão para adicionar ao carrinho -->
    <button class="add-to-cart-button" @click="addToCart">Adicionar ao Carrinho</button>

    <!-- Guidao -->
    <div class="selecao-de-pecas guidao">
      <button class="botao-selecao" @click="previousImage('guidao')">◀</button>
      <div class="image-container">
        <img :src="guidaoImages[currentIndex.guidao]" alt="Guidão" />
      </div>
      <button class="botao-selecao" @click="nextImage('guidao')">▶</button>
    </div>

    <!-- Motor -->
    <div class="selecao-de-pecas motor">
      <button class="botao-selecao" @click="previousImage('motor')">◀</button>
      <div class="image-container">
        <img :src="motorImages[currentIndex.motor]" alt="Motor" />
      </div>
      <button class="botao-selecao" @click="nextImage('motor')">▶</button>
    </div>

    <!-- Roda Frente -->
    <div class="selecao-de-pecas frente">
      <button class="botao-selecao" @click="previousImage('rodaFrente')">◀</button>
      <div class="image-container">
        <img :src="rodaFrenteImages[currentIndex.rodaFrente]" alt="Roda Frente" />
      </div>
      <button class="botao-selecao" @click="nextImage('rodaFrente')">▶</button>
    </div>

    <!-- Roda Traseira -->
    <div class="selecao-de-pecas traseira">
      <button class="botao-selecao" @click="previousImage('rodaTraseira')">◀</button>
      <div class="image-container">
        <img :src="rodaTraseiraImages[currentIndex.rodaTraseira]" alt="Roda Traseira" />
      </div>
      <button class="botao-selecao" @click="nextImage('rodaTraseira')">▶</button>
    </div>
  </div>
</template>

  
  
  
  <style scoped>
  .image-container img {
    width: 160px; /* Diminuindo a largura */
    height: auto;
    cursor: pointer;
  }
  
  .selecao-de-pecas {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    margin: 5px;
    border-radius: 8px;
    width: 180px; /* Largura ajustada */
    height: 180px; /* Altura ajustada */
  }
  
  .botao-selecao {
    width: 20px;
    height: 20px;
    font-size: 12px;
    margin: 2px;
    cursor: pointer;
    background-color: #ff6600;
  }


  .frente{
    position: relative;
    left: 37rem;
    bottom: 105px;
  }

  .motor{
    position: relative;
    left: 50rem;
    top: 5rem;
  }


  .traseira {
    position: relative;
    left: 63rem;
    bottom: 18rem;
  }

  .guidao {
    position: relative;
    left: 50rem ;
    top: 5rem;
  }


  .add-to-cart-button {
  background-color: #ff6600;
  color: #000000;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-button:hover {
  background-color: #cc5200;
}
  </style>
  