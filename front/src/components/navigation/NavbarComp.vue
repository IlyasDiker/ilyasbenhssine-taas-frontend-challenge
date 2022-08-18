<template>
    <nav class="navbar">
        <div class="flex-row gap-10">
            <div class="navbar-hero-logo">
                <router-link to="/app"><AppLogo/></router-link>
            </div>
        </div>
        
        <div class="flex-row">
            <template v-if="accountStore.isAuthenticated()">
            <div class="dropdown-wrapper">
                <div class="navbar-avatar" tabindex="0" 
                @click="openDropdown = !openDropdown"
                @keydown.enter="openDropdown = !openDropdown"
                aria-controls="dropdown-contianer--navbar"
                :aria-expanded="openDropdown">
                    <span class="navbar-avatar-label text-xs">{{accountStore.account.name}}</span>
                    <div class="navbar-avatar-image-wrapper">
                        <img :src="accountStore.account.avatar_url" alt="">
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                        class="dropdown_caret" :class="openDropdown ? 'flip':''">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="dropdown-container" :class="openDropdown ? 'show':''" id="dropdown-contianer--navbar">
                    <button class="danger" @click="logout()">Logout</button>
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
    methods: {
        logout(){
            this.accountStore.logout();
            this.$router.push('/');
        }
    },
    data () {
        return {
            openDropdown: false
        }
    },
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
        cursor: pointer;
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
    .dropdown-wrapper{
        position: relative;
        user-select: none;
    }
    .dropdown-container{
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translateY(calc(100% + 5px)) scale(0.8);
        opacity: 0;
        visibility: hidden;
        width: 100%;
        background: var(--background);
        border: 1px solid #27272a;
        border-radius: 5px;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06));
        padding: 5px 0;
        display: flex;
        flex-direction: column;
        transition: 0.2s ease-in-out;
        &.show{
            transform: translateY(calc(100% + 5px));
            opacity: 1;
            visibility: visible;
        }
        button{
            border-radius: 0;
            width: 100%;
            display: flex;
            flex-direction: row;
            text-align: start;
            justify-content: flex-start;
            background: transparent;
            padding: 5px 10px;
            color: white;
            font-size: 14px;
            &:hover{
                background: #27272a;
            }
            &.danger{
                &:hover{
                    background: #7f1d1d60;
                }
            }
        }
    }
    .dropdown_caret{
        width: 15px;
        margin-left: -5px;
        margin-top: 2px;
        transition: 0.2s ease-in-out;
        &.flip{
            transform: rotateZ(180deg);
        }
    }
</style>