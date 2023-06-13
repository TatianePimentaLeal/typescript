export function logarTempoDeExecucao() {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function(...args: any[]) { //função que recebe uma quantidade indefinida de parâmetros
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args); //chamo o método original executando no contexto de this que vai ser executado no adiciona() e passa o args do array
            const t2 = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${(t2 - t1)/1000} segundos.`);
            retorno
        }

        return descriptor;
    }
}