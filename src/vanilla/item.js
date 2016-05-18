export default (items) => {
  const itemsHTML = items.map(item => {
    const { id, str, int } = item
    return `
      <li id=${id}>
        <div class="row">
          <span class="str">${str}</span>
          <span class="int">${int}</span>
        </div>
      </li>`
  })
  return itemsHTML.join('')
}