async function translate(molecule_smiles) {
    const response = await fetch(`https://askcos.mit.edu/api/draw/?smiles=${encodeURIComponent(molecule_smiles)}`);
    if (!response.ok) {
        throw new Error('Invilid SMILES or Network response was not ok');
    }
    const svgImage = await response.text();
    return svgImage;
}


function show(x, y, text, translateText) {
    let container = document.createElement('div')
    container.innerHTML = `
    <header>Molecule to Image<span class="close">X</span></header>
    <main>
      <div class="source">
        <div class="title">SMILES</div>
        <div class="content">${text}</div>
      </div>
      <div class="dest">
        <div class="title">Image</div>
        <div class="content">${translateText}</div>
      </div>
    </main>
    `
    container.classList.add('translate-panel')
	container.classList.add('show')
    container.style.left = x + 'px'
    container.style.top = y + 'px'
    document.body.appendChild(container)

	let close = container.querySelector('.close')
    close.onclick = () => {
        container.classList.remove('show')
    }

    document.addEventListener('click', function(event) {
        if (!container.contains(event.target)) {
            container.classList.remove('show')
        }
    })
}

window.onmouseup = async function (e) {

    
    if (e.button != 0) {
        return;
    }
    
    
    let text = window.getSelection().toString().trim()
    if (!text) {
        return;
    }

    
    let translateText = await translate(text)

    
    show(e.pageX, e.pageY, text, translateText)
}