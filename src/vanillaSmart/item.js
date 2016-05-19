const strPartial = (id, str) => `<span id="${id}.str" class="str">${str}</span>`
const intPartial = (id, int) => `<span id="${id}.int" class="int">${int}</span>`
const createEl = (html) => {
  var el = document.createElement('div');
  el.innerHTML = html;
  return el.childNodes[0];
}
const replaceEl = (selector, html) => {
  const el = document.getElementById(selector)
  const newEl = createEl(html)
  if (el && newEl) {
    el.parentNode.replaceChild(newEl, el)
  }
}

export default (items) => {
  const itemsHTML = items.map(item => {
    const { id, str, int } = item
    return `
      <li id=${id}>
        <div class="row">
          <input type="checkbox" />
          ${strPartial(id, str)}
          ${intPartial(id, int)}
        </div>
      </li>`
  })
  return itemsHTML.join('')
}

export const itemUpdate = (newItems, prevItems) => {
  newItems.forEach((item, i) => {
    if (item.str !== prevItems[i].str) {
      replaceEl(`${item.id}.str`, strPartial(item.id, item.str))
    }
    if (item.int !== prevItems[i].int) {
      replaceEl(`${item.id}.int`, intPartial(item.id, item.int))
    }
  })
}