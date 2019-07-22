<template>
  <tr>
    <td-component :cell-data="cellData" :cell-index="index" :key="index"
                  :row-index="rowIndex" v-for="(cellData, index) in rowData"></td-component>
  </tr>
</template>

<script>
  import TdComponent from './TdComponent'

  export default {
    name: 'TrComponent',
    components: { TdComponent },
    props: {
      rowData: Array,
      rowIndex: Number
    }
  }
</script>

<style scoped>

</style>