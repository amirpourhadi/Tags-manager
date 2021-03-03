
(function () {
    if (!window || !window.localStorage) {
        return;
    }

    if (!window.localStorage.getItem('tags')) {
        window.localStorage.setItem('tags', []);
    }
})();

const storage = {
    get getTagsNameFromStorage() {
        return window.localStorage.getItem('tags').split(',');
    },
    set setStorage(tags = []) {
        window.localStorage.setItem('tags', tags.join(','));
    },
    removeTagFromStorage: (tagName = '') => {
        const tags = window.localStorage.getItem('tags').split(',');
        if (tags) {
            const filteredTags = tags.filter(tag => tag !== tagName);
            window.localStorage.setItem('tags', filteredTags.join(','));
        }
    }
}
