<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <lotto-ball :key="ball" v-bind:number="ball" v-for="ball in winBalls"></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball :number="bonus" v-if="bonus"></lotto-ball>
    <button @click="onClickRedo" v-if="redo">한 번 더!</button>
  </div>
</template>
<script>
  import LottoBall from './LottoBall'

  // 번호 추첨
  function getWinNumbers () {
    const candidate = Array(45).fill().map((v, i) => i + 1)
    const shuffle = []
    while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0])
    }
    const bonusNumber = shuffle[shuffle.length - 1]
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c)
    return [...winNumbers, bonusNumber]
  }

  const timeouts = []

  export default {
    name: 'LottoGenerator',
    components: { LottoBall },
    data () {
      return {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false
      }
    },
    computed: {},
    methods: {
      // 한번 더 버튼
      onClickRedo () {
        this.winNumbers = getWinNumbers()
        this.winBalls = []
        this.bonus = null
        this.redo = false
      },
      showBalls () {
        // 번호 추첨결과 하나씩 공에다가 푸쉬
        for (let i = 0; i < this.winNumbers.length - 1; i++) {
          timeouts[i] = setTimeout(() => {
            this.winBalls.push(this.winNumbers[i])
          }, ( i + 1 ) * 1000)
        }

        // 보너스
        timeouts[6] = setTimeout(() => {
          this.bonus = this.winNumbers[6]
          this.redo = true
        }, 7000)
      }
    },
    mounted () {
      this.showBalls()
    },
    beforeDestroy () {
      timeouts.forEach((t) => {
        clearTimeout(t)
      })
    },
    watch: {
      redo (value, oldValue) {
        if (value === false) {
          this.showBalls()
        }
      }
    }
  }
</script>
<style scoped>
</style>