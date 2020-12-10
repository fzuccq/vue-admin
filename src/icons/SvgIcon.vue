<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
import { reactive,ref,onMounted, computed } from '@vue/composition-api'
export default {
  name:"svgIcon",
  props:{
    iconClass:{
      type:String,
      required:true
    },
    className:{
      type:String,
      required:true
    }
  },
  setup(props){
    console.log(props);
    const msg=ref("SVG");
    const svgClass=computed(()=>{
      if(props.className){
        return `svg-icon ${props.className}`;
      }else{
        return "svg-icon";
      }
    })
    const iconName=computed(()=>`#icon-${props.iconClass}`);
    return {
      msg,
      svgClass,
      iconName
    };
  }
}
</script>
<style lang="scss" scoped>
  .svg-icon {
    width:1em;
    height:1em;
    fill:currentColor;
  }
</style>