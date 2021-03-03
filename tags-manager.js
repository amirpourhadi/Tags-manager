let tags = storage.getTagsNameFromStorage || [];
let storageTags = [];
let tagContainer = document.querySelector('.tag-container');
let txtTagName = document.querySelector('#txt-tag-name');
let btnAddTag = document.querySelector('#btn-add-tag');
let btnReadOnly = document.querySelector('#btn-read-only');
let isReadOnlyMode = false;

btnAddTag.addEventListener('click', onAddTagsClick);
btnReadOnly.addEventListener('click', onReadOnlyClick);


/* Start Events */
function onAddTagsClick() {
  const tagsName = txtTagName.value;

  if (tagsName) {
    let tagsList = tagsName.split(',');
    tagsList = removeDuplicatedTags(tagsList);
    tagsList.forEach(tag => {
              tag && tags.push(tag.trim());
              storage.setStorage = tags;
    })
    
    updateTags();
    txtTagName.value = '';
  }
}


function onReadOnlyClick(event) {
  if(event.currentTarget.checked) {
    tagContainer.classList.add('disable');
    txtTagName.classList.add('disable');
    btnAddTag.classList.add('disable');
  }else{
    tagContainer.classList.remove('disable');
    txtTagName.classList.remove('disable');
    btnAddTag.classList.remove('disable');
  }
}
/* End Events */

/* Start Operational Functions */
const removeDuplicatedTags = (inputTags = []) => {
 const duplicatedTags = [];
   const filteredTags = inputTags.filter(tagName => {
   if(!storage.getTagsNameFromStorage.includes(tagName)){
    return tagName;
   }else {
    duplicatedTags.push(tagName);
   }
 })

 if(duplicatedTags.length > 0) {
   alert(`Duplicated tags did add to the list: ${duplicatedTags.join(',')}`)
 }

 return filteredTags;
}

const updateTags = () => {
  clearTags();

  tags.slice().reverse().forEach(tag => {
    tagContainer.prepend(createTag(tag));
  });
}

const createTag = (tag) => {
  const div = document.createElement('div');
  div.classList.add('tag');

  const span = document.createElement('span');
  span.innerHTML = tag;

  const i = document.createElement('i');
  i.classList.add('close');
  i.setAttribute('data-id', tag);
  i.onclick = removeTag;
  span.append(i);

  div.append(span);

  return div;
}

const removeTag = (event) => {
  const targetTagButton = event.currentTarget;
  const id = targetTagButton.dataset.id;
  const index = tags.indexOf(id);
  
  tags.splice(index, 1);
  storage.removeTagFromStorage(id);

  updateTags();
}

const clearTags = () => {
  tagContainer
    .querySelectorAll('.tag')
    .forEach(tagElement => tagElement.remove());
}

/* End Operational Functions */

/* Function Call to init tags and UI */
updateTags();
