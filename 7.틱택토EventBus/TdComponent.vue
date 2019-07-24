<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
  import EventBus from './EventBus'

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

        EventBus.$emit('clickTd', this.rowIndex, this.cellIndex)
      }
    }
  }
</script>

<style scoped>

</style>