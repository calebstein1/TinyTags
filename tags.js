const Tags_ElementsList = document.querySelectorAll('[data-tag]');
const Tags_ClickableList = document.querySelectorAll('[data-tag-clickable]');
const Tags_CheckableList = document.querySelectorAll('[data-tag-checkable]');
let Tags_ActiveTags = 0;

function Tags_InitTags() {
	const tag_map = {};
	let i, j, c = 0, current = 1, ct;
	let tag_array = [];

	for (i = 0; i < Tags_ElementsList.length; i++) {
		tag_array = Tags_ElementsList[i].dataset.tag.split(' ');
		ct = 0;
		for (j = 0; j < tag_array.length; j++) {
			if (!tag_map[tag_array[j]]) {
				tag_map[tag_array[j]] = current;
				ct |= current;
				if (++c >= 64)
					console.log("Tags: Error: Maximum tag limit reached");
				else
					current <<= 1;
			} else {
				ct |= tag_map[tag_array[j]];
			}
		}
		Tags_ElementsList[i].dataset.tag = ct;
		Tags_ActiveTags |= ct;
	}
	for (i = 0; i < Tags_ClickableList.length; i++) {
		Tags_ClickableList[i].dataset.tagClickable = tag_map[Tags_ClickableList[i].dataset.tagClickable];
		Tags_ClickableList[i].classList.add('Tags_ToggleActive');
		Tags_ClickableList[i].addEventListener('click', (e) => {
			const t = Number(e.target.dataset.tagClickable);

			e.preventDefault();
			Tags_UpdatePage(t);
		});
	}
	for (i = 0; i < Tags_CheckableList.length; i++) {
		Tags_CheckableList[i].dataset.tagCheckable = tag_map[Tags_CheckableList[i].dataset.tagCheckable];
		Tags_CheckableList[i].classList.add('Tags_CheckActive');
		Tags_CheckableList[i].checked = true;
		Tags_CheckableList[i].addEventListener('change', (e) => {
			const t = Number(e.target.dataset.tagCheckable);

			Tags_UpdatePage(t);
		});
	}
}

function Tags_UpdatePage(t) {
	let i, tag;

	for (i = 0; i < Tags_ElementsList.length; i++) {
		tag = Number(Tags_ElementsList[i].dataset.tag);
		if (!(tag & t)) continue;

		if ((Tags_ActiveTags & t) && !(Tags_ActiveTags & (tag & ~t)))
			Tags_ElementsList[i].classList.add('Tags_Hidden');
		else
			Tags_ElementsList[i].classList.remove('Tags_Hidden');
	}
	for (i = 0; i < Tags_ClickableList.length; i++) {
		if (!(Number(Tags_ClickableList[i].dataset.tagClickable) & t)) continue;

		if (Tags_ActiveTags & t) {
			Tags_ClickableList[i].classList.remove('Tags_ToggleActive');
			Tags_ClickableList[i].classList.add('Tags_ToggleInactive');
		} else {
			Tags_ClickableList[i].classList.add('Tags_ToggleActive');
			Tags_ClickableList[i].classList.remove('Tags_ToggleInactive');
		}

	}
	for (i = 0; i < Tags_CheckableList.length; i++) {
		if (!(Number(Tags_CheckableList[i].dataset.tagCheckable) & t)) continue;

		if (Tags_ActiveTags & t) {
			Tags_CheckableList[i].classList.remove('Tags_CheckActive');
			Tags_CheckableList[i].classList.add('Tags_CheckInactive');
			Tags_CheckableList[i].checked = false;
		} else {
			Tags_CheckableList[i].classList.add('Tags_CheckActive');
			Tags_CheckableList[i].classList.remove('Tags_CheckInactive');
			Tags_CheckableList[i].checked = true;
		}
	}

	if (Tags_ActiveTags & t)
		Tags_ActiveTags &= ~t;
	else
		Tags_ActiveTags |= t;
}

export { Tags_InitTags };