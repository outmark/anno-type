import { Transform } from 'stream';
import { Console } from 'console';

export class ConsoleFormatter {
    #transformStream = new Transform({ transform: (chunk, encoding, callback) => callback(null, chunk) });
    #console = new Console({
        stdout: this.#transformStream,
        inspectOptions: { colors: process.stdout.hasColors() },
    });

    /**
     * @param {any} tabularData 
     * @param {ReadonlyArray<string>} [properties] 
     */
    formatTable(tabularData, properties) {
        // @see https://stackoverflow.com/a/67859384
        // @see https://stackoverflow.com/a/69874540

        this.#console.table(...[tabularData, properties].slice(0, arguments.length));

        const table = (this.#transformStream.read() || '').toString();
        const inset = table.indexOf('┌');
        const offset = table.indexOf('┬');

        return offset > inset
            && (inset === 0 || table.slice(0, inset).trim().length === 0)
            ? table.replace(
                /^( *)(┌|├|│|└).*$/mg,
                (row, indent, opener) => indent.length === inset
                    ? `${indent}${opener}${row.slice(offset + 1)}`
                    : row
            ) : table;
    }
}