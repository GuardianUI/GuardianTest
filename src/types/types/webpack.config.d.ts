export const entry: string;
export namespace module {
    const rules: {
        test: RegExp;
        use: string;
    }[];
}
export namespace output {
    const filename: string;
    const path: string;
}
export const plugins: any[];
export namespace resolve {
    const extensions: string[];
}
export namespace stats {
    const colors: boolean;
    const hash: boolean;
    const version: boolean;
    const timings: boolean;
    const assets: boolean;
    const chunks: boolean;
    const modules: boolean;
    const reasons: boolean;
    const children: boolean;
    const source: boolean;
    const errors: boolean;
    const errorDetails: boolean;
    const warnings: boolean;
    const publicPath: boolean;
}
