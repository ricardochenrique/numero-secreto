const { JSDOM } = require('jsdom');
const jogo = require('./app.js');

describe('Testes para o jogo do número secreto', () => {
    let numeroSecreto;

    // Configura o JSDOM antes de cada teste
    beforeEach(() => {
        const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
        global.document = dom.window.document;
        global.window = dom.window;

        // Funções simuladas
        jogo.exibirTextoNaTela = jest.fn();
        global.document.querySelector = jest.fn();

        // Gera um novo número secreto antes de cada teste
        numeroSecreto = jogo.gerarNumeroAleatorio();
    });

    // Limpa após cada teste
    afterEach(() => {
        delete global.document;
        delete global.window;
        delete jogo.exibirTextoNaTela;
    });

    // Testes para a função gerarNumeroAleatorio
    describe('gerarNumeroAleatorio', () => {
        it('retorna um número entre 1 e 100', () => {
            expect(numeroSecreto).toBeGreaterThanOrEqual(1);
            expect(numeroSecreto).toBeLessThanOrEqual(100);
        });

        it('não retorna o mesmo número consecutivamente', () => {
            const novoNumeroSecreto = jogo.gerarNumeroAleatorio();
            expect(novoNumeroSecreto).not.toEqual(numeroSecreto);
        });
    });

    // Testes para a função exibirTextoNaTela
    describe('exibirTextoNaTela', () => {
        it('exibe o texto corretamente no elemento especificado', () => {
            const elementoMock = document.createElement('div');
            jogo.exibirTextoNaTela(elementoMock, 'Texto de teste');
            expect(elementoMock.innerHTML).toBe('Texto de teste');
        });

        it('retorna seletor não encontrado se o elemento não existir', () => {
            jogo.exibirTextoNaTela('#elementoInexistente', 'Texto de teste');
            expect(console.error).toHaveBeenCalledWith('Seletor não encontrado: #elementoInexistente');
        });
    });

    // Testes para a função limparCampo
    describe('limparCampo', () => {
        it('limpa o campo de entrada', () => {
            const input = { value: 'teste' };
            jogo.limparCampo(input);
            expect(input.value).toBe('');
        });
    });

    // Testes para a função verificarChute
    describe('verificarChute', () => {
        it('exibe a mensagem de acerto quando o palpite está correto', () => {
            const input = { value: numeroSecreto };
            global.document.querySelector = jest.fn().mockReturnValue(input);
            jogo.verificarChute();
            expect(jogo.exibirTextoNaTela).toHaveBeenCalledWith('h1', 'Acertou!');
        });

        it('exibe a mensagem "o número secreto é menor" quando o palpite é maior', () => {
            const input = { value: numeroSecreto + 1 };
            global.document.querySelector = jest.fn().mockReturnValue(input);
            jogo.verificarChute();
            expect(jogo.exibirTextoNaTela).toHaveBeenCalledWith('p', 'O número secreto é menor');
        });

        it('exibe a mensagem "o número secreto é maior" quando o palpite é menor', () => {
            const input = { value: numeroSecreto - 1 };
            global.document.querySelector = jest.fn().mockReturnValue(input);
            jogo.verificarChute();
            expect(jogo.exibirTextoNaTela).toHaveBeenCalledWith('p', 'O número secreto é maior');
        });
    });

    // Testes para a função reiniciarJogo
    describe('reiniciarJogo', () => {
        it('redefine o número secreto, limpa o campo e reinicia as tentativas', () => {
            jogo.gerarNumeroAleatorio = jest.fn().mockReturnValue(55);
            jogo.limparCampo = jest.fn();
            jogo.exibirMensagemInicial = jest.fn();
            jogo.reiniciarJogo();
            expect(jogo.gerarNumeroAleatorio).toHaveBeenCalled();
            expect(jogo.limparCampo).toHaveBeenCalled();
            expect(jogo.exibirMensagemInicial).toHaveBeenCalled();
        });
    });

    // Testes para a função exibirMensagemInicial
    describe('exibirMensagemInicial', () => {
        it('exibe a mensagem inicial corretamente', () => {
            jogo.exibirMensagemInicial();
            expect(jogo.exibirTextoNaTela).toHaveBeenCalledWith('h1', 'Jogo do número secreto');
            expect(jogo.exibirTextoNaTela).toHaveBeenCalledWith('p', 'Escolha um número entre 1 e 100');
        });
    });
});