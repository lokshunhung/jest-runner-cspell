import { fail, pass } from "create-jest-runner";
import * as CSpell from "cspell";
import { formatIssue } from "./format-issue";

interface RunnerOptions {
    testPath: string;
}

// interface CSpellOptions extends CSpell.CSpellApplicationOptions {
//     /** Use legacy output */
//     legacy?: boolean;
//     /** Show summary message in console */
//     summary: boolean;
//     /** Show spelling errors */
//     issues: boolean;
//     /** Silent mode, suppress error messages */
//     silent: boolean;
//     /** Error if no files are found */
//     mustFindFiles: boolean;
//     /** Show progress messages */
//     progress?: boolean;
//     /** issues are shown with a relative path to the root or `cwd` */
//     relative?: boolean;
// }

// const options: CSpellOptions = {
//     legacy: false,
//     summary: false,
//     issues: true,
//     silent: false,
//     mustFindFiles: false,
//     progress: false,
// };

const testTitle = "Check spelling";

export default async function run({ testPath }: RunnerOptions) {
    const start = Date.now();

    const issues: Array<CSpell.Issue> = [];
    const errors: Array<{ message: string; error: Error }> = [];

    const options: CSpell.CSpellApplicationOptions = {
        showSuggestions: true,
    };
    const emitters: CSpell.Emitters = {
        issue(issue: CSpell.Issue) {
            issues.push(issue);
        },
        error(message: string, error: Error) {
            // @ts-ignore -- Check for cspell-lib SpellingDictionaryLoadError
            if ("cause" in error) error = error.cause;
            errors.push({ message, error });
        },
        info(message: string, msgType: CSpell.MessageType) {},
        debug(message: string) {},
        progress(p: CSpell.ProgressItem | CSpell.ProgressFileComplete) {},
    };
    const result = await CSpell.lint([testPath], options, emitters);

    const end = Date.now();

    if (errors.length !== 0) {
        const errorMessage = errors.map(({ message, error }) => `${message} ${error.toString()}`).join("\n");
        return fail({
            start,
            end,
            test: { title: testTitle, path: testPath, errorMessage },
        });
    }
    if (result.issues !== 0) {
        const errorMessage = issues
            .map(issue => formatIssue(issue))
            .map(formattedIssue => formattedIssue.join("\n"))
            .join("\n");
        return fail({
            start,
            end,
            test: { title: testTitle, path: testPath, errorMessage },
        });
    }
    return pass({
        start,
        end,
        test: { title: testTitle, path: testPath },
    });
}
