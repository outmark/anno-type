const formatTokensAsString = (...tokens) => tokens.flat().map(
    token => (typeof token === 'string' ? token
        : token !== null && typeof token === 'object' ? Object.values(token)[0]
            : null) ?? ''
).join('');

/** 
 * @param {string} sourceText
 * @param {Awaited<ReturnType<import('../heuristics.js')['analyzeSourceText']>>} heuristics
 * @param {{}} [options]
 */
export function annotateSourceText(sourceText, heuristics, options) {

    const annotationBlocks = heuristics?.file?.annotationBlocks;

    if (!annotationBlocks) return sourceText;

    const annotatedFragments = [];

    let currentTextIndex = 0;

    for (const annotationBlock of Object.values(annotationBlocks)) {
        if (annotationBlock.query) {
            annotatedFragments.push(sourceText.slice(currentTextIndex, annotationBlock.start));

            const { start, end, ...annotationBlockLines } = annotationBlock.lines;

            let currentParameterIndex = 0;

            for (const line of Object.values(annotationBlockLines)) {
                let lineText = line.text;
                if (line.annotation) {
                    const { head, offset, parameter, marker, terminator } = line.annotation;

                    if (!marker && !parameter) continue;

                    if (parameter) {
                        let body = '';

                        switch (line.annotation.parameter) {
                            case '@docs':
                                // body = annotationBlock.target?.details?.documentationText ?? '';
                                body = (annotationBlock.target?.details?.documentation && formatTokensAsString(annotationBlock.target.details.documentation)) ?? '';
                                break;
                            case '@defs':
                                body = (annotationBlock.target?.details?.display && formatTokensAsString(annotationBlock.target.details.display)) ?? '';
                                // body = annotationBlock.target?.details?.displayText ?? '';
                                break;
                            case '@errs':
                                if (annotationBlock.target?.diagnostics?.errors?.[0]?.message)
                                    body = `[Error: ${annotationBlock.target.diagnostics.errors[0].code}] ${annotationBlock.target.diagnostics.errors[0].message ?? ''}`;
                                break;
                        }

                        if (body)
                            body = `${body.trimEnd()}`.replace(/\s*\n/g, `${terminator}${head}${offset}${' '.repeat(parameter.length + 2)}`).trimEnd();

                        lineText = `${head}${offset}${parameter}: ${body}${terminator}`;

                        if (currentParameterIndex++ > 0)
                            lineText = `${head}${terminator}${lineText}`;
                    }
                }
                annotatedFragments.push(lineText);
            }

            currentTextIndex = annotationBlock.end;
        }
    }

    annotatedFragments.push(sourceText.slice(currentTextIndex));

    return annotatedFragments.join('');

}