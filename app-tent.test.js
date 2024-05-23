const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const jogo = require('./app.js');

describe('Testes para o jogo do número secreto', () => {
    let document;

    beforeAll(() => {
        const dom = new JSDOM(`<!DOCTYPE html><html><body><div><h1>Texto de teste</h1><p></p><input type="Number" /><button id="reiniciar" disabled></button></div></body></html>`);
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

    /*('exibirTextoNaTela', () => {
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
    });*/

    describe('limparCampo', () => {
        it('limpa o campo de entrada', () => {
            const input = document.querySelector('input');
            input.value = '25';
            console.log(input.value)  // Define um valor inicial para o campo de entrada
            expect(input.value).toBe('25');  // Verifica que o valor foi definido corretamente
            jogo.limparCampo();
            console.log(input.value)
            expect(input.value).toBe('');  // Verifica que o valor foi limpo corretamente
          });
      });
});
/*it('limpa o campo de entrada', () => {
    const input = document.createElement('input');
    input.value = '25';
    document.body.appendChild(input);
    jest.spyOn(document, 'querySelector').mockReturnValue(input);
    jogo.limparCampo();
    expect(input.value).toBe('');
  });*/