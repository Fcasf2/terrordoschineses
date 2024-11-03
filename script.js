document.addEventListener('DOMContentLoaded', () => {
    const slotsContainer = document.getElementById('slots');
    const analiseBtn = document.getElementById('analise-btn');
    const locationMessage = document.getElementById('location-message');
    const timeMessage = document.getElementById('time-message');
    const notificationContainer = document.getElementById('notification-container');

    const gameNames = [
        'Fortune Tiger',
        'Fortune Rabbit',
        'Fortune Ox',
        'Fortune Mouse',
        'Ganesha Fortune',
        'Prosperity Fortune Tree',
        'Jungle DeLight',
        'Candy Bonanza',
        'Fortune Dragon',
        'Hip Hop Panda'
    ];

    let previousNotifications = new Set();
    let notificationTimeout;

    function generateSlots() {
        const slotImages = [
            'slot1.jpg',
            'slot2.jpg',
            'slot3.jpg',
            'slot4.jpg',
            'slot5.jpg',
            'slot6.jpg',
            'slot7.jpg',
            'slot8.jpg',
            'slot9.jpg',
            'slot10.jpg'
        ];

        slotsContainer.innerHTML = '';

        for (let i = 0; i < gameNames.length; i++) {
            const slotElement = createSlotElement(gameNames[i], slotImages[i]);
            slotsContainer.appendChild(slotElement);
        }
    }

    function createSlotElement(slotName, slotImageSrc) {
        const slotDiv = document.createElement('div');
        slotDiv.className = 'slot';

        const slotImage = document.createElement('img');
        slotImage.src = slotImageSrc;
        slotImage.alt = slotName;

        const slotContentDiv = document.createElement('div');
        slotContentDiv.className = 'slot-content';

        const slotNameElement = document.createElement('h3');
        slotNameElement.textContent = slotName;

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';

        const progressBarInner = document.createElement('div');
        progressBarInner.className = 'progress-bar-inner';

        const probability = 29 + Math.random() * (98 - 29);
        const roundedProbability = Math.round(probability);

        if (roundedProbability < 40) {
            progressBarInner.classList.add('red');
        } else if (roundedProbability < 70) {
            progressBarInner.classList.add('yellow');
        } else {
            progressBarInner.classList.add('green');
        }

        progressBarInner.style.width = `${roundedProbability}%`;
        progressBarInner.textContent = `${roundedProbability}%`;

        progressBar.appendChild(progressBarInner);
        slotContentDiv.appendChild(slotNameElement);
        slotContentDiv.appendChild(progressBar);

        slotDiv.appendChild(slotImage);
        slotDiv.appendChild(slotContentDiv);

        return slotDiv;
    }

    function generateFakeResult() {
        let randomID, randomValue, fakeResult;

        do {
            randomID = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
            randomValue = (Math.random() * (782.78 - 39.87) + 39.87).toFixed(2);
            fakeResult = `ID ${randomID}*** Ganhou R$ ${randomValue}`;
        } while (previousNotifications.has(fakeResult));

        previousNotifications.add(fakeResult);

        const notificationElement = document.createElement('div');
        notificationElement.className = 'notification';
        notificationElement.id = `notification-${randomID}`;
        notificationElement.textContent = fakeResult;

        notificationContainer.innerHTML = ''; // Limpa qualquer notificação anterior
        notificationContainer.appendChild(notificationElement);

        // Remova a notificação após 10 segundos
        clearTimeout(notificationTimeout);
        notificationTimeout = setTimeout(() => {
            notificationElement.remove();
            previousNotifications.delete(fakeResult);
        }, 5000);
    }

    function startFakeResults() {
        setInterval(generateFakeResult, 5000);
    }

    function updateCurrentTime() {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString('pt-BR');
        const timeMessageText = `Horário Atual: ${formattedTime}`;
        timeMessage.textContent = timeMessageText;
    }

    function getLocation() {
        const apiKey = '4447a04df9f55c';
        const apiUrl = `https://ipinfo.io/json?token=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const city = data.city || "sua cidade";
                const locationMessageText = `Você de ${city} foi sorteado!`;
                locationMessage.textContent = locationMessageText;
            })
            .catch(error => {
                console.error('Erro ao obter localização:', error);
                locationMessage.textContent = "Erro ao obter localização.";
            });
    }

    analiseBtn.addEventListener('click', () => {
        generateSlots();
        analiseBtn.disabled = true;

        setTimeout(() => {
            analiseBtn.disabled = false;
        }, 60000);
    });

    getLocation();
    setInterval(updateCurrentTime, 1000);
    startFakeResults();

    setTimeout(() => {
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }, 1500);
});