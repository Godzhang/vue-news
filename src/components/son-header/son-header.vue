<template>
	<div class="sonHeader">
		<div class="model" :class="model">
			<span class="back" @click="back">
				<i class="icon iconfont icon-back"></i>
			</span>
			<h3>{{ title }}</h3>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
			default: '收藏'
		}
	},
	methods: {
		back(){
			this.$emit('back');
		}
	},
	computed: {
		model(){
			return this.$store.state.isNight ? 'night' : 'morning';
		}
	}
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.scss';
@import '../../assets/css/iconfont.css';

.sonHeader{
	position: fixed;
    width: 100%;
    height: 40px;
    text-align: center;
    z-index: 50;
    line-height: 40px;
    background: rgb(2,143,214);
    .model{
    	&.morning{
			color: rgb(51,51,51);
        	background-color: rgb(2,143,214);
    	}	
    	&.night{
			color: rgb(184,184,184);
        	background-color: rgb(85,85,85);
    	}
    	& > h3{
			font-size: 20px;
        	color: white;
    	}
    	.back{
    		display: block;
			position: absolute;
	        left: 0;
	        top: 0;
	        width: 40px;
	        height: 40px;
	        cursor: pointer;
    		.iconfont{
				position: relative;
	            line-height: 40px;
	            font-size: 22px;
	            color: #fff;
    		}
    	}
    }
}
    
</style>