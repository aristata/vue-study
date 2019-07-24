<template>
  <table>
    <tr-component :key="index" :row-data="rowData" :row-index="index"
                  v-for="(rowData, index) in tableData"></tr-component>
  </table>
</template>

<script>
  import TrComponent from './TrComponent'

  export default {
    name: 'TableComponent',
    components: { TrComponent },
    props: {
      tableData: Array
    }
  }
</script>