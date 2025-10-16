const btn = document.getElementById('btn');
const msg = document.getElementById('msg');

if (btn && msg) {
    btn.addEventListener('click', () => {
        msg.textContent = 'クリックされました！';
    });
}

const form = document.getElementById('profile-form');
const result = document.getElementById('profile-result');

if (form && result) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const bioInput = document.getElementById('bio');
        const name = (nameInput?.value || '').trim();
        const bio = (bioInput?.value || '').trim();

        result.innerHTML = '';

        const p1 = document.createElement('p');
        const strong1 = document.createElement('strong');
        strong1.textContent = 'お名前：';

        const nameText = document.createTextNode(name || '(未入力)');
        p1.append(strong1, ' ', nameText);

        const p2 = document.createElement('p');
        const strong2 = document.createElement('strong');
        strong2.textContent = 'ひとこと';
        const bioText = document.createTextNode(bio || '(未入力)');
        p2.append(strong2, ' ', bioText);

        result.append(p1, p2);

        form.reset();
    });
}