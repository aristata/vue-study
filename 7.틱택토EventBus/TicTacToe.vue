<template>
  <div>
    <div>{{ turn }} 님의 턴입니다.</div>
    <table-component :table-data="tableData"></table-component>
    <div v-if="winner">{{ winner }} 님의 승리입니다!!!</div>
  </div>
</template>
<script>
  import TableComponent from './TableComponent'
  import EventBus from './EventBus'

  export default {
    name: 'TicTacToe',
    components: { TableComponent },
    data () {
      return {
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', '']
        ],
        turn: 'O',
        winner: ''
      }
    },
    computed: {},
    methods: {
      onClickTd (rowIndex, cellIndex) {
        //클릭하면 턴의 값을 데이타에 채워넣음
        this.$set(this.tableData[rowIndex], cellIndex, this.turn)

        let win = false
        //가로줄 성공
        if (this.tableData[rowIndex][0] === this.turn
            && this.tableData[rowIndex][1] === this.turn
            && this.tableData[rowIndex][2] === this.turn
        ) {
          win = true
        }
        //세로줄 성공
        if (this.tableData[0][cellIndex] === this.turn
            && this.tableData[1][cellIndex] === this.turn
            && this.tableData[2][cellIndex] === this.turn
        ) {
          win = true
        }
        //좌에서 우로 대각선 성공
        if (this.tableData[0][0] === this.turn
            && this.tableData[1][1] === this.turn
            && this.tableData[2][2] === this.turn
        ) {
          win = true
        }
        //우에서 좌로 대각선 성공
        if (this.tableData[0][2] === this.turn
            && this.tableData[1][1] === this.turn
            && this.tableData[2][0] === this.turn
        ) {
          win = true
        }

        //이긴경우
        if (win) {
          this.winner = this.turn
          this.turn = 'O'
          this.tableData = [['', '', ''], ['', '', ''], ['', '', '']]
        } else {
          let all = true // all이 true면 무승부라는 뜻
          this.tableData.forEach((row) => { // 무승부 검사
            row.forEach((cell) => {
              if (!cell) {
                all = false
              }
            })
          })
          if (all) { // 무승부
            this.winner = ''
            this.turn = 'O'
            this.tableData = [['', '', ''], ['', '', ''], ['', '', '']]
          } else { //턴 오버
            this.turn = this.turn === 'O' ? 'X' : 'O'
          }
        }
      }
    },
    created () {
      EventBus.$on('clickTd', this.onClickTd)
    }
  }
</script>
<style>
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>