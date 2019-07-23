<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
  export default {
    name: 'TdComponent',
    props: {
      cellData: String,
      cellIndex: Number,
      rowIndex: Number,
    },
    methods: {
      onClickTd () {
        //이미 누른칸을 다시 누른경우
        if (this.cellData) return

        const rootData = this.$root.$data
        //클릭하면 턴의 값을 데이타에 채워넣음
        this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn)

        let win = false
        //가로줄 성공
        if (rootData.tableData[this.rowIndex][0] === rootData.turn
            && rootData.tableData[this.rowIndex][1] === rootData.turn
            && rootData.tableData[this.rowIndex][2] === rootData.turn
        ) {
          win = true
        }
        //세로줄 성공
        if (rootData.tableData[0][this.cellIndex] === rootData.turn
            && rootData.tableData[1][this.cellIndex] === rootData.turn
            && rootData.tableData[2][this.cellIndex] === rootData.turn
        ) {
          win = true
        }
        //좌에서 우로 대각선 성공
        if (rootData.tableData[0][0] === rootData.turn
            && rootData.tableData[1][1] === rootData.turn
            && rootData.tableData[2][2] === rootData.turn
        ) {
          win = true
        }
        //우에서 좌로 대각선 성공
        if (rootData.tableData[0][2] === rootData.turn
            && rootData.tableData[1][1] === rootData.turn
            && rootData.tableData[2][0] === rootData.turn
        ) {
          win = true
        }

        //이긴경우
        if (win) {
          rootData.winner = rootData.turn
          rootData.turn = 'O'
          rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']]
        } else {
          let all = true // all이 true면 무승부라는 뜻
          rootData.tableData.forEach((row) => { // 무승부 검사
            row.forEach((cell) => {
              if (!cell) {
                all = false
              }
            })
          })
          if (all) { // 무승부
            rootData.winner = ''
            rootData.turn = 'O'
            rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']]
          } else { //턴 오버
            rootData.turn = rootData.turn === 'O' ? 'X' : 'O'
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>