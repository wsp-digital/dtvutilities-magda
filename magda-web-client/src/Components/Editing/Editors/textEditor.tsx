import React from "react";
import Editor from "./Editor";

import { ListMultiItemEditor } from "./multiItem";

export function textEditorEx(options: any = {}) {
    return {
        edit: (
            value: any,
            onChange: Function,
            multiValues: any = null,
            extraProps: any = {}
        ) => {
            const callback = event => {
                onChange(event.target.value);
            };
            if (options.redrawOnEmpty && !value) {
                options.key = Math.random();
            }
            return (
                <input
                    className={
                        options.fullWidth
                            ? "au-text-input full-width-ctrl textEditorEx"
                            : "au-text-input non-full-width-ctrl textEditorEx"
                    }
                    defaultValue={value as string}
                    onChange={callback}
                    {...options}
                    {...extraProps}
                />
            );
        },
        view: (value: any) => {
            return <React.Fragment>{value ? value : "NOT SET"}</React.Fragment>;
        }
    };
}

export const textEditor = textEditorEx({});
export const textEditorFullWidth = textEditorEx({ fullWidth: true });

export const multilineTextEditor: Editor = {
    edit: (value: any, onChange: Function) => {
        const callback = event => {
            onChange(event.target.value);
        };
        return (
            <textarea
                className="au-text-input full-width-ctrl au-text-input--block"
                style={{ width: "100%" }}
                onChange={callback}
                defaultValue={value as string}
            />
        ); //<input defaultValue={value as string} onChange={callback} />;
    },
    view: (value: any) => {
        return <React.Fragment>{value ? value : "NOT SET"}</React.Fragment>;
    }
};

export const multiTextEditor: Editor = ListMultiItemEditor.create(
    textEditor,
    () => ""
);

export const multiTextEditorEx = options => {
    options.redrawOnEmpty = true;
    return ListMultiItemEditor.create(textEditorEx(options), () => "");
};

export const dateEditor = textEditorEx({ type: "date" });
export const dateIntervalEditor = {
    edit: (value: any, onChange: Function) => {
        value = Object.assign({}, value || {});

        const change = field => newValue => {
            value = Object.assign({}, value, { [field]: newValue });
            onChange(value);
        };
        return (
            <React.Fragment>
                {dateEditor.edit(value.start, change("start"))} -
                {dateEditor.edit(value.end, change("end"))}
            </React.Fragment>
        );
    },
    view: (value: any) => {
        value = value || {};
        let start = value.start || "unknown";
        let end = value.end || "unknown";
        return (
            <React.Fragment>
                {start}-{end}
            </React.Fragment>
        );
    }
};

export const multiDateIntervalEditor: Editor = ListMultiItemEditor.create(
    dateIntervalEditor,
    () => {
        return {};
    }
);