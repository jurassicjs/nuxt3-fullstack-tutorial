import {defineNuxtRouteMiddleware, useNuxtApp} from "#app";
import {useUser} from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async(to) => {
  const user = await useUser()
  
  if (user == null && user == undefined) {
    return '/'
  }
})
