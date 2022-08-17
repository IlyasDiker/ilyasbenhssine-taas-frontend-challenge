<template>
    <nav class="navbar">
        <div class="flex-row gap-10">
            <div class="navbar-hero-logo">
                <router-link to="/app"><AppLogo/></router-link>
            </div>
        </div>
        
        <div class="flex-row">
            <template v-if="accountStore.isAuthenticated()">
                <div class="navbar-avatar">
                    <span class="navbar-avatar-label text-xs">{{accountStore.account.name}}</span>
                    <div class="navbar-avatar-image-wrapper">
                        <img :src="accountStore.account.avatar_url" alt="">
                    </div>
                </div>
            </template>
        </div>
    </nav>
</template>

<script>
import { useAccountStore } from '@/stores/account'
import AppLogo from '../AppLogo.vue'
export default {
    setup() {
        const accountStore = useAccountStore();
        return { accountStore };
    },
    name: "NavbarComp",
    components: { AppLogo }
}
</script>

<style lang="scss" scoped>
    $avatar-size: 30px;
    $navbar-background: #20232aea;

    .navbar{
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        padding: 10px 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background: $navbar-background;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        z-index: 100;
        &-hero-logo{
            color: white;
            svg{
                width: 30px;
                height: 30px;
            }
        }
    }

    .navbar-avatar{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        &-image-wrapper{
            width: $avatar-size;
            height: $avatar-size;
            aspect-ratio: 1 / 1;
            position: relative;
            border-radius: 50%;
            overflow: hidden;
            flex-shrink: 0;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                user-select: none;
            }
        }
    }
</style>