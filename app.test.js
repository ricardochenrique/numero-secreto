const { JSDOM } = require('jsdom');
const jogo = require('./app.js');

describe('Testes para o jogo do número secreto', () => {
    let numeroSecreto;

    // Configuração do JSDOM antes de cada teste
    beforeEach(() => {
        // Cria uma instância do DOM simulado
        const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');

        // Extrai o objeto global do DOM simulado e atribui ao ambiente de execução global
        global.document = dom.window.document;
        global.window = dom.window;

        // Simula a função exibirTextoNaTela
        jogo.exibirTextoNaTela = jest.fn();

        // Simula a função querySelector
        global.document.querySelector = jest.fn();

        // Antes de cada teste, geramos um novo número secreto
        numeroSecreto = jogo.gerarNumeroAleatorio();
    });

    // Após cada teste, limpa o ambiente
    afterEach(() => {
        // Remove as variáveis globais criadas para o DOM simulado
        delete global.document;
        delete global.window;
        delete jogo.exibirTextoNaTela;
    });

    // Teste para a função gerarNumeroAleatorio
    describe('Testes para a função gerarNumeroAleatorio', () => {
        it('Deve retornar um número entre 1 e 100', () => {
            expect(numeroSecreto).toBeGreaterThanOrEqual(1);
            expect(numeroSecreto).toBeLessThanOrEqual(100);
        });

        it('Não deve retornar o mesmo número consecutivamente', () => {
            const novoNumeroSecreto = jogo.gerarNumeroAleatorio();
            expect(novoNumeroSecreto).not.toEqual(numeroSecreto);
        });
    });

    // Testes para a função exibirTextoNaTela
    describe('Testes para a função exibirTextoNaTela', () => {
        it('Deve exibir o texto corretamente no elemento especificado', () => {
            // Simula um elemento HTML
            const elementoMock = document.createElement('div');

            // Chama a função exibirTextoNaTela com o elemento simulado e o texto
            jogo.exibirTextoNaTela(elementoMock, 'Texto de teste');

            // Verifica se o texto foi exibido corretamente no elemento
            expect(elementoMock.innerHTML).toBe('Texto de teste');
        });

        it('Deve retornar seletor não encontrado se o elemento não existir', () => {
            // Chama a função exibirTextoNaTela com um seletor que não corresponde a nenhum elemento
            jogo.exibirTextoNaTela('#elementoInexistente', 'Texto de teste');

            // Verifica se o seletor não foi encontrado
            expect(console.error).toHaveBeenCalledWith('Seletor não encontrado: #elementoInexistente');
        });
    });

    // Teste para a função limparCampo
    describe('Testes para a função limparCampo', () => {
        it('Deve limpar o campo de entrada', () => {
            // Simula um campo de entrada
            const input = { value: 'teste' };
            jogo.limparCampo(input);
            expect(input.value).toBe('');
        });
    });

    // Teste para a função verificarChute
    describe('Testes para a função verificarChute', () => {
        it('Deve exibir mensagem de acerto quando o chute é correto', () => {
            const input = { value: numeroSecreto };
            const mockExibirTextoNaTela = jest.fn();
            global.document.querySelector = jest.fn().mockReturnValue(input);
            jogo.exibirTextoNaTela = mockExibirTextoNaTela;

            jogo.verificarChute();

            expect(mockExibirTextoNaTela).toHaveBeenCalledWith('h1', 'Acertou!');
        });

        it('Deve exibir mensagem de "número secreto é menor" quando o chute é maior', () => {
            const input = { value: numeroSecreto + 1 };
            const mockExibirTextoNaTela = jest.fn();
            global.document.querySelector = jest.fn().mockReturnValue(input);
            jogo.exibirTextoNaTela = mockExibirTextoNaTela;

            jogo.verificarChute();

            expect(mockExibirTextoNaTela).toHaveBeenCalledWith('h1', 'Número secreto é menor');
        });

        it('Deve exibir mensagem de "número secreto é maior" quando o chute é menor', () => {
            const input = { value: numeroSecreto - 1 };
            const mockExibirTextoNaTela = jest.fn();
            global.document.querySelector = jest.fn().mockReturnValue(input);
            jogo.exibirTextoNaTela = mockExibirTextoNaTela;

            jogo.verificarChute();

            expect(mockExibirTextoNaTela).toHaveBeenCalledWith('p', 'O número secreto é maior');
        });
    });

    // Teste para a função reiniciarJogo
    describe('Testes para a função reiniciarJogo', () => {
        it('Deve resetar o número secreto, limpar o campo e reiniciar as tentativas', () => {
            const mockGerarNumeroAleatorio = jest.fn().mockReturnValue(55);
            const mockLimparCampo = jest.fn();
            const mockExibirMensagemInicial = jest.fn();
            jogo.gerarNumeroAleatorio = mockGerarNumeroAleatorio;
            jogo.limparCampo = mockLimparCampo;
            jogo.exibirMensagemInicial = mockExibirMensagemInicial;

            jogo.reiniciarJogo();

            expect(mockGerarNumeroAleatorio).toHaveBeenCalled();
            expect(mockLimparCampo).toHaveBeenCalled();
            expect(mockExibirMensagemInicial).toHaveBeenCalled();
        });
    });

    // Teste para a função exibirMensagemInicial
    describe('Testes para a função exibirMensagemInicial', () => {
        it('Deve exibir mensagem inicial corretamente', () => {
            const mockExibirTextoNaTela = jest.fn();
            jogo.exibirTextoNaTela = mockExibirTextoNaTela;

            jogo.exibirMensagemInicial();

            expect(mockExibirTextoNaTela).toHaveBeenCalledWith('h1', 'Jogo do número secreto');
            expect(mockExibirTextoNaTela).toHaveBeenCalledWith('p', 'Escolha um número entre 1 e 100');
        });
    });
});