document.addEventListener('DOMContentLoaded', function(event) {
    var validations = {
        required: function(value){
            return value !== '';
        },
        email: function(value){
            return value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        }
    }
    function validate() {
        var form = document.getElementById('form'),
            inputsArr = form.querySelectorAll('input'),
            errorMessage = document.querySelector(".msg__alert--danger"),
            successMessage = document.querySelector(".msg__alert--success"),
            errorText = errorMessage.querySelector(".msg--error");
        
        form.addEventListener('submit', function(e){
            var i = 0;
            while (i < inputsArr.length) {
                var attr = inputsArr[i].getAttribute('data-validation'),
                    rules = attr ? attr.split(' ') : '',
                    j = 0;
                while (j < rules.length) {
                    if(!validations[rules[j]](inputsArr[i].value)) {
                        e.preventDefault();
                        
                        errorMessage.className = "msg__alert msg__alert--danger alert alert-danger";
                        successMessage.className = "msg__alert msg__alert--success alert alert-success d-none";
                        inputsArr[i].className = 'login-box__form--gray form-control py-2 border-right-0 border is-invalid';
                       
                        if (rules[j] === 'required') {
                            errorText.innerHTML = "Debes llenar todos los campos";
                        } else if (rules[j] === 'email') {
                            errorText.innerHTML = "Debes poner un correo válido";
                        }
                        return false;
                    }
                    errorMessage.className = "msg__alert msg__alert--danger alert alert-danger d-none";
                    successMessage.className = "msg__alert msg__alert--success alert alert-success d-none";
                    inputsArr[i].className = 'login-box__form--gray form-control py-2 border-right-0 border';
                    j++;
                }
                i++;
            }
            e.preventDefault();
            successMessage.className = "msg__alert msg__alert--success alert alert-success";
        }, false)
    }
    validate();
})
