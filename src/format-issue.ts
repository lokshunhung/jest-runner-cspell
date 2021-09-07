import { blueBright, dim, yellow } from "chalk";
import type { Issue } from "cspell";

const DISPLAY_ISSUE_COUNT = 4;

export function formatIssue(issue: Issue): [string, string] {
    const lineInfo = blueBright(`${issue.row}:${issue.col}`);
    const suggestions = issue.suggestions?.slice(0, DISPLAY_ISSUE_COUNT).join(", ");
    const issueInfo = lineInfo + (suggestions ? dim.gray(" Suggestions: " + suggestions) : "");

    const trimmedText = issue.line.text.trimLeft();
    const trimmedOffset = issue.line.text.length - trimmedText.length;
    const head = dim(trimmedText.slice(0, issue.col - 1 - trimmedOffset));
    const highlighted = yellow(issue.text);
    const tail = dim(trimmedText.slice(issue.col + issue.text.length - 1 - trimmedOffset));
    const issueDescription = head + highlighted + tail;

    return [issueInfo, issueDescription];
}

// {
//     "testPath": "/Users/lshung/Dev/nodejs/jest-runner-cspell/_.spec.ts",
//     "result": {
//         "files": 1,
//         "filesWithIssues": {},
//         "issues": 3,
//         "errors": 0
//     },
//     "issues": [
//         {
//             "text": "wroong",
//             "offset": 42,
//             "line": {
//                 "text": "// that includes a wroong word\n",
//                 "offset": 23
//             },
//             "isFlagged": false,
//             "isFound": false,
//             "row": 2,
//             "col": 20,
//             "doc": "// This is a paragraph\n// that includes a wroong word\n// but that's pretty much it\n\n// Wait here's a linee that has twoo wrong words\n",
//             "uri": "/Users/lshung/Dev/nodejs/jest-runner-cspell/_.spec.ts",
//             "context": {
//                 "text": "// that includes a wroong word",
//                 "offset": 23
//             }
//         },
//         {
//             "text": "linee",
//             "offset": 101,
//             "line": {
//                 "text": "// Wait here's a linee that has twoo wrong words\n",
//                 "offset": 84
//             },
//             "isFlagged": false,
//             "isFound": false,
//             "row": 5,
//             "col": 18,
//             "doc": "// This is a paragraph\n// that includes a wroong word\n// but that's pretty much it\n\n// Wait here's a linee that has twoo wrong words\n",
//             "uri": "/Users/lshung/Dev/nodejs/jest-runner-cspell/_.spec.ts",
//             "context": {
//                 "text": "// Wait here's a linee that has twoo wrong words",
//                 "offset": 84
//             }
//         },
//         {
//             "text": "twoo",
//             "offset": 116,
//             "line": {
//                 "text": "// Wait here's a linee that has twoo wrong words\n",
//                 "offset": 84
//             },
//             "isFlagged": false,
//             "isFound": false,
//             "row": 5,
//             "col": 33,
//             "doc": "// This is a paragraph\n// that includes a wroong word\n// but that's pretty much it\n\n// Wait here's a linee that has twoo wrong words\n",
//             "uri": "/Users/lshung/Dev/nodejs/jest-runner-cspell/_.spec.ts",
//             "context": {
//                 "text": "// Wait here's a linee that has twoo wrong words",
//                 "offset": 84
//             }
//         }
//     ],
//     "errors": []
// }
