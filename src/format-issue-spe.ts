import { expect, test } from "@jest/globals";
import { formatIssue } from "./format-issue";

test("format one issue", () => {
    const issue = JSON.parse(`{
        "text": "wroong",
        "offset": 42,
        "line": {
            "text": "// that includes a wroong word\n",
            "offset": 23
        },
        "isFlagged": false,
        "isFound": false,
        "row": 2,
        "col": 20,
        "doc": "// This is a paragraph\n// that includes a wroong word\n// but that's pretty much it\n",
        "uri": "/Users/lshung/Dev/nodejs/jest-runner-cspell/_.spec.ts",
        "context": {
            "text": "// that includes a wroong word",
            "offset": 23
        }
    }`);
    expect(formatIssue(issue)).toMatchInlineSnapshot();
});
