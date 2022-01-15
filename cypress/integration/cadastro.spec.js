

import signup from  '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'

describe('Cadastro', () =>  {

    // beforeEach(function() {
    //     cy.fixture('deliver').then(function(d) {
    //         this.deliver = d

        })  
    

    it('User should be deliver', function()  {

        var deliver =  signupFactory.deliver ()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)

    })

    it('Invalid document', function() {

        var deliver =  signupFactory.deliver ()

        deliver.cpf = '000000141aa'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Inválid email', function() {

        var deliver =  signupFactory.deliver ()

        deliver.email = 'user.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
})

context('Required fields', function(){

    const messages = [
        {field: 'name', output: 'É necessário informar o nome'},
        {field: 'cpf', output: 'É necessário informar o CPF'},
        {field: 'email', output: 'É necessário informar o email'},
        {field: 'postalcolde', output: 'É necessário informar o CEP'},
        {field: 'street', output: 'É necessário informar o número do endereço'},
        {field: 'delivery_method', output: 'Selecione o método de entrega'},
        {field: 'cpf', output: 'Adicione uma foto da sua CNH'},
    ]

    before(function(){
        signup.go()
    signup.submit()

    })

    messages.forEach(function(msg){
        it(`${msg.field} is requerid`, function(){
            signup.alertMessageShouldBe(msg.output)

        })
    })
})
