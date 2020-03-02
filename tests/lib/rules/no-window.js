/**
 * @fileoverview Disallows usage of window and requires to you unsafeWindow instead.
 * @author Sasha Sorokin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-window"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

ruleTester.run("no-window", rule, {
    valid: [
        "unsafeWindow.eval",
        "unsafeWindow.window",
    ],
    invalid: [
        {
            code: "window.eval",
            errors: [{
                messageId: "avoidWindow",
            }],
        },
    ],
});
