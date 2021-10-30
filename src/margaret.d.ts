declare module "@tymate/margaret" {
    var Container: React.FunctionComponent<{}>;
    var Stack: React.FunctionComponent<{ direction?: 'column' | 'row', alignX?: 'center', gap?: number; }>;
    var MargaretProvider: React.FunctionComponent<{ theme?: any }>;
    var Button: React.FunctionComponent<{ type?: 'submit' | 'button' }>;
    var ButtonReset: React.FunctionComponent<any>;
}