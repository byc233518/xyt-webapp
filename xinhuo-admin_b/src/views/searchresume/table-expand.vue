<style scoped>
	.expand-row {
		margin-bottom: 16px;
	}
</style>
<template>
	<div>
		<Row>
			<Col span="4">
				<div>
					<img :src="row.img" alt="" style="width: 100px; height: 100px;"/>
				</div>
			</Col>
			<Col span="20" class="tl">
			<div class="expand-row">
				<span class="expand-key">最近工作: </span>
				<span class="expand-value">{{ row.movie }}</span>
			</div>
			<div class="expand-row">
				<span class="expand-key">毕业院校: </span>
				<span class="expand-value">{{ row.music }}</span>
			</div>
			<div class="expand-row">
				<span class="expand-key">历史工作: </span>
				<span class="expand-value">{{ row.music }}</span>
			</div>
			<div class="expand-row">
				<span class="expand-key">关键字: </span>
				<span class="expand-value">{{ row.music }}</span>
			</div>
			</Col>
		</Row>
	</div>
</template>
<script>
	export default {
		props: {
			row: Object
		},
	};
</script>