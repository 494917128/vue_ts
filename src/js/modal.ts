import Event from '@/core/Event'
export default {
	// 模态框
	_showModal (content?: any) {
		Event.$emit('modal/show', content)
	},
	// 提示框
	_showToast (content?: any) {
		Event.$emit('toast/show', content)
	},
	// loading框
	_showLoading (content?: any) {
		Event.$emit('loading/show', content)
	},
	_hideLoading (content?: any) {
		Event.$emit('loading/hide', content)
	}
}
