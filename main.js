const STORAGE_KEY = 'profile:v1';

function saveProfile(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    catch{}
}

function loadProfile() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    }

    catch {}
}

function renderProfile(resultEl, { name = '', bio = '' }) {
    resultEl.innerHTML = '';

    const p1 = document.createElement('p');
    const s1 = document.createElement('storong');
    s1.textContent = 'お名前：';
    p1.append(s1, '', document.createTextNode(name || '(未入力)'));

    const p2 = document.createElement('p');
    const s2 = document.createElement('strong');
    s2.textContent = 'ひとこと：';
    p2.append(s2, '', document.createTextNode(bio || '(未入力) '));

    resultEl.append(p1, p2);
}

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
    const saved = loadProfile();
    if (saved.name || saved.bio) {
        renderProfile(result, saved);
    }

    const nameInput = document.getElementById('name');
    const bioInput = document.getElementById('bio');
    const submitBtn = document.getElementById('submit-profile');
    const nameError = document.getElementById('name-error');

    function updateSubmitState() {
        const ok = !!(nameInput?.value || '').trim();
        if (submitBtn) submitBtn.disabled = !ok;
        if (nameError) nameError.hidden = ok;
    }

    nameInput?.addEventListener('input', updateSubmitState);
    bioInput?.addEventListener('input', updateSubmitState);

    updateSubmitState();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = (document.getElementById('name')?.value || '').trim();
        const bio = (document.getElementById('bio')?.value || '').trim();
        const data = { name, bio };
        renderProfile(result, data);
        saveProfile(data);

        form.reset();
        updateSubmitState();
    });
}

const clearBtn = document.getElementById('clear-profile');
if (clearBtn && result) {
    clearBtn.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        result.innerHTML = '';
        form?.reset();
    });
}