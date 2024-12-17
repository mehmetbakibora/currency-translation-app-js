const api_key = 'afe8d6db7969681d1e7b807b';
const url = 'https://v6.exchangerate-api.com/v6/' + api_key;

const currency_one = document.querySelector('#currency_one');
const currency_two = document.querySelector('#currency_two');
const list_one = document.querySelector('#list_one');
const list_two = document.querySelector('#list_two');
const amount = document.querySelector('#amount');
const calculate = document.querySelector('#calculate');
const result = document.querySelector('#result');

// fetch api


fetch(url + '/codes')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const items = data.supported_codes;

        let options;
        for (let item of items) {
            options += `<option value=${item[0]}>${item[1]}</option>`;
        }
        list_one.innerHTML = options;
        list_two.innerHTML = options;
    })

calculate.addEventListener('click', () => {
    const currency_input = currency_one.value;
    const currency_output = currency_two.value;
    const quantity = amount.value;

    fetch(url + '/latest/' + currency_input)
        .then(res => res.json())
        .then(data => {
            const conclusion = (data.conversion_rates[currency_output] * quantity).toFixed(3);
            result.innerHTML =
                `
                    <div class="card border-warning mt-5">
                        <div class="card-body text-center">
                            ${quantity} ${currency_input} = ${conclusion} ${currency_output}
                        </div>
                    </div>
                `
        })
})