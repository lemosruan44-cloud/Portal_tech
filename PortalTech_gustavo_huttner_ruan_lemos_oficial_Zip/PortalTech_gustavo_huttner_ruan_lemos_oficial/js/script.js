
const menuButton = document.querySelector('#menuButton');

if (menuButton) {
    menuButton.addEventListener('click', () => {
        const nav = document.querySelector('#menu');
        const open = nav.classList.toggle('open');

        menuButton.setAttribute('aria-expanded', String(open));
    });
}

const form = document.querySelector('#contactForm');

if (form) {
    const output = document.querySelector('#messages');

    const render = () => {
        const messages = JSON.parse(
            localStorage.getItem('portalMessages') || '[]'
        );

        output.replaceChildren();

        messages.forEach(item => {
            const li = document.createElement('li');

            li.textContent = item.name + ' — ' + item.topic + ': ' + item.message;

            output.appendChild(li);
        });
    };

    form.addEventListener('submit', e => {
        e.preventDefault();

        if (!form.reportValidity()) return;

        const data = new FormData(form);

        const item = {
            name: String(data.get('name')),
            email: String(data.get('email')),
            topic: String(data.get('topic')),
            message: String(data.get('message'))
        };

        const messages = JSON.parse(
            localStorage.getItem('portalMessages') || '[]'
        );

        messages.push(item);

        localStorage.setItem(
            'portalMessages',
            JSON.stringify(messages)
        );

        form.reset();
        render();

        document.querySelector('#feedback').textContent =
            'Mensagem salva neste navegador!';
    });

    render();
}

const search = document.querySelector('#search');

if (search) {
    search.addEventListener('input', () => {
        const term = search.value.toLowerCase();

        document.querySelectorAll('[data-search]').forEach(el => {
            el.hidden = !el.textContent.toLowerCase().includes(term);
        });
    });
}
