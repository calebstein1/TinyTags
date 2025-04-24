const Tags_ElementsList = document.querySelectorAll('[data-tag]');
const Tags_ClickableList = document.querySelectorAll('[data-tag-clickable]');
let Tags_ActiveTags = 0;

function Tags_InitTags() {
	const tag_map = {};
	let i, c = 0, current = 1;

	for (i = 0; i < Tags_ElementsList.length; i++) {
		if (!tag_map[Tags_ElementsList[i].dataset.tag]) {
			tag_map[Tags_ElementsList[i].dataset.tag] = current;
			Tags_ActiveTags |= current;
			if (++c >= 64) {
				console.log("Tags: Error: Maximum tag limit reached");
			} else {
				console.log(`Enumerating tag ${Tags_ElementsList[i].dataset.tag} as ${current}`);
				current <<= 1;
			}
		}
		Tags_ElementsList[i].dataset.tag = tag_map[Tags_ElementsList[i].dataset.tag];
	}
	for (i = 0; i < Tags_ClickableList.length; i++) {
		Tags_ClickableList[i].dataset.tagClickable = tag_map[Tags_ClickableList[i].dataset.tagClickable];
		Tags_ClickableList[i].addEventListener('click', (e) => {
			const t = Number(e.target.dataset.tagClickable);
			const doHide = Tags_ActiveTags & t;
			let i;

			e.preventDefault();

			if (doHide) {
				console.log(`Disabling tag ${t}`);
				Tags_ActiveTags &= ~t;
			} else {
				console.log(`Enabling tag ${t}`);
				Tags_ActiveTags |= t;
			}

			for (i = 0; i < Tags_ElementsList.length; i++) {
				if (Number(Tags_ElementsList[i].dataset.tag) !== t) continue;

				if (doHide)
					Tags_ElementsList[i].classList.add('Tags_Hidden');
				else
					Tags_ElementsList[i].classList.remove('Tags_Hidden');
			}
		});
	}
}

Tags_InitTags();