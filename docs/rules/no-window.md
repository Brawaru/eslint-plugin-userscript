# Disallow usage of `window` global (no-window)

Disallows usage of `window` global and requires you to use `unsafeWindow` instead.

## Rule Details

Using `window` in userscripts is unreliable when targeting multiple userscript managers and may result in unintended side effects and bugs.

It's better to scope userscript's variables in a IIFE function, and when access to actual window is necessary, use [`unsafeWindow`](https://wiki.greasespot.net/UnsafeWindow), giving you've declared permission to use it.

Examples of **incorrect** code for this rule:

```js
// Defining global variable:

Object.defineProperty(window, "myGlobal", {
    value: "My global value!",
});

// Using window:

window.cancelAnimationFrame(requestId);
```

Examples of **correct** code for this rule:

```js
// Exposing variables:

Object.defineProperty(unsafeWindow, "myGlobal", {
    value: "My exposed global value",
});

// Using window:

unsafeWindow.cancelAnimationFrame(requestId);
```

## When Not To Use It

If you are targeting specific userscript manager and usage of `window` is always meets the expectation.

## Further Reading

- Example of bug caused by using window in one of the dependencies: https://github.com/preactjs/preact/issues/2385
