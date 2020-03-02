// Straight from no-restricted-globals!

module.exports = {
    meta: {
        messages: {
            avoidWindow: "Window object is unreliable in userscripts.",
            useUnsafeWindow: "Use unsafeWindow if trying to access actual window.",
        },
        fixable: true,
    },
    create(context) {
        function reportWindowUsage(reference) {
            context.report({
                node: reference.identifier,
                messageId: "avoidWindow",

                suggest: [{
                    messageId: "useUnsafeWindow",
                    fix(fixer) {
                        return [
                            fixer.replaceText(reference.identifier, "unsafeWindow")
                        ];
                    },
                }],
            });
        }

        return {
            Program() {
                const scope = context.getScope();

                scope.variables.forEach((variable) => {
                    if (!variable.defs.length && variable.name === "window") {
                        variable.references.forEach(reportWindowUsage);
                    }
                });

                scope.through.forEach((reference) => {
                    if (reference.identifier.name === "window") {
                        reportWindowUsage(reference);
                    }
                });
            }
        };
    },
};
