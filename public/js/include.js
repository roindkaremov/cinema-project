async function includeHTML(selector, path) {
    const el = document.querySelector(selector)
    if (!el) return

    const res = await fetch(path)
    if(!res.ok){
        console.error(`Не удалось подключить ${path}: ${res.status}`)
        return
    }

    el.innerHTML = await res.text()

}

async function initLayout() {
    await Promise.all([
        includeHTML('#header-placeholder', 'partials/header.html'),
        includeHTML('#footer-placeholder', 'partials/footer.html'),
    ])
}

initLayout();