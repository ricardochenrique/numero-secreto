const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const jogo = require('./app.js');

describe('Testes para o jogo do número secreto', () => {
    let document;

    beforeAll(() => {
        const dom = new JSDOM(`<!DOCTYPE html><html><body><div><h1>Texto de teste</h1><p></p><input type="Number" value='25' /><button id="reiniciar" disabled></button></div></body></html>`);
        document = dom.window.document;

        global.document = document;
        global.window = dom.window;
        global.console.error = jest.fn(); // Mock console.error

        jogo.exibirTextoNaTela = jest.fn(jogo.exibirTextoNaTela);
    });

    afterAll(() => {
        jest.restoreAllMocks();
        delete global.document;
        delete global.window;
    });

    describe('exibirTextoNaTela', () => {
        it('exibe o texto corretamente no elemento especificado', () => {
            const elementoMock = document.querySelector('div h1'); // Atualize o seletor se necessário
            console.log(`Elemento antes de exibirTextoNaTela: ${elementoMock ? elementoMock.outerHTML : 'Elemento não encontrado'}`);
            jogo.exibirTextoNaTela('div h1', 'Texto de teste'); // Atualize o seletor se necessário
            console.log(`Elemento depois de exibirTextoNaTela: ${elementoMock ? elementoMock.outerHTML : 'Elemento não encontrado'}`);
            expect(elementoMock.innerHTML).toBe('Texto de teste');
        });

        it('retorna seletor não encontrado se o elemento não existir', () => {
            jogo.exibirTextoNaTela('#elementoInexistente', 'Texto de teste');
            expect(console.error).toHaveBeenCalledWith('Seletor não encontrado: #elementoInexistente');
        });
    });

  describe('gerarNumeroAleatorio', () => {
    it('retorna um número entre 1 e 100', () => {
      expect(jogo.numeroSecreto).toBeGreaterThanOrEqual(1);
      expect(jogo.numeroSecreto).toBeLessThanOrEqual(100);
    });

    it('não retorna o mesmo número consecutivamente', () => {
      const novoNumeroSecreto = jogo.gerarNumeroAleatorio();
      expect(novoNumeroSecreto).not.toEqual(jogo.numeroSecreto);
    });
  });

  describe('limparCampo', () => {
    it('limpa o campo de entrada', () => {
        const input = document.createElement('input');
        input.value = '';
        console.log(input.value);
        jogo.limparCampo();
        expect(input.value).toBe('');
      });
  });

  describe('verificarChute', () => {
    it('exibe a mensagem de acerto quando o palpite está correto', () => {
      const input = document.createElement('input');
      input.value = jogo.numeroSecreto;
      document.body.appendChild(input);
      jest.spyOn(document, 'querySelector').mockReturnValue(input);
      jogo.verificarChute();
      expect(jogo.exibirTextoNaTela).toHaveBeenCalledWith('h1', 'Acertou!');
    });

    it('exibe a mensagem "o número secreto é menor" quando o palpite é maior', () => {
      const input = document.createElement('input');
      input.value = jogo.numeroSecreto + 1;
      document.body.appendChild(input);
      jest.spyOn(document, 'querySelector').mockReturnValue(input);
      jogo.verificarChute();
      expect(jogo.exibirTextoNaTela).toHaveBeenCalledWith('p', 'O número secreto é menor');
    });

    it('exibe a mensagem "o número secreto é maior" quando o palpite é menor', () => {
      const input = document.createElement('input');
      input.value = jogo.numeroSecreto - 1;
      document.body.appendChild(input);
      jest.spyOn(document, 'querySelector').mockReturnValue(input);
      jogo.verificarChute();
      expect(jogo.exibirTextoNaTela).toHaveBeenCalledWith('p', 'O número secreto é maior');
    });
  });

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

  describe('exibirMensagemInicial', () => {
    it('exibe a mensagem inicial corretamente', () => {
      jogo.exibirMensagemInicial();
      expect(jogo.exibirTextoNaTela).toHaveBeenCalledWith('h1', 'Jogo do número secreto');
      expect(jogo.exibirTextoNaTela).toHaveBeenCalledWith('p', 'Escolha um número entre 1 e 10');
    });
  });
});