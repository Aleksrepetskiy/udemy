window.addEventListener('DOMContentLoaded', () => {
	const tabContents = document.querySelectorAll('.tabcontent'),
		tabsList = document.querySelector('.tabheader__items'),
		tabs = tabsList.querySelectorAll('.tabheader__item');

	function hideTabContents() {
		tabContents.forEach((item) => {
			//item.style.display = "none"
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		})
		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		})
	}
	function showTabContent(position = 0) {
		// tabContents[position].style.display = "block";
		tabContents[position].classList.add('show', 'fade');
		tabContents[position].classList.remove('hide');
		tabs[position].classList.add('tabheader__item_active');
	}
	tabsList.addEventListener('click', function(e){
		const target = e.target
		if(target.classList.contains("tabheader__item")) {
			tabs.forEach((item,num)=>{
				if(item == target) {
					hideTabContents()
					showTabContent(num)
				}
			})
		}
	})




	hideTabContents()
	showTabContent()

})