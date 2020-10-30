let GS7validator = {
    handleSubmit: (event) => {
        event.preventDefault();

        let send = true;

        let inputs = form.querySelectorAll('input');

        for(let i = 0; i < inputs.length; i++){
            let input = inputs[i];
            let check = GS7validator.checkInput(input);

            if(check !== true){
                send = false;
                //exibi o erro
                console.log(check);
            }
        }

        if(send){
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null){
            rules = rules.split('|');
            for(let k in rules){
                let rDetails = rules[k].split('=');

                /*---> exemplo <---
                min=2
                o min vai ta na posição zero do array e o n 2 na posição um do array
                min -> rDetails[0]
                2 -> rDetails[1] */

                switch (rDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Campo não pode ser vazio!';
                        }
                        break;

                    case 'min':
                        break;
                }
            }
        }

        return true;
    }
};

let form = document.querySelector('.gs7validator');
form.addEventListener('submit', GS7validator.handleSubmit);