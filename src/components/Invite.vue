<template>
    <div class="invite">
        <div id="test"></div>
        <span style="display: inline-block;padding: 0.2rem;">I am 邀请</span>
        <span style="display: inline-block;padding: 0.2rem;">I am 邀请</span>
        <img src="../assets/images/hot2.png" alt="">
    </div>
</template>
<script>
export default {
    name: 'Invite',
    data() {
        return {

        }
    },
    methods: {
        test() {
            let func = () => {}

            const NUM = 45

            let arr = [1, 2, 4]

            let arrB = arr.map(item => item * 2)

            console.log('new Set(arrB)', new Set(arrB))
        }
    }
}
</script>