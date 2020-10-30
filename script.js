let GS7validator = {
    handleSubmit: (event) => {
        event.preventDefault();

        let send = true;

        let inputs = form.querySelectorAll('input');

        GS7validator.clearErrors();

        for(let i = 0; i < inputs.length; i++){
            let input = inputs[i];
            let check = GS7validator.checkInput(input);

            if(check !== true){
                send = false;
                //exibi o erro
                GS7validator.showError(input, check);
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
                            return 'Campo invalido!';
                        }
                        break;

                    case 'min':
                        break;
                }
            }
        }

        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = '#FF0000';

        //Crio uma variavel onde ela vai ser uma DIV
        let errorElement = document.createElement('div');
        //Em seguida na variavel eu add uma classe nessa div chamada error
        errorElement.classList.add('error');
        //Dentro dessa div eu adiciono o texto error que passa no parametro da funcao para exibir
        errorElement.innerHTML = error;

        //Mostrando a legenda do erro
        input.parentElement.insertBefore(errorElement, input.ElementSibling);

    },
    clearErrors: () => {
        // crio a variavel onde vou remover a borda dos inputs e todos os styles dele
        let inputs = form.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++;){
            inputs[i].style = '';
        }

        //crio uma variavel onde vou salvar todas as classes error e removo
        let errorElements = document.querySelectorAll('.error');
        for(let i = 0; errorElements.length; i++){
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.gs7validator');
form.addEventListener('submit', GS7validator.handleSubmit);