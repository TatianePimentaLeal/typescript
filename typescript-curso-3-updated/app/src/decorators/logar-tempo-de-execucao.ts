export function logarTempoDeExecucao(emSegundos: boolean = false) {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: any[]) { //função que recebe uma quantidade indefinida de parâmetros
            let divisor = 1;
            let unidade = 'milissegundos';
            if(emSegundos){
                divisor = 1000;
                unidade = 'segundos';
            }
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args); //chamo o método original executando no contexto de this que vai ser executado no adiciona() e passa o args do array
            const t2 = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1)/divisor} ${unidade}`);
            retorno
        }

        return descriptor;
    }
}