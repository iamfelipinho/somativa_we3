import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Moto {
  guidao: string;
  motor: string;
  rodaFrente: string;
  rodaTraseira: string;
}

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Moto[]>([])

  const addToCart = (moto: Moto) => {
    cart.value.push(moto)
  }

  const removeFromCart = (index: number) => {
    cart.value.splice(index, 1)
  }

  const clearCart = () => {
    cart.value = []
  }

  return { cart, addToCart, removeFromCart, clearCart }
})
