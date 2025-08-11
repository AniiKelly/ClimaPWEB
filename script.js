// Pegando dados do HTML
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');

// API da minha conta
const apiKey = "94495522ad5a418db90202937250908";

// Função para buscar o clima
async function fetchCidade(nameOrId) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${nameOrId}&lang=pt`);

        if (!response.ok) {
            throw new Error(`Cidade ${nameOrId} não encontrada.`);
        }

        const data = await response.json();
        renderCidadeCard(data);

    } catch (error) {
        renderError(error.message);
    }
}

// Função para criar o card do clima na tela
function renderCidadeCard(clima) {
    weatherResult.innerHTML = '';

    const cardHTML = `
        <div class = "weather-card">
            <h1> ${clima.location.name}, ${clima.location.country}</h1>
            <p class = "local-time">Horário Local: ${clima.location.localtime}</p>

            <div class="weather-main">
                <img id="weather-icon" src="https:${clima.current.condition.icon}" alt="${clima.current.condition.text}">
            <div>
                <p id="temperature">${clima.current.temp_c}°C</p>
                <p id="condition">${clima.current.condition.text}</p>
            </div>
        </div>

        <div class="weather-details">
            <div class="detail-item">
                <strong>${clima.current.feelslike_c}°C</strong>
                <span>Sensação</span>
            </div>
        
            <div class="detail-item">
                <strong>${clima.current.humidity}%</strong>
                <span>Umidade</span>
            </div>
        
            <div class="detail-item">
                <strong>${clima.current.wind_kph} km/h</strong>
                <span>Vento</span>
            </div>
        
            <div class="detail-item">
                <strong>${clima.current.pressure_mb} mb</strong>
                <span>Pressão</span>
            </div>
        
            <div class="detail-item">
                <strong>${clima.current.vis_km} km</strong>
                <span>Visibilidade</span>
            </div>
        
            <div class="detail-item">
                <strong>${clima.current.uv}</strong>
                <span>Índice UV</span>
            </div>
    
        </div>
    </div>
    `;

    weatherResult.innerHTML = cardHTML;
    weatherResult.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

// Função para exibir mensagem de erro
function renderError(message) {
    weatherResult.classList.add('hidden');
    errorMessage.classList.remove('hidden');
    errorMessage.querySelector('p').textContent = message;
}

// Evento de clique
searchBtn.addEventListener('click', () => {
    const cidadeName = cityInput.value.trim();
    if (cidadeName) {
        fetchCidade(cidadeName);
    } else {
        renderError('Por favor, digite o nome da cidade.');
    }
});