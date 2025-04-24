const Tags_ElementsList = document.querySelectorAll('[data-tag]');
let Tags_ActiveTags = 0;

function Tags_InitTags() {
	const tag_map = {};
	let i, current = 1;

	for (i = 0; i < Tags_ElementsList.length; i++) {
		if (!tag_map[Tags_ElementsList[i].dataset.tag]) {
			tag_map[Tags_ElementsList[i].dataset.tag] = current;
			Tags_ActiveTags |= current;
			console.log(`Enumerating tag ${Tags_ElementsList[i].dataset.tag} as ${current}`);
			current <<= 1;
		}
		Tags_ElementsList[i].dataset.tag = tag_map[Tags_ElementsList[i].dataset.tag];
	}
}

Tags_InitTags();